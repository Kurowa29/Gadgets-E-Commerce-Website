document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalContainer = document.querySelector('.cart-total');
    const checkoutSection = document.querySelector('.checkout-section');
    const checkoutTotalContainer = document.querySelector('.checkout-total');
    const receiptSection = document.querySelector('.receipt-section');
    const receiptItemsContainer = document.querySelector('.receipt-items');
    const receiptTotalContainer = document.querySelector('.receipt-total');

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent the default action of the anchor tag

            const productElement = e.target.closest('.product');
            const productId = productElement.getAttribute('data-id');
            const productName = productElement.getAttribute('data-name');
            const productPrice = parseFloat(productElement.getAttribute('data-price'));

            const existingProductIndex = cart.findIndex(item => item.id === productId);

            if (existingProductIndex !== -1) {
                cart[existingProductIndex].quantity += 1;
            } else {
                cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
            }

            updateCartUI();
        });
    });

    document.querySelector('.checkout').addEventListener('click', () => {
        let total = 0;

        cart.forEach(item => {
            total += item.price * item.quantity;
        });

        checkoutTotalContainer.textContent = total.toFixed(2);
        checkoutSection.style.display = 'block';
    });

    document.querySelector('.confirm-checkout').addEventListener('click', () => {
        alert('Purchase confirmed!');
        displayReceipt();
        cart.length = 0;
        updateCartUI();
        checkoutSection.style.display = 'none';
    });

    document.querySelector('.new-purchase').addEventListener('click', () => {
        receiptSection.style.display = 'none';
    });

    function updateCartUI() {
        cartItemsContainer.innerHTML = '';

        let total = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`;
            
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                removeFromCart(item.id);
            });

            li.appendChild(removeButton);
            cartItemsContainer.appendChild(li);

            total += item.price * item.quantity;
        });

        cartTotalContainer.textContent = total.toFixed(2);
    }

    function removeFromCart(productId) {
        const productIndex = cart.findIndex(item => item.id === productId);

        if (productIndex !== -1) {
            cart[productIndex].quantity -= 1;

            if (cart[productIndex].quantity === 0) {
                cart.splice(productIndex, 1);
            }

            updateCartUI();
        }
    }

    function displayReceipt() {
        receiptItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`;
            receiptItemsContainer.appendChild(li);

            total += item.price * item.quantity;
        });

        receiptTotalContainer.textContent = total.toFixed(2);
        receiptSection.style.display = 'block';
    }
});




document.addEventListener("DOMContentLoaded", function() {
    var cartsLink = document.querySelector(".carts");
    var cartSection = document.querySelector(".cart");
    var checkoutSection = document.querySelector(".checkout-section");
    var receiptSection = document.querySelector(".receipt-section");

    cartsLink.addEventListener("click", function(event) {
        event.preventDefault();
        cartSection.style.display = "block";
        checkoutSection.style.display = "none";
        receiptSection.style.display = "none";
    });

    document.querySelector(".checkout").addEventListener("click", function() {
        cartSection.style.display = "none";
        checkoutSection.style.display = "block";
        receiptSection.style.display = "none";
    });

    document.querySelector(".confirm-checkout").addEventListener("click", function() {
        cartSection.style.display = "none";
        checkoutSection.style.display = "none";
        receiptSection.style.display = "block";
    });

    document.querySelector(".new-purchase").addEventListener("click", function() {
        cartSection.style.display = "block";
        checkoutSection.style.display = "none";
        receiptSection.style.display = "none";
    });
});
