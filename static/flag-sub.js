import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { setDoc, getDoc, getFirestore, doc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
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
            var flag = document.getElementById('flag-input').value;           
            if (!flag) {
                showAlert("Please enter a flag!");
                return;
            }

            if(!checkAdminCookies(flag)){
                showAlert("You are not authorized to submit the flag! -1 point");
                await handleInvalidSub();
                return;
            }
            const user_id = localStorage.getItem('loggedInUser');
            const userDocRef = doc(database, "users", user_id);
            flag = flag.hashCode().toString();

            const user = await getDoc(userDocRef);
            var username = user.displayName;
            console.log(user.answers);
            let email = window.sessionStorage.getItem('profileEmail');
            if (!user.exists()) {
                console.log("User doesn't exist");
                console.log("Username: ", username);
                while (!validate_username(username) || username == null) {
                    username = prompt('Please enter a username');
                }
                const userData = {
                    email:email,
                    username: username,
                    points: 0,
                    answers: []
                }
                console.log("new username", username);
                setDoc(userDocRef,userData);
                // return;
            } else {
                console.log("User exists");
                console.log(user.data());
            }

            const user_data = await getDoc(userDocRef);
            let invalid_sub = user_data.incorrect_answers || 0;
            var super_flag_checker = false;
            const user_answers = user_data.data().answers || [];

            // if (!Array.isArray(user_answers)) {
            //     user_answers = Array.of(user_answers);
            // }

            console.log("User answers: ", user_answers);

            // Check if any previously submitted flag starts with 'FLAG{S'
            if (flag.startsWith('FLAG{S') && user_answers.some(answer => answer.startsWith('FLAG{S'))) {
                showAlert("You have already submitted a SuperFlag'. You can't submit another one.");
                return;
            }

            if (user_answers.includes(flag)) {
                showAlert("You have already submitted this flag!");
                return;
            } else {
                user_answers.push(flag);
                console.log("Flag not found in user answers");
            }

            const flag_data = await calc_points(flag, invalid_sub);
            invalid_sub = flag_data[1]; // Ensure that the updated invalid_sub is used
            super_flag_checker = flag_data[2];
            var points = flag_data[0] || 0;

            if (points == 0 && !super_flag_checker) {
                showAlert("Invalid flag!");
            } else if (super_flag_checker) {
                showAlert("Congrats on finding the super flag!");
            } else {
                // popup for selection of double or nothing
                console.log("points: ", points);
                document.getElementById('points').innerHTML = points;
                showPopup(userDocRef,user_answers,invalid_sub,points);
            }
        });
    }
});

document.getElementById('logout').addEventListener('click', () => {
    signOut(auth).then(() => {
        window.sessionStorage.clear();
        localStorage.clear();
        window.location.href = "login";
        console.log("User signed out.");
    }).catch((error) => {
        console.error(error);
        showAlert(error);
        console.log('Try again, sign-out failed.');
    });
});

String.prototype.hashCode = function() {
    var hash = 0,
      i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr = this.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0;
    }
    return hash;
}

function checkAdminCookies(flag) {
    if(flag == "FLAG{E34185}") {
        let cookies = document.cookie.split("; ");
        console.log(cookies);
        for (let cookie of cookies) {
            console.log(cookie);
            let [name, value] = cookie.split("=");
            console.log(value);
            if (value && (value.toLowerCase() === 'admin')) {
                return true;
            }
        }
        return false;
    }
    return true;
}

async function handleInvalidSub() {
    const user_id = localStorage.getItem('loggedInUser');
    const userDocRef = doc(database, "users", user_id);
    const user_data = await getDoc(userDocRef);
    let invalid_sub = (user_data.data().incorrect_answers || 0) + 1;
    await updateDoc(userDocRef, {
        incorrect_answers: invalid_sub
    });
    console.log("Invalid submission handled. Incorrect answers: ", invalid_sub);
}

