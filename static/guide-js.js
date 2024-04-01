document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        console.log('Space pressed')
        document.getElementById('overlay-warning').classList.add('hidden')
        document.getElementById('coming-soon').classList.remove('hidden')
        document.body.classList.add('space-clicked')
    }
})