import { productsArray } from "./variables.js";

export function deleteProduct(value) {
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