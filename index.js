const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
// розмір вікна
canvas.width = 1024
canvas.height = 576
    // початкова позиція на екрані
c.fillRect(0, 0, canvas.width, canvas.height);
const gravity = 0.7

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/background.png'
})

const shop = new Sprite({
        position: {
            x: 680,
            y: 240
        },
        imageSrc: './img/shop.png',
        scale: 1.9,
        frameMax: 6,
    })
    // початкова позиція
const player = new Fighter({
    run: {
        idle: {
            imageSrc: './img/player1/Idle.png',
            frameMax: 6,
        },
        runn: {
            imageSrc: './img/player1/Run.png',
            frameMax: 8,
        },
        jump: {
            imageSrc: './img/player1/Jump.png',
            frameMax: 2,
        },
        fall: {
            imageSrc: './img/player1/Fall.png',
            frameMax: 2,
        },
        attack: {
            imageSrc: './img/player1/Attack_1.png',
            frameMax: 6,
        },
        hit: {
            imageSrc: './img/player1/Hit.png',
            frameMax: 4,
        },
        death: {
            imageSrc: './img/player1/Death.png',
            frameMax: 11,
        },

    },
    attackBox: {
        offset: {
            x: 0,
            y: 0
        },
        width: 100,
        height: 50
    },
    imageSrc: './img/player1/Idle.png',
    frameMax: 8,
    scale: 1.3,
    offset: {
        x: 285,
        y: 150
    },
    position: {
        x: 50,
        y: 0
    },
    velociti: {
        x: 0,
        y: 10
    },
    offset: {
        x: 0,
        y: 0
    },

});
console.log(player.imageSrc);
player.draw();
// початкова позиція
const enemy = new Fighter({
    position: {
        x: 400,
        y: 150
    },
    velociti: {
        x: 0,
        y: 0
    },
    color: 'blue',
    offset: {
        x: -50,
        y: 45
    },
    imageSrc: './img/Sprites/Idle.png',
    frameMax: 10,
    scale: 2.3,
    run: {
        idle: {
            imageSrc: './img/Sprites/Idle.png',
            frameMax: 10,
        },
        runn: {
            imageSrc: './img/Sprites/Run.png',
            frameMax: 6,
        },
        jump: {
            imageSrc: './img/Sprites/Jump.png',
            frameMax: 2,
        },
        fall: {
            imageSrc: './img/Sprites/Fall.png',
            frameMax: 2,
        },
        attack: {
            imageSrc: './img/Sprites/Attack2.png',
            frameMax: 4,
        },
        hit: {
            imageSrc: './img/Sprites/Get Hit.png',
            frameMax: 3,
        },
        death: {
            imageSrc: './img/Sprites/Death.png',
            frameMax: 9,
        },
    },
    attackBox: {
        offset: {
            x: 150,
            y: 0
        },
        width: 100,
        height: 50
    }

});
console.log(player.imageSrc);
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
secTaimer();


function animate() {
    // указує бравзеру що потрібно зробити
    // анімацію і просить його запланіровати перерісовку анімації
    window.requestAnimationFrame(animate);

    c.clearRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    player.update()
    enemy.update()

    player.velociti.x = 0
    enemy.velociti.x = 0
        //  player рухи
    player.switchSprite('idle')
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velociti.x = -5
        player.switchSprite('runn')
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.switchSprite('runn')
        player.velociti.x = 5
    } else {
        player.switchSprite('idle')
    }

    //прижок player

    if (player.velociti.y < 0) {
        player.switchSprite('jump')
    } else if (player.velociti.y > 0) {
        player.switchSprite('fall')
    }


    //enemy рухи
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velociti.x = -5
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velociti.x = 5
        enemy.switchSprite('runn')
    } else {
        enemy.switchSprite('idle')
    }

    //прижок enemy

    if (enemy.velociti.y < 0) {
        enemy.switchSprite('jump')
    } else if (enemy.velociti.y > 0) {
        enemy.switchSprite('fall')
    }


    // атакa
    if (rectCollisiuon({
            rectangel1: player,
            rectangel2: enemy
        }) && player.isAttacking) {
        player.isAttacking = false
        enemy.takeHIT()
        document.querySelector('#enemyH').style.width = enemy.healt + '%'
        console.log('player attack');
    }
    if (rectCollisiuon({
            rectangel1: enemy,
            rectangel2: player
        }) && enemy.isAttacking) {
        player.takeHIT()
        document.querySelector('#playerH').style.width = player.healt + '%'
        enemy.isAttacking = false
        console.log('enemy attack');
    }
    //якщо ігрок атакує мимо отменяєм атаку
    if (player.isAttacking && player.framesCurent === 6) {
        player.isAttacking = false

    }
    //enemy
    if (enemy.isAttacking && enemy.framesCurent === 4) {
        enemy.isAttacking = false

    }

    // якшо нема хп
    if (enemy.healt <= 0 || player.healt <= 0) {
        determineWinner({ player, enemy, timerId })
    }

}
animate();

window.addEventListener('keydown', (event) => {
    if (!player.dead) {
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
        }
    }
    console.log(player);
    if (!enemy.dead) {

        //second player
        switch (event.key) {
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
                enemy.attack()
                lastKey = 'ArrowDown'
                break
        }
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