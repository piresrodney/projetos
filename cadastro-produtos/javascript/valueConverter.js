export function valueConverter(productValue) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(productValue);
}