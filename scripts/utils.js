class Utils {
    static drawBlock(ctx, x, y, style = Color.BLACK) {
        ctx.fillStyle = style
        ctx.fillRect(x * block_size + 1, y * block_size + 1, block_size - 1, block_size - 1)
    }

    static clearScreen(ctx, width, height) {
        ctx.fillStyle = Color.WHITE
        ctx.fillRect(0, 0, width * block_size, height * block_size)
    }
}

const Color = {
    BLACK: 'rgb(0 0 0)',
    WHITE: 'rgb(255 255 255)',
    RED: 'rgb(200 0 0)'
}
