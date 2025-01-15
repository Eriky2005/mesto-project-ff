function createCard({ name, link, likes, ownerId, _id, currentUserId}, addLike, deleteLike, deleteCardFromApi, handleImageClick) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');
    const cardLikesCount =  cardElement.querySelector('.card__likes-count');
  
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__image').alt = name;
    cardLikesCount.textContent = likes.length;
    cardElement.dataset.cardId = _id;
    
    if (ownerId == currentUserId){
      deleteButton.addEventListener('click', () => {
        const cardId = cardElement.dataset.cardId;
        deleteCardFromApi(cardId)
            .then(() => {
                cardElement.remove();
            })
            .catch(err => {
                console.log(err);
            })
      });
      deleteButton.style.display = 'block';
    } else {
      deleteButton.style.display = 'none';
    }

    const isLiked = likes.some(like => like._id == currentUserId);
    if (isLiked) {
        cardLikeButton.classList.add('card__like-button_is-active');
    }

    cardLikeButton.addEventListener('click', () => {
      if (cardLikeButton.classList.contains('card__like-button_is-active')) {
          deleteLike(_id)
            .then(data => {
                cardLikeButton.classList.remove('card__like-button_is-active');
                cardLikesCount.textContent = data.likes.length;
            })
            .catch(err => {
                console.log(err);
            });
      } else {
          addLike(_id)
            .then(data => {
                cardLikeButton.classList.add('card__like-button_is-active');
                cardLikesCount.textContent = data.likes.length;
            })
            .catch(err => {
                console.log(err);
            });
      }
    });

    cardImage.addEventListener('click', handleImageClick);
    
    return cardElement;
};

export {createCard};