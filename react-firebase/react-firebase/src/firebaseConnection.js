import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC_mZ8P4sNk8QiZrN3mUMRuBSDyW-qUxhE",
    authDomain: "class-react-87e47.firebaseapp.com",
    projectId: "class-react-87e47",
    storageBucket: "class-react-87e47.appspot.com",
    messagingSenderId: "373392592735",
    appId: "1:373392592735:web:5e3072fbb3e363f4be30ea",
    measurementId: "G-Q6DPD9TB8M"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export {db};