import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getDoc, getFirestore, doc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDYPSXQ4VGdjebNmVBljJS29X9SQG-PGJ4",
    authDomain: "misc-69616.firebaseapp.com",
    projectId: "misc-69616",
    storageBucket: "misc-69616.appspot.com",
    messagingSenderId: "541590138923",
    appId: "1:541590138923:web:c92c54c9cf78e72bc8fa6e"
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('loggedInUser')) {
        document.getElementById('coming-soon').classList.add('hidden');
        document.getElementById('login-redirect').classList.remove('hidden');
    } else {
        document.getElementById('coming-soon').classList.remove('hidden');
        document.getElementById('login-redirect').classList.add('hidden');
        
        document.getElementById('leaderboard-button').addEventListener('click', (event) => {
            window.location.href = "leaderboard";
        });
        document.getElementById('flag-button').addEventListener('click', async (event) => {
            event.preventDefault();
            const flag = document.getElementById('flag-input').value;
            const user_id = localStorage.getItem('loggedInUser');
            const userDocRef = doc(database, "users", user_id);

            if (!flag) {
                showAlert("Please enter a flag!");
                return;
            }

            const user = await getDoc(userDocRef);
            if (!user.exists()) {
                console.error("User doesn't exist");
                return;
            }

            const user_data = user.data();
            let user_answers = user_data.answers || [];
            if (!Array.isArray(user_answers)) {
                user_answers = [];
            }
            console.log("User answers: ", user_answers);

            if (user_answers.includes(flag)) {
                showAlert("You have already submitted this flag!");
                return;
            } else {
                user_answers.push(flag);
                console.log("Flag not found in user answers");
            }

            const points = await calc_points(flag);

            if (points === 0) {
                showAlert("Invalid flag!");
                return;
            }
            await updateDoc(userDocRef, {
                answers: user_answers,
                points: increment(points)
            }).then(() => {
                console.log('new flag');
                showAlert("Flag submitted successfully!");
            }).catch((error) => {
                console.error(error);
            });
        });
    }
});

function showAlert(message) {
    let alertBox = document.createElement('div')
    alertBox.classList.add('alert-box')
    alertBox.id = "alert";
    alertBox.innerHTML = message;
    document.body.appendChild(alertBox)
    alertBox.addEventListener('animationend', function() {
        alertBox.classList.add('disappear')
    })
}

async function calc_points(flag) {
    const flagDocRef = doc(database, "flags", flag);
    const flagDoc = await getDoc(flagDocRef);
    console.log(flagDoc.data());

    if (!flagDoc.exists()) {
        return 0;
    }

    const flagData = flagDoc.data();
    const points = flagData.value;
    const new_counter = flagData.solves + 1;

    // Decrease the flag value by 0.01%
    const new_value = points * 0.9999;
    await updateDoc(flagDocRef, {
        value: new_value,
        solves: new_counter
    });

    return points;
}
