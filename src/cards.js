const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

import {popupCaption,popupImage,popupTypeImage} from './index.js';
import {openModal} from './modal.js';

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

function handleImageClick(event) {
  const image = event.target;
  const imageSrc = image.src; 
  const imageAlt = image.alt; 

  popupImage.src = imageSrc;
  popupImage.alt = imageAlt;
  popupCaption.textContent = imageAlt; 

  openModal(popupTypeImage);
}

export {createCard, deleteCard, likeCard, handleImageClick, initialCards};
