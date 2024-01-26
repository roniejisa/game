(() => {
    const dices = document.querySelectorAll('.dice');
    const turns = document.querySelector('.turns');
    const rate = document.querySelector('.rate');

    const randomDice = (dice, timeout) => {
        const random = Math.floor(Math.random() * 6 + 1)
        rollDice(dice, random, timeout);
        return random;
    }

    const rollDice = (dice, random, timeout) => {
        dice.setAttribute('style', `--dice-deg-current:${random * Math.floor(Math.random() * 1200 + 360)}deg`)
        switch (random) {
            case 1:
                dice.style.transform = 'rotateX(0deg) rotateY(0deg)';
                break;
            case 2:
                dice.style.transform = 'rotateX(-90deg) rotateY(0deg)';
                break;
            case 3:
                dice.style.transform = 'rotateX(0deg) rotateY(90deg)';
                break;
            case 4:
                dice.style.transform = 'rotateX(0deg) rotateY(-90deg)';
                break;
            case 5:
                dice.style.transform = 'rotateX(90deg) rotateY(0deg)';
                break;
            case 6:
                dice.style.transform = 'rotateX(180deg) rotateY(0deg)';
                break;
        }
        timeAnimation = timeout + 500;
        dice.style.animation = `rolling ${timeAnimation}ms forwards`;
        dice.style.transition = `transform ${timeAnimation / 2}ms`;
    }

    const getScore = async () => {
        let number = 0;
        for await (const diceRemoveStyle of dices) {
            diceRemoveStyle.removeAttribute('style');
        }
        let timeout = 5000;
        let score = await new Promise((resolve, reject) => {
            setTimeout(() => {
                Array.from(dices).forEach(dice => {
                    number += randomDice(dice, timeout);
                })
                resolve(number);
            }, 100);
        });

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(score)
            }, timeout - 100 + 500);
        })
    }

    const startGame = async (type) => {
        let score = await getScore()
        let KQ = 'LE';
        let result = 'WIN';
        if (score % 2 === 0) {
            KQ = 'CHAN';
        }

        if (KQ !== type) {
            result = 'LOSE';
        }
        return {
            'type': type,
            'score': score,
            'result': result
        };
    }

    // Xử lý thêm thẻ turn
    function createTurnItem(data) {
        let turn = document.createElement('div');
        turn.className = 'item-turn';
        turn.classList.add(data.result);
        turn.innerHTML = `${data.result === 'WIN' ? '😍' : '😒'} ${data.type === 'CHAN' ? 'Chẵn' : 'Lẻ'}, ${data.score}`
        turns.insertBefore(turn, turns.firstChild);
    }

    function calculatorRate(histories){
        totalWin = histories.filter(history => history.result === 'WIN');
        rate.innerHTML = ((histories.length == 0 || totalWin.length == 0) ? 0 : Math.floor(totalWin.length/histories.length * 100))+'%';
    }

    window.addEventListener('DOMContentLoaded', function () {
        let SESSION_KEY = 'KEY_DICE_PLAYER';
        let buttonPlays = document.querySelectorAll('.button-play');
        let histories = sessionStorage.getItem(SESSION_KEY);
        histories = histories != null ? JSON.parse(histories) : [];

        histories.forEach(data => {
            createTurnItem(data);
        });
        calculatorRate(histories);
        Array.from(buttonPlays).forEach(button => {
            button.onclick = async () => {
                Array.from(buttonPlays).forEach(button => button.setAttribute('disabled', ''))
                const data = await startGame(button.classList.contains('odd') ? 'LE' : 'CHAN');
                Array.from(buttonPlays).forEach(button => button.removeAttribute('disabled'))
                // Push lên vị trí đầu tiên cho dễ nhìn
                histories.unshift(data)
                calculatorRate(histories)
                createTurnItem(data);
                sessionStorage.setItem(SESSION_KEY, JSON.stringify(histories))
            }
        })
    })
})()