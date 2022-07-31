const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
// розмір вікна
canvas.width = 1024
canvas.height = 576
    // початкова позиція на екрані
c.fillRect(0, 0, canvas.width, canvas.height);
const gravity = 0.7

// класс
class Sprite {
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
        if (this.position.y + this.height + this.velociti.y >= canvas.height) {
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
// початкова позиція
const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velociti: {
        x: 0,
        y: 10
    },
    offset: {
        x: 0,
        y: 0
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
    color: 'blue',
    offset: {
        x: -50,
        y: 0
    }

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
    },

}

let lastKey

function rectCollisiuon({ rectangel1, rectangel2, }) {
    return (
        rectangel1.attackBox.position.x + rectangel1.attackBox.width >=
        rectangel2.position.x && rectangel1.attackBox.position.x <= rectangel2.position.x + rectangel2.width &&
        rectangel1.attackBox.position.y + rectangel1.attackBox.height >= rectangel2.position.y &&
        rectangel1.attackBox.position.y <= rectangel2.position.y + rectangel2.height)
}

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

    // атакa
    if (rectCollisiuon({
            rectangel1: player,
            rectangel2: enemy
        }) && player.isAttacking) {
        player.isAttacking = false
        enemy.healt -= 20
        document.querySelector('#enemyH').style.width = enemy.healt + '%'

        console.log('player attack');


    }
    if (rectCollisiuon({
            rectangel1: enemy,
            rectangel2: player
        }) && enemy.isAttacking) {
        player.healt -= 20
        document.querySelector('#playerH').style.width = player.healt + '%'

        enemy.isAttacking = false
        console.log('enemy attack');


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
        case ' ':
            player.attack()
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
        case 'ArrowDown':
            enemy.isAttacking = true
            lastKey = 'ArrowDown'
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