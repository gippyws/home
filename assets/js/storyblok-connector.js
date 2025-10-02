// storyblok-connector.js
document.addEventListener('DOMContentLoaded', function() {
    const accessToken = "Iu78WEfbW54c8SV7OtMqfAtt";

    async function fetchStoryblokContent() {
        try {
            // 2. Request the 'home' story from Storyblok using fetch
            const response = await fetch(`https://api.storyblok.com/v2/cdn/stories/home?token=${accessToken}&version=draft`);
            const data = await response.json();
            
            // Get the content from the response
            const content = data.story.content;
            const storyblokId = data.story.id;
            
            // 3. Update your HTML with the fetched content
            const headline = document.getElementById('headline');
            const bodyText = document.getElementById('body-text');
            
            if (headline) {
                headline.textContent = content.headline;
                // Add editable attribute for visual editor
                headline.setAttribute('data-blok-c', `${content._uid}:headline`);
                headline.setAttribute('data-blok-uid', `${content._uid}-headline`);
            }
            if (bodyText) {
                bodyText.textContent = content.body_text;
                // Add editable attribute for visual editor
                bodyText.setAttribute('data-blok-c', `${content._uid}:body_text`);
                bodyText.setAttribute('data-blok-uid', `${content._uid}-body_text`);
            }
            
            // Update hero background image from Storyblok
            if (content.main_image && content.main_image.filename) {
                const heroSection = document.querySelector('.hero-section');
                if (heroSection) {
                    heroSection.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${content.main_image.filename}')`;
                }
            }

            // Add the data-blok-c attribute for the visual editor (only if page-content exists)
            const pageContentDiv = document.getElementById('page-content');
            if (pageContentDiv) {
                pageContentDiv.setAttribute('data-blok-c', JSON.stringify({
                    "id": storyblokId,
                    "component": content.component
                }));
                pageContentDiv.setAttribute('data-blok-uid', `${storyblokId}-${content.component}`);
            }

        } catch (error) {
            console.error("Error fetching from Storyblok:", error);
            const headline = document.getElementById('headline');
            if (headline) headline.textContent = "Professional Websites for Small Businesses";
        }
    }

    // 4. Initialize the Visual Editor bridge
    const storyblokInstance = new StoryblokBridge();

    storyblokInstance.on(['published', 'change'], () => {
        location.reload(true); // Simple reload on save/publish
    });

    // Call the function to fetch content when the page loads
    fetchStoryblokContent();
});