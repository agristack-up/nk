document.addEventListener('DOMContentLoaded', () => {
    // 📌 Fullscreen Button
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

    // 📌 PWA Install Button
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        document.getElementById('installBtn').style.display = 'block'; // Show install button
    });

    document.getElementById('installBtn').addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`User response to install prompt: ${outcome}`);
            deferredPrompt = null;
            document.getElementById('installBtn').style.display = 'none'; // Hide button after install
        }
    });

    // 📌 Register Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(() => console.log('✅ Service Worker Registered'))
            .catch(error => console.log('❌ Service Worker Registration Failed', error));
    }

    // 📌 Hide Install Button After App is Installed
    window.addEventListener('appinstalled', () => {
        console.log('✅ App installed successfully');
        document.getElementById('installBtn').style.display = 'none';
    });
});
