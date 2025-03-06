// 📌 FULLSCREEN FUNCTIONALITY
document.getElementById('fullscreenBtn').addEventListener('click', function() {
    let gameFrame = document.getElementById('gameFrame');
    if (gameFrame.requestFullscreen) {
        gameFrame.requestFullscreen();
    } else if (gameFrame.mozRequestFullScreen) { // Firefox
        gameFrame.mozRequestFullScreen();
    } else if (gameFrame.webkitRequestFullscreen) { // Chrome, Safari, Opera
        gameFrame.webkitRequestFullscreen();
    } else if (gameFrame.msRequestFullscreen) { // IE/Edge
        gameFrame.msRequestFullscreen();
    }
});

// 📌 PWA INSTALL FUNCTIONALITY
let deferredPrompt;

// Check if PWA install prompt is available
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault(); // Prevent auto prompt
    deferredPrompt = e;
    document.getElementById('installBtn').style.display = 'block'; // Show install button
});

document.getElementById('installBtn').addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt(); // Show install prompt
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to install prompt: ${outcome}`);
        deferredPrompt = null; // Reset prompt
    }
});

// 📌 SERVICE WORKER REGISTRATION FOR PWA
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('✅ Service Worker Registered'))
        .catch(error => console.log('❌ Service Worker Registration Failed', error));
}

// 📌 CHECK IF APP IS ALREADY INSTALLED
window.addEventListener('appinstalled', () => {
    console.log('✅ App installed successfully');
    document.getElementById('installBtn').style.display = 'none'; // Hide install button after installation
});
