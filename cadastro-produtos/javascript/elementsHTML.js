import { productsArray } from "./variables.js";
import { valueConverter } from "./valueConverter.js";
import { validProduct } from "./validateProduct.js";
import { deleteProduct } from "./deleteProduct.js";
import { randomNumber } from "./randomNumberGenerator.js";

let idProduct = 1;

function insertProductArray(object) {
    productsArray.push(object);
}

export function createProductOnTable(insertArray, productName, productValue) {
    const productsTable = document.getElementById('body-products');
    const tr = document.createElement('tr');
    const tdId = document.createElement('td');
    const tdProduct = document.createElement('td');
    const tdValue = document.createElement('td');
    const tdImage = document.createElement('td');    

    const idCurrent = randomNumber();
    idProduct++;

    tr.id = `product-${idCurrent}`;

    const valueConverted = valueConverter(productValue);
    tdId.innerText = idCurrent;
    tdProduct.innerText = productName;
    tdValue.innerText = valueConverted;
    tdImage.innerHTML = `<td><img src="./image/garbage3.png" alt="Lixeira" id="image-delete-${idCurrent}"></td>`;
    tdImage.addEventListener('click', () => deleteProduct(idCurrent));

    tr.appendChild(tdId);
    tr.appendChild(tdProduct);
    tr.appendChild(tdValue);
    tr.appendChild(tdImage);    

    productsTable.appendChild(tr);

    if (insertArray) {
        insertProductArray(
            {id: idCurrent, product: productName, value: productValue}
            );
    }
}

function finishPost(productName, productValue) {
    productName.value = '';
    productValue.value = '';
    productName.focus()
}

export function productPost(event) {    
    event.preventDefault();

    const productName = document.getElementById('product-name');
    const productValue = document.getElementById('product-value');

    if (!validProduct(productName, productValue)) {
        return
    }

    createProductOnTable(true, productName.value, productValue.value);
    finishPost(productName, productValue);

    alert('Produto gravado com sucesso.')
}