const block_size = 20

class Game {
    constructor() {
        this.width = 20
        this.height = 20

        this.canvas = document.getElementById('screen')
        this.ctx = this.canvas.getContext('2d')
    
        this.canvas.width = this.width * block_size
        this.canvas.height = this.height * block_size

        this.initial_size = 6
        this.direction = Direction.RIGHT
        this.points = 0

        this.can_change_dir = true
    }

    init() {
        // Create initial snake
        this.snake = new Snake(this.initial_size, parseInt(this.width / 2), parseInt(this.height / 2))

        this.run()
    }

    run() {
        this.clear_screen()
        this.clear_flags()

        this.snake.move(this.direction)

        this.check_status()
    
        this.snake.draw(this.ctx)
        this.food.draw(this.ctx)
    }

    game_over() {
        console.log('Game Over!!!')
        document.getElementById('game_over').style = 'display: block'
        this.stop()
    }

    stop() {
        clearInterval(interval_code)
    }

    check_status() {
        // Check off border status
        const pos = this.snake.getPos()
        if (pos[0] < 0 || pos[0] >= this.width) {
            this.game_over()
            return false
        }
        if (pos[1] < 0 || pos[1] >= this.height) {
            this.game_over()
            return false
        }

        // Check auto-collision
        const hasCollision = this.snake.hasBlock(this.snake.getPos(), true)
        if (hasCollision) {
            this.game_over()
            return false
        }

        // Check food collision
        if (!this.food) {
            this.food = new Food(this.width, this.height, this.snake)
        }
        if (this.food.getPos()[0] === this.snake.getPos()[0] && this.food.getPos()[1] === this.snake.getPos()[1]) {
            this.snake.add()
            this.food = new Food(this.width, this.height, this.snake)
            this.points += 10
        }

        document.getElementById('points').innerHTML = 'Pontuação: ' + this.points

        return true
    }

    change_dir(direction) {
        // Ignore multiple movements at the same turn
        if (!this.can_change_dir) {
            return
        }

        // IFs to ignore 'impossible' movements
        if (direction === this.direction) {
            return
        }
        if (direction === Direction.RIGHT && this.direction === Direction.LEFT) {
            return
        }
        if (direction === Direction.LEFT && this.direction === Direction.RIGHT) {
            return
        }
        if (direction === Direction.TOP && this.direction === Direction.DOWN) {
            return
        }
        if (direction === Direction.DOWN && this.direction === Direction.TOP) {
            return
        }

        this.direction = direction
        this.can_change_dir = false
    }

    clear_screen() {
        Utils.clearScreen(this.ctx, this.width, this.height)
    }

    clear_flags() {
        this.can_change_dir = true
    }
}
