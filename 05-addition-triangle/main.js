const model ={
  triangleArray: [],
  getTriangleArray: () => model.triangleArray,
  updateTriangleArray: (arr) => model.triangleArray.push(arr),
  resetTriangle: () => model.triangleArray = []
}

const controller = {
  init: () => {
    document.querySelector('.input').addEventListener('submit', controller.arrayFrominput)
  },
  arrayFrominput: (e) => {
    e.preventDefault()
    let baseArray = new FormData(e.target).get('ip').trim().split(' ').map(val => parseInt(val));
    controller.sumArray(baseArray)
    e.target.reset()
  },
  sumArray: (arr) => {
    model.updateTriangleArray(arr)
    const tempArr = []

    if(arr.length == 1) {
      view.renderTriangle(model.getTriangleArray())
      model.resetTriangle();
      return false
    }

    for(let i=0; i < arr.length - 1; i++) {
      tempArr.push(parseInt(arr[i]) + parseInt(arr[i+1]))
    }
    controller.sumArray(tempArr)
  }
}
const view = {
  output: document.querySelector('.output'),
  renderTriangle: (arr) => {
    view.output.innerHTML = '';
    let highestInt = arr.flat().pop().toString().length;
    let nbsp = new Array(highestInt + 1).join('&nbsp;')
    arr.forEach((arr, index) => {
      setTimeout(() => {
        let a = document.createElement('div');
        a.classList.add(`row_${index}`);
        view.output.insertBefore(a, document.querySelector(`.row_${index - 1}`))
        arr.forEach((item, i) => {
          let b = document.createElement('span')
          b.innerHTML = item + nbsp;
          document.querySelector(`.row_${index}`).append(b)
        })
      }, 1000* index)
    })
  }
}

controller.init()
