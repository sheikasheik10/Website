const googleScriptURL = 'https://script.google.com/macros/s/AKfycbyZKO0ezO6DNJ9CgztqEYgOnycauM0uv3rtgHlG7rB7drk5A4nWn-IQfrrQcdi2kbZ9/exec';

function nextPage(pageNumber) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.add('hidden'));
    document.getElementById(`page${pageNumber}`).classList.remove('hidden');
}

function recordResponse(answer) {
    const data = { response: answer };

    // Send response to Google Sheets
    fetch(googleScriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(() => {
        console.log('Response successfully sent to Google Sheets');
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    // Continue to the next page if YES
    if (answer === 'YES') {
        nextPage(4);
    } else {
        alert("Wrong answer! TRY AGAIN 😅");
    }
}
