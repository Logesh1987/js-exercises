const classifiedColumn = document.querySelectorAll('.classifiedColumn');
const pocket = document.querySelector('#pocket');

pocket.addEventListener('click', event => {
  const target = event.target;
  if(target.tagName = 'LI') {
    pushTarget(target)
  }
})

const pushTarget = target => {
  console.log(target[0])
  switch(target.innerHTML[0]) {
    case 'A': classifiedColumn[0].append(target) break;
    case 'B': classifiedColumn[1].append(target) break;
    case 'C': classifiedColumn[2].append(target) break;
  }
}
