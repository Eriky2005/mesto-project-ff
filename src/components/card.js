function createCard({ name, link }, deleteCard, likeCard,handleImageClick) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');
  
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__image').alt = name;
    
    deleteButton.addEventListener('click', () => deleteCard(cardElement));
    cardLikeButton.addEventListener('click', likeCard);
    cardImage.addEventListener('click', handleImageClick);
    
    return cardElement;
  }
  
  function deleteCard(cardElement) {
    cardElement.remove();
  }
  
  function likeCard(evt) {
    evt.preventDefault();
    if (evt.target.classList.contains('card__like-button')) {
        evt.target.classList.toggle('card__like-button_is-active');
    }
  }
  
  export {createCard, deleteCard, likeCard};