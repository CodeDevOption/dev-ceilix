import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDAseRxM4UlohGeQ9xVRGqESRkgOuvpSbI",
    authDomain: "dev-ceilix.firebaseapp.com",
    projectId: "dev-ceilix",
    storageBucket: "dev-ceilix.firebasestorage.app",
    messagingSenderId: "291869916920",
    appId: "1:291869916920:web:67cfd8eee8e6d2e0c3850d",
    measurementId: "G-L4RH3V251L"
};

const app = initializeApp(firebaseConfig);;

const db = getFirestore(app);
const storage = getStorage(app);

export {
    db,
    storage
}