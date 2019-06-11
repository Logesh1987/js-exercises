const model ={
  triangleArray: [],
  spacesArray: [],
  getTriangleArray: _ => model.triangleArray,
  updateTriangleArray: arr => model.triangleArray.push(arr),
  getSpacesArray: _ => model.spacesArray,
  updateSpacesArray: val => model.spacesArray = val,
  resetAll: _ => {
    model.triangleArray = []
    model.spacesArray = []
  }
}
const controller = {
  init: _ => {
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
  sumArray: arr => {
    model.updateTriangleArray(arr)
    const tempArr = []
    if(arr.length == 1) {
      controller.createSpaces(model.getTriangleArray())
      view.renderTriangle(model.getTriangleArray(), model.getSpacesArray())
      model.resetAll();
      return false
    }
    for(let i=0; i < arr.length - 1; i++) {
      tempArr.push(parseInt(arr[i]) + parseInt(arr[i+1]))
    }
    controller.sumArray(tempArr)
  },
  createSpaces : arr => {
    let temp = []
    let prev = 0
    for(let i = (arr.length - 1); i >= 0; i--) {
      let totalChar = arr[i].toString().replace( /,/g, "" ).length;
      temp.push(Math.ceil((totalChar + prev) / arr[i].length))
      prev = totalChar + prev;
    }
    temp.unshift(0)
    temp.pop()
    temp.reverse()
    model.updateSpacesArray(temp)
  }
}
const view = {
  output: document.querySelector('.output'),
  renderTriangle: (arr, spaces) => {
    view.output.innerHTML = '';
    arr.forEach((arr, index) => {
      setTimeout(_ => {
        let a = document.createElement('div');
        a.classList.add(`row_${index}`);
        view.output.insertBefore(a, document.querySelector(`.row_${index - 1}`))
        let nbsp = new Array(spaces[index] + 1).join('&nbsp;')
        for(let i = 0; i < arr.length; i++) {
          let b = document.createElement('span')
          if((i+1) !== arr.length) {
            b.innerHTML = arr[i] + nbsp;
          }
          else {
            b.innerHTML = arr[i];
          }
          document.querySelector(`.row_${index}`).append(b)
        }
      }, 1000* index)
    })
  }
}
controller.init()
