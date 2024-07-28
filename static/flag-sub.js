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
        
        document.getElementById('flag-button').addEventListener('click', async (event) => {
            event.preventDefault();
            const flag = document.getElementById('flag-input').value;
            const user_id = localStorage.getItem('loggedInUser');
            const docRef = doc(database, "users", user_id);

            const curr = new Date();
            const start_week = new Date(curr);
            start_week.setDate(curr.getDate() - curr.getDay());
            start_week.setHours(0, 0, 0, 0);
            console.log("Start of the week: ", start_week);

            const user = await getDoc(docRef);
            if (!user.exists()) {
                console.error("User doesn't exist");
                return;
            }

            const user_data = user.data();
            const answers = user_data.answers || {};
            console.log("User answers: ", answers);

            const week_answers = Object.keys(answers).filter(date => {
                const answer_date = new Date(date);
                console.log("Comparing: ", answer_date, " with ", start_week);
                return answer_date >= start_week;
            }).length;

            console.log("Number of answers this week: ", week_answers);

            if (week_answers >= 2) {
                alert("You have already given 2 Answers!!");
                return;
            }

            const current = new Date().toISOString();
            await updateDoc(docRef, {
                [`answers.${current}`]: flag,
                points: increment(calc_points(flag))
            }).then(() => {
                window.location.href = "leaderboard.html";
            }).catch((error) => {
                console.error(error);
            });
        });
    }
});

function calc_points(flag) {
    return 1;
    //IMPORTANT flags "FLAG{E39234} FLAG{H99330} FLAG{M24051} FLAG{E13312}"
}
