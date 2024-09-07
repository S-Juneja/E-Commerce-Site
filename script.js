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

// Fetch Products from JSON for shop pg
let listProdHtm = document.querySelector('.pro-container');
let listProds = [];

const addToHTML = () => {
    listProdHtm.innerHTML = '';
    if(listProds.length > 0){
        listProds.forEach(prod => {
            let newProd = document.createElement('div');
            newProd.classList.add('pro');
            // These divs will have a data-id with the id given in json file
            // We need them to know which prod's add to cart was clicked
            newProd.dataset.id = prod.id;
            newProd.innerHTML = `
                <a href="sproduct.html?id=${prod.id}">
                <img src="${prod.image}" alt=""></a>
                <div class="des">
                    <span>Adidas</span>
                    <h5>${prod.name}</h5>
                    <div class="star">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <h4>$${prod.price}</h4>
                </div>
                <a href="#"><i class="fal fa-shopping-cart cart addCart" data-id=${prod.id}></i>`;
            listProdHtm.appendChild(newProd); 
    })
}}

// // Add to Cart Functioning

let carts = JSON.parse(localStorage.getItem("carts")) || [];

const findProdInCart = (cart, prodid) => {
    const isProdInCart = cart && cart.length > 0 && cart.some(({id}) => id===prodid); 
    return isProdInCart;
}

// If the addToCart icon is clicked, then call cartfunc
listProdHtm.addEventListener('click', (event) => {
    let clickPos = event.target;
    // Target is where the user clicked on the prod card
    // addCart is the class of the cart icon on the prod
    if(clickPos.classList.contains('addCart')){
        // i -> a -> div with data-id 
        let prod_id = parseInt(clickPos.closest('.pro').dataset.id); // Convert prod_id to a number
        cartfunc(prod_id);
    }
})

function cartfunc(prod_id){
    const isProdInCart = findProdInCart(carts, prod_id);
        // If prod is not in the cart already
        if(!isProdInCart){
            // Add the matched prod in cart from JSON data
            const prodToAdd = listProds.filter(({id}) => id === prod_id);
            carts = [...carts, ...prodToAdd];
            console.log(carts);
        }
        // If it is already in the cart, just inc qty
        else{
            let posProdInCart = carts.findIndex((value) => value.id == prod_id);
            carts[posProdInCart].quantity = carts[posProdInCart].quantity + 1;
        }
        localStorage.setItem("carts", JSON.stringify(carts));
        // To make sure user stays where he/she was after the alert
        const scrollPosition = window.scrollY;
        alert("Product added to cart");
        setTimeout(() => {
            window.scrollTo(0, scrollPosition);
        }, 100);
}

const initApp = () => {
    fetch('prod.json')
    .then(res => res.json())
    .then(data => {
        listProds = data;
        addToHTML();
        getDetail();
    })
}
initApp();

const getDetail = () => {
    let idProd = new URLSearchParams(window.location.search).get('id');
    let info = listProds.filter(({id}) => id == idProd);
    if(!info){
        window.location.href="index.html";
    }
    let detail = document.getElementById("prodetails");
    detail.innerHTML= `
            <div class="single-pro-img">
                <img src=${info[0].image} width="100%" id="mainImg" alt="">
                <div class="small-img-grp">
                    <div class="small-img-col">
                        <img src=${info[0].image} class="small-img" width="100%" alt="">
                    </div>
                    <div class="small-img-col">
                        <img src="img/products/f2.jpg" class="small-img" alt="" width="100%">
                    </div>
                    <div class="small-img-col">
                        <img src="img/products/f3.jpg" class="small-img" alt="" width="100%">
                    </div>
                    <div class="small-img-col">
                        <img src="img/products/f4.jpg" class="small-img" alt="" width="100%">
                    </div>
                </div>
            </div>
            <div class="single-pro-details">
                <button id="share" onclick="shareWhatsApp()">Share</button>
                <h6>Home / T-Shirts</h6>
                <h4>Men's Fashion T-Shirts</h4>
                <h2>$${info[0].price}</h2>
                <select>
                    <option>Select Size</option>
                    <option>XL</option>
                    <option>XXL</option>
                    <option>Small</option>
                    <option>Medium</option>
                    <option>Large</option>
                </select>
                
                <button onclick="cartfunc(${idProd})" class="normal"  data-id=${info[0].id}>Add To Cart</button>
                <h4>Product Details</h4>
                <span>Introducing our premium men's t-shirts, crafted with comfort and style in mind. Made from high-quality, breathable fabrics, our t-shirts offer a perfect balance of softness and durability, ensuring long-lasting wear. Whather you're dressing up for a night out or keeping it casual on the weekend, our versatile designs are suitable for any occasion. Upgrade your essentials with our men's t-shirts and experience comfort and style like never before.</span>
            </div>
        `;

    // Image Slider Functionality
    var mainImg = document.getElementById("mainImg");
    var smallImg = document.getElementsByClassName("small-img");

    for (let i = 0; i < smallImg.length; i++) {
        smallImg[i].addEventListener('click', function() {
        mainImg.src = this.src; 
        // Update main image source with clicked small image source
        });
    }
}

// Share Button functioning
// function shareWhatsApp() {
//     var text = encodeURIComponent('Check out this product:\n' + window.location.href);
//     console.log(text);
//     // window.open('https://wa.me/?text=' + text, '_blank').focus();
// }
function shareWhatsApp() {
    var productUrl = window.location.href;
    var message = 'Check out this product:\n' + productUrl;
    var whatsappUrl = 'https://wa.me/?text=' + encodeURIComponent(message);
    var newWindow = window.open(whatsappUrl, '_blank');

    if (newWindow) {
        newWindow.focus();
    }
}