function hidePopup() {
    let popup = document.getElementById('popup');
    popup.classList.add('hidden');
}

function showCoin() {
    let coin = document.getElementById('coinbox');
    coin.classList.remove('hidden');
}

function hideCoin() {
    let coin = document.getElementById('coinbox');
    coin.classList.add('hidden');
}

async function showPopup(userDocRef, user_answers, invalid_sub, points) {
    let popup = document.getElementById('popup');
    popup.classList.remove('hidden');
    const keep = document.getElementById('keep-btn');
    keep.onclick = function() {
        console.log('Keep');
        updateDoc(userDocRef, {
            answers: user_answers,
            points: increment(points),
            incorrect_answers: invalid_sub // Update with the correct value
        }).then(() => {
            console.log('new flag');
        }).catch((error) => {
            console.error(error);
        });
        showAlert("You didn't take any risks and kept your points.");
        hidePopup();
    };
    const risk = document.getElementById('toss-btn');
    risk.onclick = async function() {
        console.log('Risk');
        hidePopup();
        let coin = document.getElementById('coin');
        showCoin();
        let result = await coinToss(coin);
        let visibleCoin = document.getElementById('front-side');
        if (result) {
            visibleCoin.innerHTML = 'head$';
            visibleCoin.classList.add('heads');
            points *= 2;
            await updateDoc(userDocRef, {
                answers: user_answers,
                points: increment(points),
                incorrect_answers: invalid_sub // Update with the correct value
            }).then(() => {
                console.log('new flag');
            }).catch((error) => {
                console.error(error);
            });
            showAlert(`You won 2x points! +${points}`);
        } else {
            visibleCoin.innerHTML = 'tail$';
            visibleCoin.classList.add('tails');
            points = 0;
            await updateDoc(userDocRef, {
                answers: user_answers,
                points: increment(points),
                incorrect_answers: invalid_sub // Update with the correct value
            }).then(() => {
                console.log('new flag');
            }).catch((error) => {
                console.error(error);
            });
            showAlert(`You lost all points!`);
        }
        setTimeout(() => {
            console.log("hide coin");
            hideCoin();
        }, 1500);
    };
    console.log(points);
}

function coinToss(coin) {
    coin.style.animation = 'spin 2s linear';
    return new Promise(resolve => {
        setTimeout(() => {
            let result = getRndInteger(0, 1);
            resolve(result);
        }, 2000);
    });
}

function validate_username(username){
    const valid = /^[a-zA-Z\s-]+$/;
    return valid.test(username);
}

function showAlert(message) {
    if (document.getElementById('alert') !== null) {
        document.getElementById('alert').classList.add('disappear');
    }
    let alertBox = document.createElement('div');
    alertBox.classList.add('alert-box');
    alertBox.id = "alert";
    alertBox.innerHTML = message;
    document.body.appendChild(alertBox);
    alertBox.addEventListener('animationend', function() {
        alertBox.classList.add('disappear');
    });
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function calc_points(flag, invalid_sub) {
    console.log("Flag hash: ", flag);
    const flagDocRef = doc(database, "flags", flag);
    const flagDoc = await getDoc(flagDocRef);
    console.log(flagDoc.data());

    const flagData = flagDoc.data() || {};
    const points = flagData.value || 0;
    let solves = flagData.solves || 0;

    if (points === 0) {
        if (invalid_sub < 5) {
            invalid_sub++;
        }
        return [0, invalid_sub, false, solves];
    }

    if (flag.startsWith('FLAG{S')) {
        if (solves <= 0) {
            showAlert("The super flag has already been found by 3 people :(");
            return [0, invalid_sub, false];
        } else {
            solves--;
            await updateDoc(flagDocRef, {
                solves: solves
            });
            return [points - invalid_sub, 0, true];
        }
    } else {
        solves++;
        updateDoc(flagDocRef, {
            solves: solves
        });
    }


    return [points - invalid_sub, invalid_sub, false];
}
