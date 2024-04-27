document.addEventListener("DOMContentLoaded", function () {
    const cardList = document.getElementById("cardList");
    const searchInput = document.getElementById("searchInput");
    const attributeFilter = document.getElementById("attributeFilter");
    const levelFilter = document.getElementById("levelFilter");
    
    let cardsData = []; // Armazena todos os dados das cartas
    let displayedCards = 0; // Contador de cartas exibidas

    // Função para exibir as cartas com base nos filtros
    function displayFilteredCards() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const attributeFilterValue = attributeFilter.value.toLowerCase();
        const levelFilterValue = levelFilter.value.toLowerCase();
        // Filtra as cartas que correspondem aos critérios de pesquisa
        const filteredCards = cardsData.filter(card => 
            card.name.toLowerCase().includes(searchTerm) &&
            (attributeFilterValue === "" || (card.attribute && card.attribute.toLowerCase() === attributeFilterValue)) &&
            (levelFilterValue === "" || (card.level && card.level.toString().toLowerCase() === levelFilterValue))
        );
        // Limpa a lista de cartas atual
        cardList.innerHTML = "";
        // Se não houver correspondências, exibe uma mensagem
        if (filteredCards.length === 0) {
            const noResultsMessage = document.createElement("h2");
            noResultsMessage.textContent = "Nenhuma carta encontrada.";
            cardList.appendChild(noResultsMessage);
        } else {
            // Exibe as cartas filtradas
            const startIndex = displayedCards;
            const endIndex = Math.min(startIndex + 18, filteredCards.length);
            // Cria elementos de cartas para as novas cartas
            for (let i = startIndex; i < endIndex; i++) {
                const card = filteredCards[i];
                const cardElement = document.createElement("div");
                cardElement.classList.add("card");
                cardElement.innerHTML = `
                    <!--<h2>${card.name}</h2> -->
                    <img src="${card.card_images[0].image_url}" alt="${card.name}">
                    <div class="card__info">
                        <p><strong>Tipo:</strong> ${card.type}</p>
                        <p><strong>Atributo:</strong> ${card.attribute}</p>
                        <p><strong>Nível:</strong> ${card.level}</p>
                        <p><strong>Ataque:</strong> ${card.atk}</p>
                        <p><strong>Defesa:</strong> ${card.def}</p>
                    </div>
                `;
                cardList.appendChild(cardElement);
            }
            // Atualiza o contador de cartas exibidas
            displayedCards = endIndex;
        }
    }

    // Função para carregar mais cartas quando o usuário rolar a página até o final
    function loadMoreCards() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            const searchTerm = searchInput.value.trim().toLowerCase();
            const attributeFilterValue = attributeFilter.value.toLowerCase();
            const levelFilterValue = levelFilter.value.toLowerCase();
            // Filtra as cartas que correspondem aos critérios de pesquisa
            const filteredCards = cardsData.filter(card => 
                card.name.toLowerCase().includes(searchTerm) &&
                (attributeFilterValue === "" || (card.attribute && card.attribute.toLowerCase() === attributeFilterValue)) &&
                (levelFilterValue === "" || (card.level && card.level.toString().toLowerCase() === levelFilterValue))
            );
            // Adiciona mais cartas à lista
            const startIndex = displayedCards;
            const endIndex = Math.min(startIndex + 18, filteredCards.length);
            for (let i = startIndex; i < endIndex; i++) {
                const card = filteredCards[i];
                const cardElement = document.createElement("div");
                cardElement.classList.add("card");
                cardElement.innerHTML = `
                    <!--<h2>${card.name}</h2> -->
                    <img src="${card.card_images[0].image_url}" alt="${card.name}">
                    <div class="card__info">
                        <p><strong>Tipo:</strong> ${card.type}</p>
                        <p><strong>Atributo:</strong> ${card.attribute}</p>
                        <p><strong>Nível:</strong> ${card.level}</p>
                        <p><strong>Ataque:</strong> ${card.atk}</p>
                        <p><strong>Defesa:</strong> ${card.def}</p>
                    </div>
                `;
                cardList.appendChild(cardElement);
            }
            // Atualiza o contador de cartas exibidas
            displayedCards = endIndex;
        }
    }

    // Adiciona manipuladores de eventos para os campos de entrada de pesquisa, atributo e nível
    searchInput.addEventListener("input", function () {
        displayedCards = 0; // Reinicia o contador de cartas exibidas
        displayFilteredCards();
    });

    attributeFilter.addEventListener("change", function () {
        displayedCards = 0; // Reinicia o contador de cartas exibidas
        displayFilteredCards();
    });

    levelFilter.addEventListener("change", function () {
        displayedCards = 0; // Reinicia o contador de cartas exibidas
        displayFilteredCards();
    });

    // Adiciona um manipulador de evento para rolar
    window.addEventListener("scroll", loadMoreCards);

    // Buscar dados da API Yu-Gi-Oh e armazená-los
    fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php")
        .then(response => response.json())
        .then(data => {
            cardsData = data.data;
            displayFilteredCards(); // Exibe as primeiras cartas quando os dados são carregados
        })
        .catch(error => console.error("Erro ao obter cartas:", error));
});