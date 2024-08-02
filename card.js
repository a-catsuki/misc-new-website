// function cardExpand() {
//     var element = document.getElementById("card");
//     element.classList.toggle("card-clicked");
// }

// function cardExpand() {
//     // const eventCard = document.getElementById("card")
//     const onClick = (event) => {
//         var clickId = document.getElementById(event.srcElement.id);
//         if (clickId == null || !("card" in clickId)) {
//             clickId = event.srcElement.parentNode.id;
//             console.log(clickId);
//         }
//         clickId.classList.toggle("card-clicked");
//     }
//     window.addEventListener('click', onClick);
// }

const onClick = (event) => {
    const otherClicks = document.getElementsByClassName("card");
    for (let i=0; i<otherClicks.length;i++) {
        if (otherClicks[i].classList.contains("card-clicked")) {
            otherClicks[i].classList.toggle("card-clicked");
            if (otherClicks[i].id.includes('cur')) {
                var backgroundMask = document.getElementById("current-overlay");
                backgroundMask.classList.toggle("overlay-clicked");
            } else {
                var backgroundMask = document.getElementById("past-overlay");
                backgroundMask.classList.toggle("overlay-clicked");
            }
        }
    }
    var clickElement = event.srcElement;
    function parentID() {
        var clickId = document.getElementById(clickElement.id);
        if (clickId != null && (clickId.id.includes('card'))) {
            clickId.classList.toggle("card-clicked");
            if (clickId.id.includes('cur')) {
                var backgroundMask = document.getElementById("current-overlay");
                backgroundMask.classList.toggle("overlay-clicked");
            } else {
                var backgroundMask = document.getElementById("past-overlay");
                backgroundMask.classList.toggle("overlay-clicked");
            }
        } else {
            clickElement = clickElement.parentNode;
            parentID();
        }
    }
    parentID();
}
window.addEventListener('click', onClick);
