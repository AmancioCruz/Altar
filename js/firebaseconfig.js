import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyB6ObzYE0Tl5xezLrJeZ7QwTYnyxSRGW_E",
    authDomain: "altares-2025.firebaseapp.com",
    projectId: "altares-2025",
    storageBucket: "altares-2025.firebasestorage.app",
    messagingSenderId: "871762862565",
    appId: "1:871762862565:web:b3c638f6885ac9cbabcf0c",
    measurementId: "G-075208TPWP"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

console.log(storage);

export { app, storage };
