// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import './index.css';
import {createCard,likeCard,deleteCard,handleImageClick,initialCards} from './cards.js';
import { openModal, closeModal } from './modal.js';

const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');

function renderInitialCards() {
    initialCards.forEach(({ name, link }) => {
        const card = createCard({ name, link }, deleteCard, likeCard, handleImageClick);
        cardsContainer.append(card);
    });
};
renderInitialCards();

const buttonProfileEdit = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const buttonProfileAdd = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const buttonPopupClose = document.querySelectorAll('.popup__close');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image'); 
const popupCaption = popupTypeImage.querySelector('.popup__caption'); 

buttonProfileEdit.addEventListener('click', () => openModal(popupTypeEdit));
buttonProfileAdd.addEventListener('click', () => openModal(popupTypeNewCard));
buttonPopupClose.forEach(button => {
    button.addEventListener('click', (event) => {
        const popupElement = event.target.closest('.popup_is-opened');
        if (popupElement){
            closeModal(popupElement);
        }
    });
});

const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
let profileTitle = document.querySelector('.profile__title');
let profileDescription = document.querySelector('.profile__description');

function fillFormWithProfileData() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
}

function handleFormSubmit(evt) {
    evt.preventDefault();

    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    profileTitle.textContent = nameValue;
    profileDescription.textContent = jobValue;

    closeModal(formElement.closest('.popup'));
}

formElement.addEventListener('submit', handleFormSubmit);
fillFormWithProfileData();

const formElementNewPlace = document.forms[1];
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');

function processFormSubmit(evt) {
    evt.preventDefault();

    const cardNameValue = cardNameInput.value;
    const urlValue = urlInput.value;
    const newCard = createCard({ name: cardNameValue, link: urlValue }, deleteCard, likeCard, handleImageClick);
    cardsContainer.prepend(newCard);

    closeModal(formElementNewPlace.closest('.popup'));
    cardNameInput.value = '';
    urlInput.value = '';
}

formElementNewPlace.addEventListener('submit', processFormSubmit);

export {popupCaption,popupImage, popupTypeImage};