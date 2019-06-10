const model ={
  triangleArray: [],
  spacesArray: [],
  getTriangleArray: () => model.triangleArray,
  updateTriangleArray: (arr) => model.triangleArray.push(arr),
  getSpacesArray: () => model.spacesArray,
  updateSpacesArray: (val) => model.spacesArray.push(val),
  resetTriangle: () => model.triangleArray = []
}

const controller = {
  init: () => {
    document.querySelector('.input').addEventListener('submit', controller.arrayFrominput)
  },
  arrayFrominput: (e) => {
    e.preventDefault()
    let baseArray = []
    new FormData(e.target).get('ip').trim().split(' ').forEach(val => {
      if(!isNaN(parseInt(val))) {
        baseArray.push(parseInt(val))
      }
    });
    controller.sumArray(baseArray)
    e.target.reset()
  },
  sumArray: (arr) => {
    model.updateTriangleArray(arr)
    const tempArr = []

    if(arr.length == 1) {
      controller.createSpaces(model.getTriangleArray())
      view.renderTriangle(model.getTriangleArray(), model.getSpacesArray())
      model.resetTriangle();
      return false
    }

    for(let i=0; i < arr.length - 1; i++) {
      tempArr.push(parseInt(arr[i]) + parseInt(arr[i+1]))
    }
    controller.sumArray(tempArr)
  },
  createSpaces : (arr) => {
    let temp = []
    let spaces = 0;
    for(let i = (arr.length - 1); i >= 0; i--) {
      let totalChar = arr[i].reduce((acc, cv) => cv.toString().length + acc, 0)
      if(spaces) {
        temp.push(Math.ceil(spaces / (arr[i].length -1)))
      }
      spaces = totalChar + spaces
    }
    console.log(temp, 'ppp');
    temp = temp.reduce((acc, cv) => {
      console.log(acc, cv);
    })
  }
}
const view = {
  output: document.querySelector('.output'),
  renderTriangle: (arr, spaces) => {
    view.output.innerHTML = '';
    let highestInt = arr.flat().pop().toString().length;
    let nbsp = new Array(highestInt + 1).join('&nbsp;')
    arr.forEach((arr, index) => {
      setTimeout(() => {
        let a = document.createElement('div');
        a.classList.add(`row_${index}`);
        view.output.insertBefore(a, document.querySelector(`.row_${index - 1}`))
        // console.log(spaces[index]);
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
