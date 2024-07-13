import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getFirestore, doc, updateDoc, increment, arrayUnion } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "",
    authDomain: "misc-69616.firebaseapp.com",
    projectId: "misc-69616",
    storageBucket: "misc-69616.appspot.com",
    messagingSenderId: "541590138923",
    appId: "1:541590138923:web:c92c54c9cf78e72bc8fa6e"
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        console.log('Space pressed')
        document.getElementById('overlay-warning').classList.add('hidden')
        document.getElementById('coming-soon').classList.remove('hidden')
        document.body.classList.add('space-clicked')
    }
})