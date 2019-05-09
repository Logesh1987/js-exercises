const model = {
  pocketSize: pocket.querySelectorAll('li').length,
  A: {},
  B: {},
  C: {}
}

const view = {
  classifiedColumn: document.querySelectorAll('.classifiedColumn'),
  pocket: document.querySelector('#pocket'),
  render: value => {
    const index = value[0].charCodeAt() - 65;
    const targetColumn = view.classifiedColumn[index];
    const targetObj = model[value[0]];

    if(targetColumn.querySelectorAll('li:not(:first-child').length) {
      const referenceElement = targetColumn.querySelectorAll('li:not(:first-child)')[Object.keys(targetObj).indexOf(value)]
      targetColumn.insertBefore(targetObj[value], referenceElement)
    }
    else {
      targetColumn.append(targetObj[Object.keys(targetObj)[0]])
    }
  },
  removeElement: target => {
    target.remove()
  },
  removePocket: () => {
    this.pocket.remove()
  }
}

const controller = {
  pushData: function(target) {
    const columnName = target.innerHTML[0];
    model[columnName][target.innerHTML] = target;
    model.pocketSize--;
    view.removeElement(target);
    if(model.pocketSize <= 0) view.removePocket();
    this.sortData(columnName)
    view.render(target.innerHTML);
  },
  sortData: columnName => {
    const newObj = {};
    Object.keys(model[columnName]).sort().forEach(key => newObj[key] = model[columnName][key])
    model[columnName] = newObj;
  }
}

pocket.addEventListener('click', event => {
  if(event.target.tagName === 'LI') controller.pushData(event.target)
})

