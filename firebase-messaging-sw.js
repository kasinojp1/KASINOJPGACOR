// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.1.0/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyCvqbWpS1s_l72Fh8CLxO2jWFnEbSSIGSk",
  authDomain: "kasinojpwork.firebaseapp.com",
  projectId: "kasinojpwork",
  storageBucket: "kasinojpwork.firebasestorage.app",
  messagingSenderId: "291449017470",
  appId: "1:291449017470:web:14d6815edcd61f3618b42f",
  measurementId: "G-D648ETD7YD"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification?.title || 'KasinoJP';
  const notificationOptions = {
    body: payload.notification?.body || '',
    icon: '/favicon.ico'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
