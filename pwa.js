pwa.js// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Handle PWA install prompt
let deferredPrompt;
let installButton;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = e;
  
  // Create install button if it doesn't exist
  if (!installButton) {
    installButton = document.createElement('button');
    installButton.textContent = '📱 Install App';
    installButton.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 10px 15px;
      background: #4ade80;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      z-index: 1000;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    
    installButton.addEventListener('click', () => {
      // Hide the install button
      installButton.style.display = 'none';
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        deferredPrompt = null;
      });
    });
    
    document.body.appendChild(installButton);
  }
});

// Handle successful installation
window.addEventListener('appinstalled', (evt) => {
  console.log('PWA was installed successfully');
  if (installButton) {
    installButton.remove();
  }
});

// Check if app is running as PWA
function isPWA() {
  return window.matchMedia('(display-mode: standalone)').matches || 
         window.navigator.standalone === true;
}

if (isPWA()) {
  console.log('Running as PWA');
  // Add any PWA-specific functionality here
}
