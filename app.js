// app.js
document.addEventListener("DOMContentLoaded", function() {
    const camera = document.getElementById('camera');
    const canvas = document.getElementById('canvas');
    const photo = document.getElementById('photo');
    const captureButton = document.getElementById('capture');
    const downloadButton = document.getElementById('download');
    const printButton = document.getElementById('print');
    const countdownDisplay = document.getElementById('countdown');
    const printablePage = document.getElementById('printablePage');
    const printPhoto = document.getElementById('printPhoto');
    const logo = document.getElementById('logo');

    // Access the camera
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            camera.srcObject = stream;
        })
        .catch(error => {
            console.error("Error accessing camera: ", error);
        });

    // Function to start countdown
    function startCountdown() {
        let timeLeft = 3; // countdown from 3 seconds
        countdownDisplay.textContent = timeLeft;
        countdownDisplay.style.display = 'block'; // Ensure countdown is visible

        const countdownInterval = setInterval(() => {
            timeLeft -= 1;
            countdownDisplay.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                countdownDisplay.style.display = 'none'; // Hide countdown
                capturePhoto(); // Proceed to capture the photo
            }
        }, 1000);
    }

    // Capture photo
    function capturePhoto() {
        const context = canvas.getContext('2d');
        canvas.width = camera.videoWidth;
        canvas.height = camera.videoHeight;
        context.drawImage(camera, 0, 0, canvas.width, canvas.height);
        photo.src = canvas.toDataURL('image/png');
        printPhoto.src = canvas.toDataURL('image/png');
        printablePage.style.display = 'block'; // Show printable page
        downloadButton.style.display = 'block';
        printButton.style.display = 'block';
    }

    // Capture button click event
    captureButton.addEventListener('click', function() {
        startCountdown(); // Start the countdown on button click
    });

    // Download photo
    downloadButton.addEventListener('click', function() {
        const link = document.createElement('a');
        link.href = photo.src;
        link.download = 'photo.png';
        link.click();
    });

    // Print photo
    printButton.addEventListener('click', function() {
        window.print(); // Trigger print dialog
    });

    // Optionally set a logo (customize this path as needed)
    logo.src = 'path/to/your/logo.png'; // Replace with your logo URL
});
