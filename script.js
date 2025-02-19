function showForm() {
    document.getElementById('frontPage').style.display = 'none';
    document.getElementById('fraudForm').style.display = 'block';
}

function exitSystem() {
    alert("Thank you for using the system!");
    window.close();
}

function checkFraud() {
    const cardNumber = document.getElementById('cardNumber').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);
    const merchant = document.getElementById('merchant').value.trim();
    const location = document.getElementById('location').value.trim();
    const isInternational = document.getElementById('isInternational').checked;
    const transactionTime = document.getElementById('transactionTime').value;


    if (!/^\d{16}$/.test(cardNumber)) {
        alert("Invalid Card Number! It must be exactly 16 digits.");
        return;
    }

    if (!cardNumber || isNaN(amount) || !merchant || !location || !transactionTime) {
        alert("Please fill in all fields correctly.");
        return;
    }

    const hour = parseInt(transactionTime.split(':')[0]);
    let fraudMessages = [];

    if (amount > 10000) fraudMessages.push("Large transaction amount detected.");
    if (isInternational && location.toUpperCase() !== "USA") 
        fraudMessages.push("International transaction from unusual location.");
    if (hour < 6 || hour > 22) fraudMessages.push("Transaction occurred during odd hours.");
    if (merchant.toLowerCase() === "online gambling") 
        fraudMessages.push("This card is known for high-risk transactions.");

    const resultDiv = document.getElementById('result');
    if (fraudMessages.length > 0) {
        resultDiv.innerHTML = `<strong>Suspicious:</strong> ${fraudMessages.join("<br>")}`;
        resultDiv.classList.remove('legitimate');
        resultDiv.classList.add('fraud');
    } else {
        resultDiv.textContent = "Transaction is Valid.";
        resultDiv.classList.remove('fraud');
        resultDiv.classList.add('legitimate');
    }
}