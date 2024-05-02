const Direction = {
    RIGHT: [1, 0],
    LEFT: [-1, 0],
    TOP: [0, -1],
    DOWN: [0, 1]
}

class Snake {
    constructor(size = 4, x = 0, y = 0) {
        this.snake = []
        this.size = 0

        // Adding the head
        this.add(true)
        this.snake[0].move(x, y)
        
        // Adding the body
        for (let i = 0; i < size - 1; i++) {
            this.add()
            this.move(Direction.RIGHT)
        }
    }

    add(isHead = false) {
        const block = new SnakeBlock()

        if (!isHead) {
            block.move(this.snake[this.size - 1].x, this.snake[this.size - 1].y)
        }

        this.snake.push(block)
        this.size += 1
    }

    move(direction) {
        // New head pos
        let posx = this.snake[0].x + direction[0]
        let posy = this.snake[0].y + direction[1]

        for (const block of this.snake) {
            // Save current pos
            const oldx = block.x
            const oldy = block.y

            // Update with new pos
            block.move(posx, posy)

            // Update current pos for the next block
            posx = oldx
            posy = oldy
        }
    }

    getPos() {
        // The snake pos is the head pos
        return this.snake[0].getPos()
    }

    hasBlock(pos, skipHead = false) {
        for (const block of this.snake) {
            if (skipHead) {
                skipHead = false
                continue
            }

            if (block.getPos()[0] === pos[0] && block.getPos()[1] === pos[1]) {
                return true
            }
        }

        return false
    }

    draw(ctx) {
        for (const block of this.snake) {
            block.draw(ctx)
        }
    }
}

class SnakeBlock {
    constructor() {
        this.x = 0
        this.y = 0
    }

    move(x, y) {
        this.x = x
        this.y = y
    }

    getPos() {
        return [this.x, this.y]
    }

    draw(ctx) {
        Utils.drawBlock(ctx, this.x, this.y)
    }
}
