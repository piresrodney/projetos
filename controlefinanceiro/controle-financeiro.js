const campoValor = document.querySelector('input#inputvalor');

const controleFinanceiro = {
    dadosFinanceiros: [
        {
            valor: 0,
            descricao: '',
            dataLancamento: new Date,
            tipo: ''
        }            
    ]
} 

const validacoesCampos = {
    validarCampoValor() {
        return campoValor.value > 0;
    }
}

window.onload = function () {
    // Coloca foco em campo ao carregar a tela
    campoValor.focus();
}

function gravarDadoFinanceiro() {
    if (!validacoesCampos.validarCampoValor()) {
        alert('Informe um valor válido e/ou maior do que zero.');
        campoValor.focus();
    }
    else {
        alert(campoValor.value);
    }
    
    // push é usado para incluir informações no array
    /* 
    controleFinanceiro
        .dadosFinanceiros
        .push({ valor: 1.99, descricao: 'Teste de descricao', dataLancamento: new Date, tipo: 'E' }); 

   */     
}

//gravarDadoFinanceiro();

//console.log(controleFinanceiro.dadosFinanceiros[1].valor);