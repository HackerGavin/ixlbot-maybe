// content.js
function extractQuestion() {
    // You can customize this selector based on the webpage structure
    const questionElements = document.querySelectorAll('p'); // Adjust as necessary
    return Array.from(questionElements).map(el => el.innerText).join('\n');
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "extract_question") {
        const question = extractQuestion();
        sendResponse({ question: question });
    }
});
