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
        
        const sortedUsers = usersList.sort((a, b) => b.points - a.points);

        sortedUsers.forEach((user, index) => {
            console.log('');
            const userDiv = document.createElement('div');
            const top3div = document.createElement('div');
            top3div.id = `top3`;
            userDiv.id = `user-${index + 1}`;
            userDiv.classList.add('user-div');
            top3div.classList.add('top3-div');
            top3div.innerHTML = `
                <h3>Aug[Top 3]</h3>
            `
            userDiv.innerHTML = `
                <h3>${user.username}</h3>
                <p>Current Points: ${user.points}</p>
            `
            console.log(window.sessionStorage.getItem('profileEmail'));
            if (user.top3) {
                userDiv.appendChild(top3div);
            } else {
                console.log('Not top 3');
                user.top3 = false;
            }
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