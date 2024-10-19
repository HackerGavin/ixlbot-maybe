// content.js
function extractQuestion() {
    const questionElements = document.querySelectorAll('p'); // Adjust based on the structure of the webpage
    return Array.from(questionElements).map(el => el.innerText).join('\n');
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "extract_question") {
        const question = extractQuestion();
        sendResponse({ question: question });
    }
});
