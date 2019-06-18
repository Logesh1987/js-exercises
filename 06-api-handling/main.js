const model = {
  postData: [],
  getPostData: () => model.postData,
  setPostData: (data) => model.postData = data
}

const controller = {
  fetchPostData: () => {
    fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then(res => res.json())
      .then(res => {
        model.setPostData(res)
        view.renderPosts(model.getPostData());
      })
      .catch(err => view.renderError(err))
  },
  fetchAuthor: (e) => {
    if (e.target.tagName !== 'A') return false;
    e.preventDefault()
    let user_id = e.target.getAttribute('data-id');
    fetch(`https://jsonplaceholder.typicode.com/users/${user_id}`)
      .then(res => res.json())
      .then(res => view.renderModal(res))
      .catch(err => view.renderError(err))
  }
}

const view = {
  postBox: document.querySelector('#postBox'),
  modal: document.querySelector('#modal'),
  modalContent: modal.querySelector('.modal-content'),
  renderError: (err) => {
    M.toast({html: err, classes: 'red accent-4'})
  },
  renderPosts: (data) => {
    data.forEach(post => {
    const html = `
      <div class="col s12 m4"><div class="card">
        <div class="card-content"><span class="card-title">${post.title}</span><p>${post.body}</p></div>
        <div class="card-action"><a data-id="${post.userId}" class="waves-effect waves-light btn red accent-2 authorCta" href="#">About Author</a></div>
      </div></div>`
    view.postBox.innerHTML += html
    view.postBox.addEventListener('click', controller.fetchAuthor)
    })
  },
  renderModal: (data) => {
    const instance = M.Modal.init(view.modal, {
      onCloseEnd:  _ => {
        view.modalContent.innerHTML = ''
        instance.destroy()
      }
    })
    const html = `
      <h4 class=" red-text text-accent-3">Author Info</h4><br>
      <div class="row"><div class="col s3"><strong>Name</strong></div><div class="col s6">${data.name}</div></div>
      <div class="row"><div class="col s3"><strong>Phone</strong></div><div class="col s6">${data.phone}</div></div>
      <div class="row"><div class="col s3"><strong>Email</strong></div><div class="col s6">${data.email}</div></div>
      <div class="row"><div class="col s3"><strong>Website</strong></div><div class="col s6">${data.website}</div></div>
    `
    view.modalContent.innerHTML = html;
    instance.open()
  }
}

controller.fetchPostData()
