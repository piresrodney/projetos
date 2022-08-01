const campoValor = document.querySelector('input#inputvalor');
const campoDescricao = document.querySelector('input#inputdescricao');
const campoData = document.querySelector('input#inputdata');
const campoTipo = document.querySelector('select#tipo')

const controleFinanceiro = {
    dadosFinanceiros: [
        {
            valor: 0,
            descricao: '',
            dataLancamento: new Date,
            tipo: -1
        }            
    ]
} 

const dadosValidos = {
    valido: false,
    mensagem: ''
}

const validacoesCampos = {
    validarCampoValor() {
        dadosValidos.valido = campoValor.value > 0;
        dadosValidos.mensagem = '';

        if (!dadosValidos.valido) {
           dadosValidos.mensagem = 'Informe um valor válido e/ou maior do que zero.'; 
        }        
    },
    validarCampoDescricao() {
        dadosValidos.valido = campoDescricao.value.trim() != '';
        dadosValidos.mensagem = '';

        if (!dadosValidos.valido) {
            dadosValidos.mensagem = 'Informe uma descrição para o lançamento.'; 
        }      
    },
    validarCampoData() {
        dadosValidos.valido = campoData.value != 0;
        dadosValidos.mensagem = '';

        if (!dadosValidos.valido) {
            dadosValidos.mensagem = 'Informe uma data para o lançamento.'; 
        }  
    }
}

const validarCampos = {
    validarCamposDaTela() {
        validacoesCampos.validarCampoValor();
        let resultado = dadosValidos.valido;

        if (!resultado) {
            campoValor.focus();
        } else {
            validacoesCampos.validarCampoDescricao()
            resultado = dadosValidos.valido;

            if (!resultado) {
                campoDescricao.focus();
            } else {
                validacoesCampos.validarCampoData()
                resultado = dadosValidos.valido;

                if (!resultado) {
                    campoData.focus();
                }
            }
        }

        if (!resultado) {
            alert(dadosValidos.mensagem);
        }
    }
}

window.onload = function () {
    // Coloca foco em campo ao carregar a tela
    campoValor.focus();
}

function gravarDadoFinanceiro() { 
    validarCampos.validarCamposDaTela();
    
    if (dadosValidos.valido) {    
        // push é usado para incluir informações no array        
        controleFinanceiro
            .dadosFinanceiros
            .push({ valor: campoValor.value, 
                    descricao: campoDescricao.value.trim(), 
                    dataLancamento: campoData.value, 
                    tipo: campoTipo.selectedIndex });  
                    
        alert('Incluído com sucesso.');                               
        //alert(controleFinanceiro.dadosFinanceiros);
    }     
}