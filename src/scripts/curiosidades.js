function showTab(tabName) {
    const tabs = document.getElementsByClassName('tab-content');
    const curiositiesBtn = document.getElementById('curiosities-btn');
    const introBtn = document.getElementById('intro-btn');

    const curiositiesContainer = document.getElementById('curiosities-container');
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
        curiositiesContainer.style.animation = 'slideInFromTop 0.5s forwards';
    } else {
        introBtn.classList.add('hide');
        curiositiesBtn.classList.remove('hide');
        curiositiesContainer.style.animation = 'slideOutToTop 0.5s forwards';
        setTimeout(() => {
            curiositiesContainer.classList.add('hide');
            introContainer.classList.remove('hide');
        }, 500);
    }
}

// Inicia com a aba 'intro' ativa
showTab('intro');
