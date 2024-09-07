// To show the navbar on clicking menu on small devices 
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if(bar){
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

// or close it if already open
if(close){
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

const listCartHtm = document.getElementById('cartList');
let total = document.getElementById("total");
let subtotal = document.getElementById("sub-total");

// Show the cart on the website
const addCartToHtml = (carts) => {
    listCartHtm.innerHTML = ``;
    // If there are prods in the cart
    if(carts.length > 0){
        carts.forEach(cart => {
            let newCart = document.createElement('tr');
            newCart.classList.add("forRemove");
            newCart.dataset.id = cart.id;
            newCart.innerHTML = `
            <td><a href="#"><i class="far fa-times-circle" id="remove"></i></a></td>
            <td><img src="${cart.image}" alt=""></td>
            <td>${cart.name}</td>
            <td>$${cart.price}</td>
            <td><input type="number" class="qty" value="${cart.quantity}"></td>
            <td>$${cart.price * cart.quantity}</td>`;
            listCartHtm.appendChild(newCart);
        })
        total.innerText= updateTotal();
        subtotal.innerText= updateTotal();
    }
}

let carts = JSON.parse(localStorage.getItem("carts")) || [];
addCartToHtml(carts);

function updateTotal(){
    let amt = 0;
    carts.forEach(cart => {
        amt = amt + (cart.price*cart.quantity);
    })
    return `$${amt}`;
}

// For removal of Prod from cart
let removeProds = document.querySelectorAll(".forRemove");
removeProds.forEach(removeProd => {
    removeProd.addEventListener("click", (event) => {
        let clickPos = event.target;
        // if remove icon is clicked
        if(clickPos.classList.contains('fa-times-circle')){
            const productId = event.currentTarget.dataset.id; 
            carts = carts.filter(({id}) => id != productId);
            event.currentTarget.innerHTML = ``; // Clear the content of the clicked row
            localStorage.setItem("carts", JSON.stringify(carts));
            // Update the local storage with new cart with removed prod
        }
        total.innerText= updateTotal();
        subtotal.innerText= updateTotal();
    });
});

// change the price on changing qty
let qtyInput = document.querySelectorAll(".qty");
qtyInput.forEach(qty => {
    qty.addEventListener('change', (event) => {
        const currentValue = event.target.value;
        const productId = event.target.parentElement.parentElement.dataset.id;
        let posProdInCart = carts.findIndex((value) => value.id == productId);
        // If qty = 0 , then remove from cart
        if(currentValue == 0){
            carts.splice(posProdInCart, 1);
            // Update the cart in localStorage
            localStorage.setItem("carts", JSON.stringify(carts));
            // Remove the corresponding row from the DOM
            event.target.parentElement.parentElement.remove();
        }
        else{
            carts[posProdInCart].quantity=currentValue;
            localStorage.setItem("carts", JSON.stringify(carts));
            let price = carts[posProdInCart].price;
            let newPrice = price * currentValue;
            let totalPriceCell = event.target.parentElement.nextElementSibling;
            totalPriceCell.textContent = `$${newPrice}`;
        }
        total.innerText= updateTotal();
        subtotal.innerText= updateTotal();
    });
})
