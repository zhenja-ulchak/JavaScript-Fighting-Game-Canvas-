const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576
    // початкова позиція на екрані
c.fillRect(0, 0, canvas.width, canvas.height);
const gravity = 0.7

// класс
class Sprite {
    // конструктор 
    constructor({ position, velociti, color = 'red' }) {
            this.position = position
            this.velociti = velociti
            this.height = 150
            this.lastKey
            this.attackBox = {
                position: this.position,
                width: 100,
                height: 50,
            }
            this.color = color
        }
        // початкова позиція 2 обєкта
    draw() {
            c.fillStyle = this.color
            c.fillRect(this.position.x, this.position.y, 50, this.height);
            //atackbox атака
            c.fillStyle = 'green'
            c.fillRect(
                this.attackBox.position.x,
                this.attackBox.position.y,
                this.attackBox.width,
                this.attackBox.height
            );
        }
        // обновлення позиції на 10 рх
    update() {
        this.draw()
        this.position.y += this.velociti.y

        this.position.x += this.velociti.x

        // якшо висота обща більша чи рівна висоті окна канваса то 
        if (this.position.y + this.height + this.velociti.y >= canvas.height) {
            // ми її обнуляєм
            this.velociti.y = 0
        } else this.velociti.y += gravity
    }

}
// початкова позиція
const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velociti: {
        x: 0,
        y: 10
    }

});
player.draw();
// початкова позиція
const enemy = new Sprite({
    position: {
        x: 400,
        y: 100
    },
    velociti: {
        x: 0,
        y: 0
    },
    color: 'blue'

});

enemy.draw();

console.log(player);

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    }
}

let lastKey

function animate() {
    // указує бравзеру що потрібно зробити
    // анімацію і просить його запланіровати перерісовку анімації
    window.requestAnimationFrame(animate);

    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()
    player.velociti.x = 0
    enemy.velociti.x = 0
        //  player рухи
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velociti.x = -5
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velociti.x = 5
    }
    //enemy рухи
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velociti.x = -5
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velociti.x = 5
    }

    //візуалізація атаки
    if (player.attackBox.position.x + player.attackBox.width >= enemy.position.x) {

    }



}
animate();

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'w':
            player.velociti.y = -20
            player.lastKey = 'w'
            break

            //second player

        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            enemy.velociti.y = -20
            lastKey = 'ArrowUp'
            break
    }
    console.log(event);
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
    }

    //second player

    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
    }
    console.log(event);
})










//