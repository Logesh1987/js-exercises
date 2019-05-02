const classifiedColumn = document.querySelectorAll('.classifiedColumn');
const pocket = document.querySelector('#pocket');

const sortElem = list => {
  Array.from(list.querySelectorAll('li:not(:first-child)'))
  .sort((a, b) => a.innerHTML[1] - b.innerHTML[1])
  .forEach(li => list.append(li))
}

const pushTarget = target => {
  const index =  target.innerHTML[0].charCodeAt() - 65;
  classifiedColumn[index].append(target);
  sortElem(classifiedColumn[index])
  if(!pocket.querySelectorAll('li').length) pocket.remove()
}

pocket.addEventListener('click', event => {
  if(event.target.tagName = 'LI') pushTarget(event.target)
})

