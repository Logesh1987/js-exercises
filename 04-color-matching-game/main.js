//Color matching game
const model = {
    colors: ['red', 'green', 'yellow', 'orange', 'blue', 'purple', 'cyan', 'magenta'],
    selectedColors: [],
    selectedCards: [],
    steps: 1
}

const controller = {
    incrementSteps: () => view.renderSteps(model.steps++),
    multiplyArray: arr => arr.map(item => [item, item]).reduce((a, b) => a.concat(b)),
    shuffleArray: arr => arr.sort(() => Math.random() - 0.5),
    compareSelected: () => {
        return model.selectedCards.reduce((acc, cv) => {
            return acc.getAttribute('data-color') === cv.getAttribute('data-color');
        })
    },
    checkComplete: () => {
        if(model.selectedColors.length == model.colors.length)
            view.gameCompleted()
    },
    init: function() {
        let array = this.multiplyArray(model.colors);
        array = this.shuffleArray(array);
        view.load(array);
    }
}

const view = {
    steps: document.querySelector('.steps'),
    board: document.querySelector('.board'),
    cards: document.querySelectorAll('.board li'),
    congratsMsg: document.querySelector('#congrats'),
    load: arr => {
        arr.forEach((color, index) => {
            view.cards[index].setAttribute('data-color', color)
        })
        view.board.addEventListener('click', view.triggerAction)
    },
    triggerAction: e => {
        const target = e.target;
        if(target.tagName == 'LI') {
            controller.incrementSteps()
            const color = target.getAttribute('data-color');
            target.style.pointerEvents = 'none';
            target.style.backgroundColor = color;
            model.selectedCards.push(target)
            if(model.selectedCards.length === 2) {
                view.compareCards()
            }
        }        
    },
    compareCards: () => {
        const { selectedCards, selectedColors } = model;
        if(controller.compareSelected()) {
            selectedCards.forEach(card => card.style.pointerEvents = 'none');
            selectedColors.push(selectedCards[0].getAttribute('data-color'));
            model.selectedCards = []
            controller.checkComplete();
        } else {
            setTimeout(() => {
                selectedCards.forEach(card => card.removeAttribute('style'))
                model.selectedCards = []
            }, 500)
        }
    },
    renderSteps: count => {
        steps.innerHTML = steps.innerHTML.replace(/[0-9]/g, '') + count;
    },
    gameCompleted: () => {
        view.congratsMsg.removeAttribute('style');
        view.board.removeEventListener('click', view.triggerAction)
    }
}

controller.init()