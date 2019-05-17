//Color matching game
const model = {
    uniqueColors: ['red', 'green', 'yellow', 'cornflowerblue', 'blue', 'purple', 'cyan', 'magenta'],
    colorBox: [],
    selectedIndex: null,
    steps: 1,
}

const view = {
    board: document.querySelector('.board'),
    cards: document.querySelectorAll('.board li'),
    congratsMsg: document.querySelector('#congrats'),
    steps: document.querySelector('.steps'),
    incrementSteps: () => {
        steps.innerHTML = steps.innerHTML.replace(/[0-9]/g, '') + model.steps++;
    },
    triggerAction: e => {
        if(e.target.tagName !== 'LI') return false;

        view.incrementSteps()
        const index = Array.from(view.cards).indexOf(e.target)
        e.target.setAttribute('style', `background-color:${model.colorBox[index].color};pointer-events: none`)
        if(model.selectedIndex == null) {
            model.selectedIndex = index
        }
        else {
            if(model.colorBox[index].color === model.colorBox[model.selectedIndex].color) {
                view.cards[index].style.pointerEvents = 'none';
                view.cards[model.selectedIndex].style.pointerEvents = 'none';
                model.colorBox[model.selectedIndex].freeze = true;
                model.colorBox[index].freeze = true;
                model.selectedIndex = null
                if(controller.checkFreeze()) {
                    view.gameCompleted()
                }
            }
            else {
                view.board.style.pointerEvents = 'none';
                setTimeout(() => {
                    view.cards[index].removeAttribute('style');
                    view.cards[model.selectedIndex].removeAttribute('style');
                    view.board.removeAttribute('style');
                    model.selectedIndex = null
                }, 600)
            }
        }
    },
    gameCompleted: () => {
        view.congratsMsg.removeAttribute('style');
        view.board.removeEventListener('click', view.triggerAction)
    }
}

const controller = {
    shuffle: arr => {
        return arr.map(item => [item, item]).flat()
        .sort(() => Math.random() - 0.5).map(item => {
            return {color: item, freeze: false}
        })
    },
    checkFreeze: () => {
        return model.colorBox.every(item => item.freeze)
    },
    init: () => {
        model.colorBox = controller.shuffle(model.uniqueColors);
        view.board.addEventListener('click', view.triggerAction)
    }
}

controller.init()