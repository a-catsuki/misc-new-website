import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyDYPSXQ4VGdjebNmVBljJS29X9SQG-PGJ4",
    authDomain: "misc-69616.firebaseapp.com",
    projectId: "misc-69616",
    storageBucket: "misc-69616.appspot.com",
    messagingSenderId: "541590138923",
    appId: "1:541590138923:web:c92c54c9cf78e72bc8fa6e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map(doc => doc.data());
        
        const sortedUsers = usersList.sort((a, b) => b.points - a.points).slice(0, 3);

        sortedUsers.forEach((user, index) => {
            document.getElementById(`user-${index + 1}`).innerHTML = `
                <h3>${user.username}</h3>
                <p>Points: ${user.points}</p>
            `;
        });

        for (let i = sortedUsers.length; i < 3; i++) {
            document.getElementById(`user-${i + 1}`).style.display = 'none';
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});