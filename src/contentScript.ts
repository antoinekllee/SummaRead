let originalPageContent: HTMLElement | null = null;
let isReaderEnabled = false;

const declutterPage = () => {
    if (!isReaderEnabled) {
        originalPageContent = document.body.cloneNode(true) as HTMLElement;

        const extractedContent = document.createElement("div");

        const article = document.querySelector(
            "article, .article, .post, .content, .entry-content"
        );

        if (article) {
            const clonedArticle = article.cloneNode(true) as HTMLElement;

            const elementsToRemove = clonedArticle.querySelectorAll(
                ".ad, .sidebar, .popup, .menu, .nav, .share-buttons, .related-articles, header, footer"
            );
            elementsToRemove.forEach((element) => element.remove());

            // Make images the exact width of the page and centered at 800px
            const images = clonedArticle.querySelectorAll("img");
            images.forEach((image) => {
                image.style.display = "block";
                image.style.width = "100%";
                image.style.margin = "0 auto";
                image.style.maxWidth = "800px";
            });

            extractedContent.appendChild(clonedArticle);
        } else {
            // If no main article is found, extract the content based on headings, paragraphs, images, and links
            const headings = document.querySelectorAll(
                "h1, h2, h3, h4, h5, h6"
            );
            const paragraphs = document.querySelectorAll("p");
            const images = document.querySelectorAll("img");
            const links = document.querySelectorAll("a");

            headings.forEach((heading) =>
                extractedContent.appendChild(heading.cloneNode(true))
            );
            paragraphs.forEach((paragraph) =>
                extractedContent.appendChild(paragraph.cloneNode(true))
            );
            images.forEach((image) => {
                const clonedImage = image.cloneNode(true) as HTMLImageElement;
                clonedImage.style.display = "block";
                clonedImage.style.width = "100%";
                clonedImage.style.margin = "0 auto";
                clonedImage.style.maxWidth = "800px";
                extractedContent.appendChild(clonedImage);
            });
            links.forEach((link) =>
                extractedContent.appendChild(link.cloneNode(true))
            );
        }

        // Replace the entire body content with the extracted content
        document.body.innerHTML = "";
        document.body.appendChild(extractedContent);

        // Adjust the body's style for better readability and dark theme
        document.body.style.margin = "auto";
        document.body.style.maxWidth = "800px";
        document.body.style.lineHeight = "1.6";
        document.body.style.fontSize = "18px";
        document.body.style.color = "#000000";
        document.body.style.padding = "1em";
        document.body.style.backgroundColor = "#ffffff"; 
        document.body.style.fontFamily = "Arial, sans-serif"; // Optional: Set a default font family

        isReaderEnabled = true;
    } else {
        if (originalPageContent) document.body.replaceWith(originalPageContent);
        isReaderEnabled = false;
    }
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggleDeclutterPage") {
        declutterPage();
        sendResponse({ isReaderEnabled });
        return true;
    }
});
