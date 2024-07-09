function showTab(tabName) {
    const tabs = document.getElementsByClassName('tab-content');
    const curiositiesBtn = document.getElementById('curiosities-btn');
    const introBtn = document.getElementById('intro-btn');

    // Esconde todas as abas
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }

    // Mostra a aba selecionada
    document.getElementById(`${tabName}-container`).classList.add('active');

    // Alterna a visibilidade dos botões
    if (tabName === 'curiosities') {
        curiositiesBtn.classList.add('hide');
        introBtn.classList.remove('hide');
    } else {
        introBtn.classList.add('hide');
        curiositiesBtn.classList.remove('hide');
    }
}

// Inicia com a aba 'intro' ativa
showTab('intro');
