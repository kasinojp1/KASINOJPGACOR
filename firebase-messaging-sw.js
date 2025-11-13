importScripts('https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/11.0.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyCvqbWpS1s_l72Fh8CLxO2jWFnEbSSIGSk",
  authDomain: "kasinojpwork.firebaseapp.com",
  databaseURL: "https://kasinojpwork-default-rtdb.firebaseio.com",
  projectId: "kasinojpwork",
  storageBucket: "kasinojpwork.firebasestorage.app",
  messagingSenderId: "291449017470",
  appId: "1:291449017470:web:14d6815edcd61f3618b42f",
  measurementId: "G-D648ETD7YD"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
