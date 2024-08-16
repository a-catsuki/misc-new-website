import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getDoc, getFirestore, doc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDYPSXQ4VGdjebNmVBljJS29X9SQG-PGJ4",
    authDomain: "misc-69616.firebaseapp.com",
    projectId: "misc-69616",
    storageBucket: "misc-69616.appspot.com",
    messagingSenderId: "541590138923",
    appId: "1:541590138923:web:c92c54c9cf78e72bc8fa6e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
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
            const points = 0;
            const invalid_sub = user_data.invalid_sub || 0;
            var user_answers = user_data.answers || [];
            if (!user_answers) {
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

            const flag_data = await calc_points(flag);
            console.log(invalid_sub);
             if (points === 0) {
                showAlert("Invalid flag!");
                return;
            }
            await updateDoc(userDocRef, {
                answers: user_answers,
                points: increment(flag_data[0]),
                invalid_sub: flag_data[1]
            }).then(() => {
                console.log('new flag');
                showAlert("Flag submitted successfully!");
            }).catch((error) => {
                console.error(error);
            });
        });
    }
});

document.getElementById('logout').addEventListener('click', (event) => {
    signOut(auth).then(() => {
        window.sessionStorage.clear();
        localStorage.clear();
        window.location.href = "login";
        console.log("User signed out.")
        // Sign-out successful.
      }).catch((error) => {
        console.error(error);
        showAlert(error);
        console.log('Try again, sign-out failed.')
        // An error happened.
      });
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
    const invalid_sub = 0;

    if (points === 0) {
        if (invalid_sub<5) {
            invalid_sub++;
        }
    }

    // Decrease the flag value by 1 for incorrect submissions

    const new_value = points - invalid_sub;
    await updateDoc(flagDocRef, {
        value: points,
        solves: new_counter
    });

    return [points,invalid_sub];
}