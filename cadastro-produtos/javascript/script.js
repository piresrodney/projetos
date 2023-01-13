import { productsArray } from "./variables.js";
import { createProductOnTable, productPost } from "./elementsHTML.js";

window.onload = function() {
    document.getElementById("product-name").focus();
    productsArray.forEach((product) => createProductOnTable(false, product.product, product.value, product.id));
}

function cancelEnter(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
    }
}

document.getElementById('button-post').addEventListener('click', productPost);
document.getElementById('product-name').addEventListener('keydown', event => cancelEnter(event));
document.getElementById('product-value').addEventListener('keydown', event => cancelEnter(event));

