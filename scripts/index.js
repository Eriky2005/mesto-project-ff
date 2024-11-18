// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');

function renderInitialCards() {
    initialCards.forEach(({ name, link }) => {
        const card = createCard({ name, link }, deleteCard);
        cardsContainer.append(card);
    });
}

function createCard({ name, link }, deleteCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__image').alt = name;
    
    deleteButton.addEventListener('click', () => deleteCard(cardElement));
    return cardElement;
}

function deleteCard(cardElement) {
    cardElement.remove();
}

renderInitialCards();