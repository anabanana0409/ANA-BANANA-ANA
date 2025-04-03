// Controle do menu de acessibilidade
const botaoAcessibilidade = document.getElementById('botao-acessibilidade');
const opcoesAcessibilidade = document.getElementById('opcoes-acessibilidade');

botaoAcessibilidade.addEventListener('click', function() {
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !expanded);
    opcoesAcessibilidade.classList.toggle('mostrar-opcoes');
});

// Controle de tamanho de fonte
document.getElementById('aumentar-fonte').addEventListener('click', function() {
    alterarTamanhoFonte(1);
});

document.getElementById('diminuir-fonte').addEventListener('click', function() {
    alterarTamanhoFonte(-1);
});

function alterarTamanhoFonte(direcao) {
    const html = document.documentElement;
    let tamanhoAtual = parseFloat(getComputedStyle(html).fontSize);
    const novoValor = tamanhoAtual + (direcao * 2);
    
    // Limites mínimo e máximo
    if (novoValor >= 12 && novoValor <= 24) {
        html.style.fontSize = novoValor + 'px';
        localStorage.setItem('tamanhoFonte', novoValor);
    }
}

// Aplicar tamanho de fonte salvo
if (localStorage.getItem('tamanhoFonte')) {
    document.documentElement.style.fontSize = localStorage.getItem('tamanhoFonte') + 'px';
}

// Controle de alto contraste
document.getElementById('alterna-contraste').addEventListener('click', function() {
    document.body.classList.toggle('alto-contraste');
    
    // Salvar preferência
    if (document.body.classList.contains('alto-contraste')) {
        localStorage.setItem('altoContraste', 'ativo');
    } else {
        localStorage.setItem('altoContraste', 'inativo');
    }
});

// Aplicar alto contraste se ativo
if (localStorage.getItem('altoContraste') === 'ativo') {
    document.body.classList.add('alto-contraste');
}

// Melhorar navegação por teclado
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && opcoesAcessibilidade.classList.contains('mostrar-opcoes')) {
        botaoAcessibilidade.click();
        botaoAcessibilidade.focus();
    }
});

// Foco visível para elementos interativos
document.addEventListener('focus', function(event) {
    if (event.target.tagName === 'A' || event.target.tagName === 'BUTTON' || 
        event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        event.target.style.outline = '3px solid #ffbf47';
        event.target.style.outlineOffset = '2px';
    }
}, true);

document.addEventListener('blur', function(event) {
    if (event.target.tagName === 'A' || event.target.tagName === 'BUTTON' || 
        event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        event.target.style.outline = 'none';
    }
}, true);