function rectCollisiuon({ rectangel1, rectangel2, }) {
    return (
        rectangel1.attackBox.position.x + rectangel1.attackBox.width >=
        rectangel2.position.x && rectangel1.attackBox.position.x <= rectangel2.position.x + rectangel2.width &&
        rectangel1.attackBox.position.y + rectangel1.attackBox.height >= rectangel2.position.y &&
        rectangel1.attackBox.position.y <= rectangel2.position.y + rectangel2.height)
}


function determineWinner({ player, enemy, timerId }) {
    clearTimeout(timerId)
    document.querySelector('#displText').style.display = 'flex'
    if (player.healt === enemy.healt) {
        document.querySelector('#displText').innerHTML = 'TIME'

    } else if (player.healt > enemy.healt) {
        document.querySelector('#displText').innerHTML = 'Player 1 wins'

    } else if (player.healt < enemy.healt) {
        document.querySelector('#displText').innerHTML = 'Player 2 wins'

    }
}

let taimer = 60;
let timerId

function secTaimer() {
    if (taimer > 0) {
        timerId = setTimeout(secTaimer, 1000);
        taimer--;
        document.querySelector('#taimer').innerHTML = taimer
    }
    if (taimer === 0) {

        determineWinner({ player, enemy, timerId })
    }
}