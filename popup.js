const predefinedAnswers = {
    "What is the capital of France?": "The capital of France is Paris.",
    "What is 2 + 2?": "2 + 2 equals 4.",
    "What is the largest planet in our solar system?": "The largest planet is Jupiter.",
    // Add more predefined questions and answers here
};

document.getElementById('scan').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "extract_question" }, (response) => {
            if (response && response.question) {
                const question = response.question;
                provideAnswer(question);
            }
        });
    });
});

function provideAnswer(question) {
    document.getElementById('output').innerText = "Extracted Question:\n" + question;

    // Check for a predefined answer
    const answer = predefinedAnswers[question] || "Sorry, I don't know the answer.";
    document.getElementById('output').innerText += "\n\nPredicted Answer: " + answer;
}
