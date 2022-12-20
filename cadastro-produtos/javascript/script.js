const productsArray = Array(
    {id: 1, product: 'Arroz', value: 5},
    {id: 2, product: 'Macarrão', value: 2},
    {id: 3, product: 'Feijão', value: 3.5}
)

window.onload = function() {
    document.getElementById("product-name").focus();

    productsArray.forEach(function (product){
        createProductOnTable(false, product.product, product.value, product.id)        
    }); 
}

const buttonPost = document.getElementById('button-post');
let idProduct = 1;

function validProduct(productName, productValue) {
    if (productName.value === '') {
        alert('Informe o nome do produto.');
        productName.focus();
        return false;
    }

    if (productValue.value < 0) {
        alert('Informe um preço maior do que 0 (zero) para o produto.');    
        productValue.focus();
        return false;
    }

    const registered = productsArray.filter(function (product){ // Retorna o conteúdo do array
        return product.product === productName.value;
    });

    if (registered.length > 0) {
        alert('Este produto já está cadastrado.');
        productName.value = '';
        productName.focus();
        return false;
    }

    return true
}

function valueConverter(productValue) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(productValue);
}

function insertProductArray(object) {
    productsArray.push(object);
}

function createProductOnTable(insertArray, productName, productValue, id = idProduct) {
    const productsTable = document.getElementById('body-products');
    const tr = document.createElement('tr');
    const tdId = document.createElement('td');
    const tdProduct = document.createElement('td');
    const tdValue = document.createElement('td');
    const tdImage = document.createElement('td');    

    const idCurrent = id;
    idProduct++;

    tr.id = `product-${idCurrent}`;

    const valueConverted = valueConverter(productValue);
    tdId.innerText = idCurrent;
    tdProduct.innerText = productName;
    tdValue.innerText = valueConverted;
    tdImage.innerHTML = `<td><img src="./image/garbage3.png" alt="Lixeira" id="image-delete-${idCurrent}" onclick="deleteProduct(${idCurrent})"></td>`;

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

function productPost(event) {    
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

buttonPost.addEventListener('click', productPost);

function deleteProduct(value) {
    if (!confirm('Confirma a exclusão o produto selecionado?')) {
        return
    }

    const trDelete = document.getElementById(`product-${value}`);
    trDelete.remove();

    let idProduct = -1;
    const product = productsArray.forEach(function(item, index) {
        if (item.id === value) {
            idProduct = index;
            return
        }
    });

    if (idProduct > -1) {
        productsArray.splice(idProduct, 1);     
    }
}