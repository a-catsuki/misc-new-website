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

if (!localStorage.getItem('loggedInUser')){
    document.getElementById('coming-soon').style.display = none;
}
else{
    document.getElementById('flag-button').addEventListener('click', async(event) => {
        event.preventDefault();
        const flag = document.getElementById('flag-input').value;
        console.log(flag, String(flag));
        const user_id = localStorage.getItem('loggedInUser');
        const docRef = doc(database, "users", user_id);
        await updateDoc(docRef, {
            answers: arrayUnion(flag),
            points: increment(calc_points(flag))
        }).then(()=> {
            window.location.href = "secret-guide";
        }).catch((error) =>{
            console.error(error);
        })
    })
}

function calc_points(flag){
    return 1;
}

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