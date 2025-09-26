// KSRTC Bus Ticket Booking System
class KSRTCBookingSystem {
    constructor() {
        this.bookingData = null;
        this.paymentReference = null;
        this.paymentMethod = null;
        this.initializeEventListeners();
        this.initDarkMode();
        this.initViewBookings();
        this.initPaymentModal();
    }

    initializeEventListeners() {
        // Set minimum date for travel date
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('travelDate').setAttribute('min', today);
    }

    initDarkMode() {
        const darkModeToggle = document.getElementById('darkModeToggle');
        const currentMode = localStorage.getItem('darkMode') || 'light';
        if (currentMode === 'dark') {
            document.body.classList.add('dark-mode');
            darkModeToggle.textContent = 'Light Mode';
        } else {
            darkModeToggle.textContent = 'Dark Mode';
        }

        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'dark');
                darkModeToggle.textContent = 'Light Mode';
            } else {
                localStorage.setItem('darkMode', 'light');
                darkModeToggle.textContent = 'Dark Mode';
            }
        });
    }

    initViewBookings() {
        const viewBookingsBtn = document.getElementById('viewBookingsBtn');
        const bookingsSection = document.getElementById('viewBookings');
        const closeBtn = bookingsSection.querySelector('button');

        viewBookingsBtn.addEventListener('click', () => {
            this.showBookings();
        });

        closeBtn.addEventListener('click', () => {
            this.closeViewBookings();
        });
    }

    initPaymentModal() {
        const modal = document.getElementById('paymentModal');
        const closeModalBtn = document.getElementById('closeModal');

        closeModalBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    showBookingForm() {
        document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
    }

    handleBooking(event) {
        event.preventDefault();

        // Show loading
        this.showLoading('Validating booking details...');

        setTimeout(() => {
            this.hideLoading();

            const busNumber = document.getElementById('busNumber').value;
            const fromPlace = document.getElementById('fromPlace').value;
            const toPlace = document.getElementById('toPlace').value;
            const travelDate = document.getElementById('travelDate').value;
            const passengerName = document.getElementById('passengerName').value;
            const mobileNumber = document.getElementById('mobileNumber').value;

            // Validate that from and to places are different
            if (fromPlace === toPlace) {
                alert('From and To places cannot be the same!');
                return;
            }

            // Store booking data
            this.bookingData = {
                busNumber,
                fromPlace,
                toPlace,
                travelDate,
                passengerName,
                mobileNumber
            };

            // Generate payment reference
            this.paymentReference = this.generatePaymentReference();

            // Show payment section
            this.showPaymentSection();
        }, 1500);
    }

    generatePaymentReference() {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `KSRTC${timestamp}${random}`;
    }

    showPaymentSection() {
        const bookingSection = document.getElementById('booking');
        const paymentSection = document.getElementById('payment');

        // Fade out booking
        bookingSection.classList.add('fade-out');
        setTimeout(() => {
            bookingSection.style.display = 'none';
            bookingSection.classList.remove('fade-out');

            // Show and fade in payment
            paymentSection.style.display = 'block';
            paymentSection.classList.add('fade-in');
            setTimeout(() => {
                paymentSection.classList.add('show');
                paymentSection.scrollIntoView({ behavior: 'smooth' });
            }, 10);
        }, 500);

        // Display payment reference
        document.getElementById('paymentRef').textContent = this.paymentReference;

        // Generate QR code for payment
        this.generateQRCode();

        // Display payment amount
        document.getElementById('paymentAmount').textContent = '₹' + this.calculateFare();
    }

    generateQRCode() {
        const qrData = {
            paymentReference: this.paymentReference,
            amount: this.calculateFare(),
            busNumber: this.bookingData.busNumber,
            route: `${this.bookingData.fromPlace} to ${this.bookingData.toPlace}`
        };

        const qrCodeContainer = document.getElementById('qrCode');
        qrCodeContainer.innerHTML = '';

        new QRCode(qrCodeContainer, {
            text: JSON.stringify(qrData),
            width: 200,
            height: 200,
            colorDark: "#1a365d",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        document.getElementById('qrCodeSection').style.display = 'block';
    }

    calculateFare() {
        // Simple fare calculation based on distance (in KM) for Karnataka routes
        const distanceMap = {
            'Bangalore-Mysore': 150,
            'Bangalore-Mangalore': 350,
            'Bangalore-Hubli': 400,
            'Bangalore-Belgaum': 500,
            'Bangalore-Davangere': 250,
            'Bangalore-Bellary': 150,
            'Bangalore-Gulbarga': 620,
            'Bangalore-Bijapur': 550,
            'Bangalore-Shimoga': 280,
            'Bangalore-Tumkur': 70,
            'Bangalore-Raichur': 410,
            'Mysore-Mangalore': 250,
            'Mysore-Hubli': 350,
            'Mysore-Belgaum': 450,
            'Mysore-Davangere': 200,
            'Mysore-Bellary': 200,
            'Mysore-Gulbarga': 550,
            'Mysore-Bijapur': 480,
            'Mysore-Shimoga': 150,
            'Mysore-Tumkur': 120,
            'Mysore-Raichur': 360,
            'Mangalore-Hubli': 280,
            'Mangalore-Belgaum': 380,
            'Mangalore-Davangere': 250,
            'Mangalore-Bellary': 350,
            'Mangalore-Gulbarga': 650,
            'Mangalore-Bijapur': 580,
            'Mangalore-Shimoga': 200,
            'Mangalore-Tumkur': 280,
            'Mangalore-Raichur': 510,
            'Hubli-Belgaum': 100,
            'Hubli-Davangere': 150,
            'Hubli-Bellary': 250,
            'Hubli-Gulbarga': 350,
            'Hubli-Bijapur': 150,
            'Hubli-Shimoga': 120,
            'Hubli-Tumkur': 330,
            'Hubli-Raichur': 310,
            'Belgaum-Davangere': 200,
            'Belgaum-Bellary': 300,
            'Belgaum-Gulbarga': 400,
            'Belgaum-Bijapur': 180,
            'Belgaum-Shimoga': 180,
            'Belgaum-Tumkur': 380,
            'Belgaum-Raichur': 360,
            'Davangere-Bellary': 150,
            'Davangere-Gulbarga': 350,
            'Davangere-Bijapur': 250,
            'Davangere-Shimoga': 80,
            'Davangere-Tumkur': 180,
            'Davangere-Raichur': 260,
            'Bellary-Gulbarga': 250,
            'Bellary-Bijapur': 300,
            'Bellary-Shimoga': 200,
            'Bellary-Tumkur': 150,
            'Bellary-Raichur': 150,
            'Gulbarga-Bijapur': 150,
            'Gulbarga-Shimoga': 400,
            'Gulbarga-Tumkur': 400,
            'Gulbarga-Raichur': 100,
            'Bijapur-Shimoga': 300,
            'Bijapur-Tumkur': 450,
            'Bijapur-Raichur': 200,
            'Shimoga-Tumkur': 200,
            'Shimoga-Raichur': 350,
            'Tumkur-Raichur': 350
        };

        const route = `${this.bookingData.fromPlace}-${this.bookingData.toPlace}`;
        const reverseRoute = `${this.bookingData.toPlace}-${this.bookingData.fromPlace}`;
        const distance = distanceMap[route] || distanceMap[reverseRoute] || 100; // Default 100km

        // Base fare calculation: ₹5 per km + ₹50 base fare
        return Math.round(distance * 5 + 50);
    }

    processPayment() {
        const paymentMethod = document.getElementById('paymentMethod').value;

        if (!paymentMethod) {
            alert('Please select a payment method!');
            return;
        }

        this.paymentMethod = paymentMethod;

        // Simulate payment processing
        this.showLoading('Processing payment...');

        setTimeout(() => {
            this.hideLoading();
            // Show payment confirmation modal instead of alert
            const modal = document.getElementById('paymentModal');
            modal.style.display = 'block';
        }, 2000);
    }

    generateTicket() {
        // Hide payment section and show ticket
        document.getElementById('payment').style.display = 'none';
        document.getElementById('ticket').style.display = 'block';

        // Populate ticket details
        document.getElementById('ticketNumber').textContent = this.paymentReference;
        document.getElementById('ticketBusNumber').textContent = this.bookingData.busNumber;
        document.getElementById('ticketFrom').textContent = this.bookingData.fromPlace;
        document.getElementById('ticketTo').textContent = this.bookingData.toPlace;
        document.getElementById('ticketDate').textContent = this.bookingData.travelDate;
        document.getElementById('ticketPassenger').textContent = this.bookingData.passengerName;
        document.getElementById('ticketPaymentMethod').textContent = this.paymentMethod;
        document.getElementById('ticketAmount').textContent = '₹' + this.calculateFare();
        document.getElementById('ticketPaymentRef').textContent = this.paymentReference;

        // Generate QR code for ticket
        const ticketQRData = {
            ticketNumber: this.paymentReference,
            busNumber: this.bookingData.busNumber,
            route: `${this.bookingData.fromPlace} to ${this.bookingData.toPlace}`,
            date: this.bookingData.travelDate,
            passenger: this.bookingData.passengerName,
            paymentMethod: this.paymentMethod,
            amount: this.calculateFare()
        };

        const ticketQRContainer = document.getElementById('ticketQRCode');
        ticketQRContainer.innerHTML = '';

        new QRCode(ticketQRContainer, {
            text: JSON.stringify(ticketQRData),
            width: 150,
            height: 150,
            colorDark: "#1a365d",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        // Store ticket data in localStorage
        this.saveTicketData();
    }

    saveTicketData() {
        const ticketData = {
            ...this.bookingData,
            paymentMethod: this.paymentMethod,
            paymentReference: this.paymentReference,
            fare: this.calculateFare(),
            bookingDate: new Date().toISOString(),
            ticketNumber: this.paymentReference
        };

        // Get existing tickets
        const existingTickets = JSON.parse(localStorage.getItem('ksrtcTickets') || '[]');

        // Add new ticket
        existingTickets.push(ticketData);

        // Save back to localStorage
        localStorage.setItem('ksrtcTickets', JSON.stringify(existingTickets));
    }

    downloadTicket() {
        const ticketElement = document.getElementById('ticketDetails');

        // Create a new window for printing
        const printWindow = window.open('', '_blank');
        printWindow.document.write(
            '<!DOCTYPE html><html><head><title>KSRTC Ticket - ' + this.paymentReference + '</title><style>' +
            'body { font-family: Arial, sans-serif; margin: 20px; }' +
            '.ticket { border: 2px solid #3182ce; border-radius: 8px; padding: 20px; max-width: 500px; margin: 0 auto; }' +
            '.ticket-header { text-align: center; margin-bottom: 20px; }' +
            '.ticket-row { display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid #eee; }' +
            '.label { font-weight: bold; }' +
            '</style></head><body>' +
            ticketElement.innerHTML +
            '</body></html>'
        );
        printWindow.document.close();
        printWindow.print();
    }

    printTicket() {
        window.print();
    }

    backToBooking() {
        const paymentSection = document.getElementById('payment');
        const bookingSection = document.getElementById('booking');

        // Fade out payment
        paymentSection.classList.remove('show');
        setTimeout(() => {
            paymentSection.style.display = 'none';

            // Show and fade in booking
            bookingSection.style.display = 'block';
            bookingSection.classList.add('fade-in');
            setTimeout(() => {
                bookingSection.classList.add('show');
                bookingSection.scrollIntoView({ behavior: 'smooth' });
            }, 10);
        }, 500);
    }

    showLoading(message) {
        const loadingDiv = document.createElement('div');
        loadingDiv.id = 'loading';
        loadingDiv.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        `;

        loadingDiv.innerHTML = `
            <div style="background: white; padding: 20px; border-radius: 8px; text-align: center;">
                <div style="border: 4px solid #f3f3f3; border-top: 4px solid #3182ce; border-radius: 50%; width: 40px; height: 40px; animation: spin 2s linear infinite; margin: 0 auto 10px;"></div>
                <p>${message}</p>
            </div>
        `;

        document.body.appendChild(loadingDiv);

        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

    hideLoading() {
        const loadingDiv = document.getElementById('loading');
        if (loadingDiv) {
            loadingDiv.remove();
        }
    }

    showBookings() {
        const bookingsSection = document.getElementById('viewBookings');
        const bookingSection = document.getElementById('booking');
        const paymentSection = document.getElementById('payment');
        const ticketSection = document.getElementById('ticket');

        bookingSection.style.display = 'none';
        paymentSection.style.display = 'none';
        ticketSection.style.display = 'none';
        bookingsSection.style.display = 'block';
        bookingsSection.scrollIntoView({ behavior: 'smooth' });

        this.renderBookings();
    }

    closeViewBookings() {
        const bookingsSection = document.getElementById('viewBookings');
        bookingsSection.style.display = 'none';
        document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
    }

    renderBookings() {
        const bookingsList = document.getElementById('bookingsList');
        bookingsList.innerHTML = '';

        const tickets = JSON.parse(localStorage.getItem('ksrtcTickets') || '[]');

        if (tickets.length === 0) {
            bookingsList.innerHTML = '<p>No bookings found.</p>';
            return;
        }

        tickets.forEach(ticket => {
            const ticketDiv = document.createElement('div');
            ticketDiv.classList.add('booking-item');
            ticketDiv.innerHTML = `
                <p><strong>Ticket #:</strong> ${ticket.ticketNumber}</p>
                <p><strong>Bus Number:</strong> ${ticket.busNumber}</p>
                <p><strong>Route:</strong> ${ticket.fromPlace} to ${ticket.toPlace}</p>
                <p><strong>Date:</strong> ${ticket.travelDate}</p>
                <p><strong>Passenger:</strong> ${ticket.passengerName}</p>
                <p><strong>Fare:</strong> ₹${ticket.fare}</p>
                <hr />
            `;
            bookingsList.appendChild(ticketDiv);
        });
    }
}

// Initialize the booking system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.ksrtcSystem = new KSRTCBookingSystem();
});

// Make functions globally available
function showBookingForm() {
    window.ksrtcSystem.showBookingForm();
}

function handleBooking(event) {
    window.ksrtcSystem.handleBooking(event);
}

function processPayment() {
    window.ksrtcSystem.processPayment();
}

function backToBooking() {
    window.ksrtcSystem.backToBooking();
}

function downloadTicket() {
    window.ksrtcSystem.downloadTicket();
}

function printTicket() {
    window.ksrtcSystem.printTicket();
}

function closeViewBookings() {
    window.ksrtcSystem.closeViewBookings();
}

function goToTicket() {
    const modal = document.getElementById('paymentModal');
    modal.style.display = 'none';
    window.ksrtcSystem.generateTicket();
}
