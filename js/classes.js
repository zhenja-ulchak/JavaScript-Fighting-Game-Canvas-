// класс
class Sprite {
    // конструктор 
    constructor({ position, imageSrc, scale = 1, frameMax = 1 }) {
            this.position = position
            this.height = 150
            this.width = 50
            this.image = new Image()
            this.image.src = imageSrc
            this.scale = scale
            this.frameMax = frameMax
            this.framesCurent = 0
            this.framesEleps = 0
            this.framesHOl = 10
        }
        // початкова позиція 2 обєкта
    draw() {
            c.drawImage(
                this.image,
                this.framesCurent * (this.image.width / this.frameMax),
                0,
                this.image.width / this.frameMax,
                this.image.height,
                this.position.x,
                this.position.y,
                (this.image.width / this.frameMax) * this.scale,
                this.image.height * this.scale
            );
        }
        // обновлення позиції 
    update() {
        this.draw()
        this.framesEleps++
            if (this.framesEleps % this.framesHOl === 0) {
                if (this.framesCurent < this.frameMax - 1) {
                    this.framesCurent++
                } else {
                    this.framesCurent = 0
                }
            }
    }

}

// класс
class Fighter {
    // конструктор 
    constructor({ position, velociti, color = 'red', offset }) {
            this.position = position
            this.velociti = velociti
            this.height = 150
            this.lastKey
            this.width = 50
            this.isAttacking
            this.attackBox = {
                position: {
                    x: this.position.x,
                    y: this.position.y
                },
                offset,
                width: 100,
                height: 50,
            }
            this.color = color
            this.healt = 100
        }
        // початкова позиція 2 обєкта
    draw() {
            c.fillStyle = this.color
            c.fillRect(this.position.x, this.position.y, this.width, this.height);
            //atackbox атака
            if (this.isAttacking) {
                c.fillStyle = 'green'
                c.fillRect(
                    this.attackBox.position.x,
                    this.attackBox.position.y,
                    this.attackBox.width,
                    this.attackBox.height
                );
            }
        }
        // обновлення позиції 
    update() {
        this.draw()

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

        this.position.y += this.velociti.y
        this.position.x += this.velociti.x

        // якшо висота обща більша чи рівна висоті окна канваса то 
        if (this.position.y + this.height + this.velociti.y >= canvas.height - 95) {
            // ми її обнуляєм
            this.velociti.y = 0
        } else this.velociti.y += gravity
    }
    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100);
    }

}