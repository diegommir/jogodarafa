class Food {
    constructor(width, height, snake) {
        this.width = width
        this.height = height
        this.snake = snake

        const pos = this._getPosIni()
        this.x = pos[0]
        this.y = pos[1]
    }

    getPos() {
        return [this.x, this.y]
    }

    draw(ctx) {
        Utils.drawBlock(ctx, this.x, this.y, Color.RED)
    }

    _getPosIni() {
        while(true) {
            const randx = Math.floor(Math.random() * this.width)
            const randy = Math.floor(Math.random() * this.height)

            const hasCollision = this.snake.hasBlock([randx, randy])
            if (!hasCollision) {
                return [randx, randy]
            }
        }
    }
}
