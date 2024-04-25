// script.js
document.addEventListener("DOMContentLoaded", function () {
    const cardList = document.getElementById("cardList");
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const attributeFilter = document.getElementById("attributeFilter");
    const filterByAttributeButton = document.getElementById("filterByAttribute");
    const levelFilter = document.getElementById("levelFilter");
    const filterByLevelButton = document.getElementById("filterByLevel");
    
    let cardsData = []; // Armazena todos os dados das cartas

    // Função para exibir as cartas com base nos filtros
    function displayFilteredCards(searchTerm, attributeFilterValue, levelFilterValue) {
        // Limpa a lista de cartas atual
        cardList.innerHTML = "";

        // Filtra as cartas que correspondem aos critérios de pesquisa
        const filteredCards = cardsData.filter(card => 
            card.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (attributeFilterValue === "" || (card.attribute && card.attribute.toLowerCase() === attributeFilterValue.toLowerCase())) &&
            (levelFilterValue === "" || (card.level && card.level.toString().toLowerCase() === levelFilterValue.toLowerCase()))
        );

        // Se não houver correspondências, exibe uma mensagem
        if (filteredCards.length === 0) {
            const noResultsMessage = document.createElement("h2");
            noResultsMessage.textContent = "Nenhuma carta encontrada.";
            cardList.appendChild(noResultsMessage);
        } else {
            // Exibe as cartas filtradas
            filteredCards.forEach(card => {
                const cardElement = document.createElement("div");
                cardElement.classList.add("card");
                cardElement.innerHTML = `
                    <h2>${card.name}</h2>
                    <img src="${card.card_images[0].image_url}" alt="${card.name}">
                    <p><strong>Tipo:</strong> ${card.type}</p>
                    <p><strong>Atributo:</strong> ${card.attribute}</p>
                    <p><strong>Nível:</strong> ${card.level}</p>
                    <p><strong>Ataque:</strong> ${card.atk}</p>
                    <p><strong>Defesa:</strong> ${card.def}</p>
                `;
                cardList.appendChild(cardElement);
            });
        }
    }

    // Função para lidar com a entrada do usuário no campo de pesquisa
    searchButton.addEventListener("click", function () {
        const searchTerm = searchInput.value.trim();
        const attributeFilterValue = attributeFilter.value;
        const levelFilterValue = levelFilter.value;
        displayFilteredCards(searchTerm, attributeFilterValue, levelFilterValue);
    });

    // Função para lidar com a pesquisa por atributo
    filterByAttributeButton.addEventListener("click", function () {
        const searchTerm = searchInput.value.trim();
        const attributeFilterValue = attributeFilter.value;
        const levelFilterValue = levelFilter.value;
        displayFilteredCards(searchTerm, attributeFilterValue, levelFilterValue);
    });

    // Função para lidar com a pesquisa por nível
    filterByLevelButton.addEventListener("click", function () {
        const searchTerm = searchInput.value.trim();
        const attributeFilterValue = attributeFilter.value;
        const levelFilterValue = levelFilter.value;
        displayFilteredCards(searchTerm, attributeFilterValue, levelFilterValue);
    });

    // Buscar dados da API Yu-Gi-Oh e armazená-los
    fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php")
        .then(response => response.json())
        .then(data => {
            cardsData = data.data;
        })
        .catch(error => console.error("Erro ao obter cartas:", error));
});
