const model = {
  stock: [],
  cart: [],
  getStock: _ => model.stock,
  getCart: _ => model.cart,
  setStock: _stock => {
    model.stock = _stock;
    model.setStorage();
  },
  setCart: _cart => {
    model.cart = _cart;
    model.setStorage();
  },
  setStorage: _ =>
    window.localStorage.setItem(
      "entity",
      JSON.stringify({
        stock: model.stock,
        cart: model.cart
      })
    ),
  updateCart: (name, type) => {
    model.setStock(
      model.stock.map(item =>
        item.name === name
          ? {
              name: item.name,
              count: type === "add" ? item.count - 1 : item.count + 1
            }
          : item
      )
    );
    model.setCart(
      model.cart.map(item =>
        item.name === name
          ? {
              name: item.name,
              count: type === "add" ? item.count + 1 : item.count - 1
            }
          : item
      )
    );
  }
};

const controller = {
  fetchStock: _ => {
    const entity = window.localStorage.getItem("entity");
    if (entity) {
      model.setStock(JSON.parse(entity)["stock"]);
      model.setCart(JSON.parse(entity)["cart"]);
      view.renderEntity();
    } else {
      fetch("./entity.json").then(res =>
        res.json().then(response => {
          model.setStock(response);
          model.setCart(response.map(item => ({ name: item.name, count: 0 })));
          view.renderEntity();
        })
      );
    }
  },
  cartUpdate: e => {
    if (e.target.tagName === "LI") {
      const selectedItem = e.target.getAttribute("data-item");
      if (e.target.parentElement.classList.contains("stock")) {
        model.stock.find((item, index) => {
          if (item.name === selectedItem && item.count) {
            model.updateCart(selectedItem, "add");
            view.renderStock(selectedItem, model.stock[index]);
            view.renderCart(selectedItem, model.cart[index]);
          }
        });
      } else {
        model.cart.find((item, index) => {
          if (item.name === selectedItem && item.count) {
            model.updateCart(selectedItem, "remove");
            view.renderStock(selectedItem, model.stock[index]);
            view.renderCart(selectedItem, model.cart[index]);
          }
        });
      }
    }
  },
  clearCart: e => {
    window.localStorage.removeItem("entity");
    controller.fetchStock();
  }
};

const view = {
  stockBox: document.querySelector("ul.stock"),
  cartBox: document.querySelector("ul.cart"),
  cartHead: document.querySelector(".cartHead"),
  clearCart: document.querySelector("button"),
  renderEntity: _ => {
    const stock = model.getStock();
    const cart = model.getCart();
    stock.forEach(item => {
      if (item.count) {
        const li = document.createElement("li");
        li.setAttribute("data-item", item.name);
        li.innerHTML = `${item.name} ${item.count ? `(${item.count})` : ""}`;
        view.stockBox.appendChild(li);
      }
    });
    cart.forEach(item => {
      if (item.count) {
        const li = document.createElement("li");
        li.setAttribute("data-item", item.name);
        li.innerHTML = `${item.name} ${item.count ? `(${item.count})` : ""}`;
        view.cartBox.appendChild(li);
      }
    });
    view.clearCart.addEventListener(
      "click",
      e => {
        e.preventDefault();
        view.stockBox.innerHTML = "";
        view.cartBox.innerHTML = "";
        controller.clearCart();
      },
      { once: true }
    );
    view.stockBox.addEventListener("click", controller.cartUpdate);
    view.cartBox.addEventListener("click", controller.cartUpdate);
    view.cartHead.innerHTML = `Cart ${cart.length ? `(${cart.length})` : ""}`;
  },
  renderStock: (target, data) => {
    const stockItem = view.stockBox.querySelector(
      `li[data-item = '${target}']`
    );
    if (stockItem) {
      if (data.count) {
        stockItem.innerHTML = `${data.name} (${data.count})`;
      } else {
        stockItem.remove();
      }
    } else {
      const li = document.createElement("li");
      li.setAttribute("data-item", data.name);
      li.innerHTML = `${data.name} ${data.count ? `(${data.count})` : ""}`;
      view.stockBox.appendChild(li);
    }
  },
  renderCart: (target, data) => {
    const cartItem = view.cartBox.querySelector(`li[data-item = '${target}']`);
    if (cartItem) {
      if (data.count) {
        cartItem.innerHTML = `${data.name} (${data.count})`;
      } else {
        cartItem.remove();
      }
    } else {
      const li = document.createElement("li");
      li.setAttribute("data-item", data.name);
      li.innerHTML = `${data.name} ${data.count ? `(${data.count})` : ""}`;
      view.cartBox.appendChild(li);
    }
  }
};

controller.fetchStock();
