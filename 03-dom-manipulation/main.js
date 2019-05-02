const classifiedColumn = document.querySelectorAll('.classifiedColumn');
const pocket = document.querySelector('#pocket');
const model = {
  pocketSize: pocket.querySelectorAll('li').length
}
const view = {
  sortElem: list => {
    Array.from(list.querySelectorAll('li:not(:first-child)'))
    .sort((a, b) => a.innerHTML[1] - b.innerHTML[1])
    .forEach(li => list.append(li))
    if(!model.pocketSize) pocket.remove()
  }
}
const controller = {
  pushTarget: target => {
    const index =  target.innerHTML[0].charCodeAt() - 65;
    classifiedColumn[index].append(target);
    model.pocketSize--;
    view.sortElem(classifiedColumn[index]);
  }
}

pocket.addEventListener('click', event => {
  if(event.target.tagName === 'LI') controller.pushTarget(event.target)
})

