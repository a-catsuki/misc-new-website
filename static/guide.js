document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        console.log('Space pressed')
        document.getElementById('overlay-warning').style.display = "none";
        document.body.classList.add('space-clicked')
    }
})