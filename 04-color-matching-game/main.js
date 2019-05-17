const model = {
    uniqueColors: ['red', 'green', 'yellow', 'cornflowerblue', 'blue', 'purple', 'cyan', 'magenta'],
    colorBox: [],
    selectedIndex: null,
    steps: 1,
    getColorBox: () => model.colorBox,
    getselectedIndex: () => model.selectedIndex,
    getsteps: () => model.steps,
    setColorBox: () => {        
        model.colorBox = model.uniqueColors.map(item => [item, item]).flat()
        .sort(() => Math.random() - 0.5).map(item => {
            return {color: item, freeze: false}
        })
    },
    setColorFreeze: arr => {
        arr.forEach(id => model.colorBox[id].freeze = true)
    },    
    checkFreeze: () => {
        return model.colorBox.every(item => item.freeze)
    },
    setSelectedIndex: id => model.selectedIndex = id,
    incrementSteps: () => model.steps++,
}

const view = {
    board: document.querySelector('.board'),
    cards: document.querySelectorAll('.board li'),
    congratsMsg: document.querySelector('#congrats'),
    steps: document.querySelector('.steps'),
    renderTile: (target, color) => {
        target.setAttribute('style', `background-color:${color};pointer-events: none`)
    },
    freezeBoard: status => {
        status ? 
        board.style.pointerEvents = 'none' :
        board.style.pointerEvents = 'auto' 
    },
    freezeTiles: (arr) => {
        arr.forEach(el => el.style.pointerEvents = status)
    },
    resetTiles: (arr) => {
        arr.forEach(el => el.removeAttribute('style'))
    },
    updateSteps: count => {
        steps.innerHTML = steps.innerHTML.replace(/[0-9]/g, '') + count;
    },
    gameCompleted: () => {
        view.congratsMsg.removeAttribute('style');
    }
}
const controller = {
    board: document.querySelector('.board'),
    cards: document.querySelectorAll('.board li'),
    init: () => {
        controller.board.addEventListener('click', controller.triggerAction)
    },
    triggerAction: e => {
        if(e.target.tagName !== 'LI') return false;
        view.updateSteps(model.incrementSteps())

        const index = Array.from(controller.cards).indexOf(e.target);
        const previousIndex = model.getselectedIndex();
        view.renderTile(e.target, model.getColorBox()[index].color)

        if(previousIndex == null) {
            model.setSelectedIndex(index)
        }
        else {
            controller.compareTiles(previousIndex, index)
        }
    },
    compareTiles: (previousIndex, index) => {
        const colorBox = model.getColorBox()

        if(colorBox[previousIndex].color === colorBox[index].color) {
            view.freezeTiles([controller.cards[previousIndex], controller.cards[index]])
            model.setColorFreeze([previousIndex, index])
            model.setSelectedIndex(null)
            if(model.checkFreeze()) {
                view.gameCompleted()
                view.board.removeEventListener('click', view.triggerAction)
            }
        }
        else {
            view.freezeBoard(true)
            setTimeout(()=> {
                view.resetTiles([controller.cards[previousIndex], controller.cards[index]], 'auto')
                model.setSelectedIndex(null)
                view.freezeBoard(false)
            }, 600)
        }
    }
}

model.setColorBox()
controller.init()