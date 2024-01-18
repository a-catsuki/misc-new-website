const onClick = (event) => {
    const otherClicks = document.getElementsByClassName("event-img");
    for (let i=0; i<otherClicks.length;i++) {
        if (otherClicks[i].classList.contains("img-clicked")) {
            otherClicks[i].classList.toggle("img-clicked");
            var backgroundMask = document.getElementById("overlay");
            backgroundMask.classList.toggle("overlay-clicked");
        }
    }
    var clickElement = event.srcElement;
    function parentID() {
        var clickId = document.getElementById(clickElement.id);
        if (clickId != null && (clickId.id.includes('img'))) {
            clickElement.parentNode.setAttribute('data-aos','none')
            clickId.classList.toggle("img-clicked");
            var backgroundMask = document.getElementById("overlay");
            backgroundMask.classList.toggle("overlay-clicked");
        } else {
            clickElement = clickElement.parentNode;
            parentID();
        }
    }
    parentID();
}
window.addEventListener('click', onClick);