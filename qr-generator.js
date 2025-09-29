const busData = [
    { busNumber: "KA-01-F-1234", fromPlace: "Bangalore" },
    { busNumber: "KA-02-A-5678", fromPlace: "Mysore" },
    { busNumber: "KA-03-B-9012", fromPlace: "Mangalore" },
    { busNumber: "KA-04-C-3456", fromPlace: "Hubli" },
    { busNumber: "KA-05-D-7890", fromPlace: "Belgaum" },
    { busNumber: "KA-06-E-1357", fromPlace: "Davangere" },
    { busNumber: "KA-07-F-2468", fromPlace: "Bellary" },
    { busNumber: "KA-08-G-3690", fromPlace: "Gulbarga" }
];

function generateQRCodes() {
    const qrGrid = document.getElementById('qrGrid');
    qrGrid.innerHTML = '';

    busData.forEach(bus => {
        const qrCard = document.createElement('div');
        qrCard.className = 'qr-card';

        qrCard.innerHTML = `
            <h3>Bus QR Code</h3>
            <div class="bus-info">
                <strong>Bus:</strong> ${bus.busNumber}<br>
                <strong>From:</strong> ${bus.fromPlace}
            </div>
            <div class="qr-code-container" id="qr-${bus.busNumber.replace(/[^a-zA-Z0-9]/g, '')}"></div>
        `;

        qrGrid.appendChild(qrCard);

        // Generate QR code
        const qrData = JSON.stringify({
            busNumber: bus.busNumber,
            fromPlace: bus.fromPlace
        });

        new QRCode(document.getElementById(`qr-${bus.busNumber.replace(/[^a-zA-Z0-9]/g, '')}`), {
            text: qrData,
            width: 150,
            height: 150,
            colorDark: "#1a365d",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    });
}

// Auto-generate QR codes on page load
window.addEventListener('DOMContentLoaded', generateQRCodes);
