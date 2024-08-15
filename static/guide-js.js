// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
// import { getDoc, getFirestore, doc, updateDoc, increment, arrayUnion } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

// import dotenv from 'dotenv';

// dotenv.config();

// const firebaseConfig = {
//     apiKey: process.env.apiKey,
//     authDomain: process.env.authDomain,
//     projectId: process.env.projectId,
//     storageBucket: process.env.storageBucket,
//     messagingSenderId: process.env.messagingSenderId,
//     appId: process.env.appId
// };

// const app = initializeApp(firebaseConfig);
// const database = getFirestore(app);

// document.addEventListener('keyup', event => {
//     if (event.code === 'Space') {
//         console.log('Space pressed')
//         document.getElementById('overlay-warning').classList.add('hidden')
//         document.getElementById('coming-soon').classList.remove('hidden')
//         document.body.classList.add('space-clicked')
//         window.location.href = 'flag-sub';
//     }
// })

// document.addEventListener('DOMContentLoaded', () => {
//     if (!localStorage.getItem('loggedInUser')){
//         document.getElementById('coming-soon').style.display = 'none';
//         document.getElementById('login-redirect').style.display = 'block';
//     }
//     else{
//         document.getElementById('coming-soon').style.display = 'block';
//         document.getElementById('login-redirect').style.display = 'none';
//         document.getElementById('flag-button').addEventListener('click', async(event) => {
//             event.preventDefault();
//             const flag = document.getElementById('flag-input').value;
//             //console.log(flag, String(flag));
//             const user_id = localStorage.getItem('loggedInUser');
//             const docRef = doc(database, "users", user_id);

//             const curr = new Date();
//             const start_week = new Date(curr.setDate(curr.getDate()- curr.getDay()));

//             const user = await getDoc(docRef);
//             if (!user.exists()){
//                 console.error("User doesn't exist");
//                 return;
//             }

//             const user_data = user.data();
//             const answers = user_data.answers || {};

//             const week_answers = Object.keys(answers).filter(date => {
//                 const answer_date = new Date(date);
//                 return answer_date >= start_week;
//             }).length;

//             if(week_answers >= 2){
//                 alert("You have already given 2 Answers!!");
//                 return;
//             }

//             const current = new Date().toISOString();
//             await updateDoc(docRef, {
//                 [`answers.${current}`]: flag,
//                 points: increment(calc_points(flag))
//             }).then(()=> {
//                 window.location.href = "leaderboard";
//             }).catch((error) =>{
//                 console.error(error);
//             })
//         })
//     }
    
// })

// function calc_points(flag){
//     return 1;
// }

// if (false){
//     document.getElementById('coming-soon').style.display = none;
// }
// else{
//     document.getElementById('flag-button').addEventListener('click', (event) => {
//         event.preventDefault();
//         const flag = document.getElementById('flag').vlaue;
//         const user_id = localStorage.getItem('loggedInUser');
//         const docRef = doc(database, "users", user_id);
//         updateDoc(docRef, {
//             answers: arrayUnion(flag),
//             points: increment(calc_points(flag))
//         })
//     })
// }

// function calc_points(flag){
//     return 1;
// }