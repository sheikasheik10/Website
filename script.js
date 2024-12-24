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
        // Show a message after successful submission
        if (answer === 'YES') {
            alert("🎉 Response recorded! Thank you for saying YES! See you on the date! ❤️");
        } else {
            alert("😅 Nice try! But YES is the only correct answer.");
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert("Something went wrong. Please try again!");
    });

    // Continue to the next page if YES
    if (answer === 'YES') {
        nextPage(4);
    } else {
        alert("Wrong answer! TRY AGAIN 😅");
    }
}
