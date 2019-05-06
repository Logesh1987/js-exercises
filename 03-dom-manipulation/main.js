const model = {
  pocketSize: pocket.querySelectorAll('li').length,
  A: [],
  B: [],
  C: []
}

const view = {
  classifiedColumn: document.querySelectorAll('.classifiedColumn'),
  pocket: document.querySelector('#pocket'),
  render: column => {
    const index = column.charCodeAt() - 65;
    const targetColumn = view.classifiedColumn[index];
    targetColumn.querySelectorAll('li:not(:first-child').forEach(el => el.remove())
    model[column].forEach(element => {
      let li = document.createElement('li')
      li.appendChild(document.createTextNode(element))
      targetColumn.append(li)
    });
  },
  removeElement: target => {
    target.remove()
    if(model.pocketSize <= 0) this.pocket.remove()
  }
}

const controller = {
  pushData: function(target) {
    const data = target.innerHTML;
    model[data[0]].push(data)
    model.pocketSize--;
    view.removeElement(target);
    this.sortData(data[0])
  },
  sortData: column => {
    model[column] = model[column].sort();
    view.render(column);
  }
}

pocket.addEventListener('click', event => {
  if(event.target.tagName === 'LI') controller.pushData(event.target)
})

