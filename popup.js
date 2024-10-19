// popup.js
document.getElementById('scan').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "extract_question" }, (response) => {
            if (response && response.question) {
                const question = response.question;
                determineAnswer(question);
            }
        });
    });
});

async function determineAnswer(question) {
    document.getElementById('output').innerText = "Extracted Question:\n" + question;

    try {
        const res = await fetch('http://localhost:3000/api/get-answer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question }),
        });

        const data = await res.json();
        if (data.answer) {
            document.getElementById('output').innerText += "\n\nPredicted Answer: " + data.answer;
        } else {
            document.getElementById('output').innerText += "\n\nError fetching answer.";
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('output').innerText += "\n\nError calling API.";
    }
}
