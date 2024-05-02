let interval_code = 0

window.addEventListener('load', () => {
    // Initializing game object
    const game = new Game()
    game.init()

    // Keyboard key listener
    window.addEventListener('keydown', e => {
        switch (e.key) {
            case 'ArrowRight':
                game.change_dir(Direction.RIGHT)
                break;
            case 'ArrowLeft':
                game.change_dir(Direction.LEFT)
                break;
            case 'ArrowUp':
                game.change_dir(Direction.TOP)
                break;
            case 'ArrowDown':
                game.change_dir(Direction.DOWN)
                break;
            case 'Escape':
                game.stop()
                break;
        }
    })

    // Gameloop
    interval_code = setInterval(() => {
        game.run()
    }, 250)
})

