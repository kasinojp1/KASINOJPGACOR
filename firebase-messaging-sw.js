<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-messaging.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCvqbWpS1s_l72Fh8CLxO2jWFnEbSSIGSk",
  authDomain: "kasinojpwork.firebaseapp.com",
  projectId: "kasinojpwork",
  storageBucket: "kasinojpwork.firebasestorage.app",
  messagingSenderId: "291449017470",
  appId: "1:291449017470:web:14d6815edcd61f3618b42f",
  measurementId: "G-D648ETD7YD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const messaging = getMessaging(app);
const publicVapidKey = "BHJ3F5NdQSmwmGi0_j0WBgXIkCkmAN7yAIUjGmkZPevuTHaCt6HgnIBRoDVPDD5OFFB8JCQAJPnGYc_GwfU0HZI";

// Registrasi service worker
let swRegistration = null;
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then(reg => {
      console.log('Service Worker terdaftar');
      swRegistration = reg;
    })
    .catch(err => {
      console.error('Gagal registrasi SW', err);
    });
}

// Subscribe user
document.getElementById('enable-notif').addEventListener('click', async () => {
  if (!swRegistration) {
    alert("Service worker belum terdaftar. Tunggu sebentar lalu coba lagi.");
    return;
  }

  try {
    const token = await getToken(messaging, { vapidKey: publicVapidKey, serviceWorkerRegistration: swRegistration });
    if (token) {
      console.log("FCM Token:", token);
      await addDoc(collection(db,'subscribers'),{token, createdAt:serverTimestamp()});
      alert("Notifikasi aktif!");
    } else {
      alert("Tidak dapat mengambil token notifikasi. Pastikan izin notifikasi sudah diberikan.");
    }
  } catch(err){
    console.error(err);
    alert("Gagal aktifkan notifikasi: "+err.message);
  }
});
</script>
