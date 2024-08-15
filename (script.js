document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-btn');
    const stopButton = document.getElementById('stop-btn');
    const clearButton = document.getElementById('clear-btn');
    const transcriptDiv = document.getElementById('transcript');
    const statusDiv = document.getElementById('status');

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => {
        statusDiv.textContent = 'Listening...';
        startButton.disabled = true;
        stopButton.disabled = false;
    };

    recognition.onresult = event => {
        const result = event.results[0][0].transcript;
        transcriptDiv.textContent += result + ' ';
    };

    recognition.onerror = event => {
        statusDiv.textContent = `Error: ${event.error}`;
    };

    recognition.onend = () => {
        statusDiv.textContent = 'Stopped listening.';
        startButton.disabled = false;
        stopButton.disabled = true;
    };

    startButton.addEventListener('click', () => {
        recognition.start();
    });

    stopButton.addEventListener('click', () => {
        recognition.stop();
    });

    clearButton.addEventListener('click', () => {
        transcriptDiv.textContent = '';
    });
});
