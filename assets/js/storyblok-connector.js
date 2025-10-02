// storyblok-connector.js

        // 1. Initialize the Storyblok client
        const storyblokApi = new StoryblokApi({
            accessToken: "Iu78WEfbW54c8SV7OtMqfAtt" // Replace with your token!
        });

        async function fetchStoryblokContent() {
            try {
                // 2. Request the 'home' story from Storyblok
                const { data } = await storyblokApi.get("cdn/stories/home", {
                    "version": "draft" // Use 'draft' for the visual editor, 'published' for live
                });
                
                // Get the content from the response
                const content = data.story.content;
                const storyblokId = data.story.id;
                
                // 3. Update your HTML with the fetched content
                document.getElementById('headline').textContent = content.headline;
                document.getElementById('body-text').innerHTML = content.body_text; // Use .innerHTML if you have rich text
                
                const mainImage = document.getElementById('main-image');
                mainImage.src = content.main_image.filename;
                mainImage.alt = content.main_image.alt;

                // Add the data-blok-c attribute for the visual editor
                const pageContentDiv = document.getElementById('page-content');
                pageContentDiv.setAttribute('data-blok-c', JSON.stringify({
                    "id": storyblokId,
                    "component": content.component
                }));
                pageContentDiv.setAttribute('data-blok-uid', `${storyblokId}-${content.component}`);


            } catch (error) {
                console.error("Error fetching from Storyblok:", error);
                document.getElementById('headline').textContent = "Failed to load content.";
            }
        }

        // 4. Initialize the Visual Editor bridge
        const storyblokInstance = new StoryblokBridge();

        storyblokInstance.on(['published', 'change'], () => {
          location.reload(true); // Simple reload on save/publish
        });

        // Call the function to fetch content when the page loads
        fetchStoryblokContent();
