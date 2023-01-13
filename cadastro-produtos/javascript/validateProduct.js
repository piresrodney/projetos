import { productsArray } from "./variables.js";
export { validProduct };

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

    const registered = productsArray.filter((product) => product.product === productName.value);

    if (registered.length > 0) {
        alert('Este produto já está cadastrado.');
        productName.value = '';
        productValue.value = '';
        productName.focus();
        return false;
    }

    return true
}