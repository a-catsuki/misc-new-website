import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

import dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map(doc => doc.data());
        
        const sortedUsers = usersList.sort((a, b) => b.points - a.points);

        sortedUsers.forEach((user, index) => {
            console.log('');
            const userDiv = document.createElement('div');
            userDiv.id = `user-${index + 1}`;
            userDiv.classList.add('user-div');
            userDiv.innerHTML = `
                <h3>${user.username}</h3>
                <p>Points: ${user.points}</p>
            `
            console.log(window.sessionStorage.getItem('profileEmail'));
            if (window.sessionStorage.getItem('profileEmail') === user.email) {
                userDiv.classList.add('current-user');
            }
            ;

            document.getElementById('users').appendChild(userDiv);
        });

        // for (let i = sortedUsers.length; i < 3; i++) {
        //     document.getElementById(`user-${i + 1}`).style.display = 'none';
        // }
        document.getElementById('back-to-flag').addEventListener('click', () => {
            window.location.href = 'flag-sub';
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});