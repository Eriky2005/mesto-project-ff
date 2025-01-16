// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import '../index.css';
import {openModal, closeModal} from './modal.js';
import {clearValidation, enableValidation} from './validation.js';
import {createCard} from './card.js';
import {getUserData, getInitialCards, updateUser, addNewCard, deleteCardFromApi, addLike, deleteLike, updateUserAvatar} from './api.js';

const buttonProfileEdit = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const buttonProfileAdd = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const buttonsPopupClose = document.querySelectorAll('.popup__close');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image'); 
const popupCaption = popupTypeImage.querySelector('.popup__caption'); 

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

buttonProfileEdit.addEventListener('click', () => {
    fillFormWithProfileData();
    openModal(popupTypeEdit);
});

buttonProfileAdd.addEventListener('click', () => {
    openModal(popupTypeNewCard)
    clearValidation(formElementNewPlace, validationConfig);
});

buttonsPopupClose.forEach(button => {
    button.addEventListener('click', (event) => {
        const popupElement = event.target.closest('.popup_is-opened');
        if (popupElement){
            closeModal(popupElement);
        }
    });
});

const formElementEditProfile = document.forms['edit-profile']
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

function fillFormWithProfileData() {
    clearValidation(formElementEditProfile, validationConfig);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
}

formElementEditProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
    const popupTypeEdit = document.querySelector('.popup_type_edit');
    const popupButton = popupTypeEdit.querySelector('.popup__button');
    popupButton.textContent = 'Сохранение...';
    popupButton.disabled = true;
    updateUser(nameValue, jobValue)
        .then(data => {
            profileTitle.textContent = data.name;
            profileDescription.textContent = data.about;
            closeModal(popupTypeEdit);
            nameInput.value = '';
            jobInput.value = '';
        })
        .catch(err => {
            console.log(err);
            popupButton.disabled = false;
        })
        .finally(() => {
            popupButton.textContent = 'Сохранить';
            popupButton.disabled = false;
        });
    
});

let currentUserId = null;

const loadData = () => {
    Promise.all([getUserData(), getInitialCards()])
        .then(([userData, cards]) => {
            document.querySelector('.profile__avatar').src = userData.avatar;;
            profileTitle.textContent = userData.name;
            profileDescription.textContent = userData.about;
            currentUserId = userData._id;
    
            const container = document.querySelector('.content');
            const cardsContainer = container.querySelector('.places__list');
            cards.forEach(card => {
                const cardElement = createCard({
                    name: card.name,
                    link: card.link,
                    likes: card.likes,
                    ownerId: card.owner._id,
                    _id: card._id,
                    currentUserId: currentUserId
                }, addLike, deleteLike, deleteCardFromApi, handleImageClick);
                cardsContainer.append(cardElement);
            });
        })
        .catch(err => {
            console.log('Ошибка при загрузке данных:', err);
        });
};
    
loadData();


const formElementNewPlace = document.forms['new-place'];
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');

formElementNewPlace.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const cardNameValue = cardNameInput.value;
    const urlValue = urlInput.value;
    const popupTypeNewCard = document.querySelector('.popup_type_new-card');
    const popupButton = popupTypeNewCard.querySelector('.popup__button');
    popupButton.textContent = 'Сохранение...';
    popupButton.disabled = true;
    addNewCard(cardNameValue, urlValue)
        .then(data => {
            const newCard = createCard({ name: data.name, link: data.link, likes: data.likes, ownerId: data.owner._id, _id: data._id, currentUserId}, addLike, deleteLike, deleteCardFromApi, handleImageClick);
            const container = document.querySelector('.content');
            const cardsContainer = container.querySelector('.places__list');
            cardsContainer.prepend(newCard);
            closeModal(popupTypeNewCard);
            formElementNewPlace.reset();
            clearValidation(formElementNewPlace, validationConfig);
        })
        .catch(err => {
            console.log(err);
            popupButton.disabled = false; 
        })
        .finally(() => {
            popupButton.textContent = 'Сохранить';
            popupButton.disabled = false;
        });
});

function handleImageClick(event) {
    const image = event.target;
    const imageSrc = image.src; 
    const imageAlt = image.alt; 
  
    popupImage.src = imageSrc;
    popupImage.alt = imageAlt;
    popupCaption.textContent = imageAlt; 
  
    openModal(popupTypeImage);
};

enableValidation(validationConfig);

const formElementNewAvatar = document.forms['new-avatar'];
const popupTypeNewAvatar = document.querySelector('.popup_type_new-avatar');
const avatarImage = document.querySelector('.profile__image');

avatarImage.addEventListener('click', () => {
    openModal(popupTypeNewAvatar);
    clearValidation(formElementNewAvatar, validationConfig);
});

formElementNewAvatar.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const avatarUrl = document.getElementById('avatar-input').value;
    if (avatarUrl) {
        const popupTypeNewAvatar = document.querySelector('.popup_type_new-avatar');
        const popupButton = popupTypeNewAvatar.querySelector('.popup__button');
        popupButton.textContent = 'Сохранение...';
        popupButton.disabled = true;
        updateUserAvatar(avatarUrl)
            .then((data) => {
                document.querySelector('.profile__avatar').src = data.avatar;
                closeModal(popupTypeNewAvatar);
                formElementNewAvatar.reset();
            })
            .catch(err => {
                console.error('Ошибка при обновлении аватара:', err);
                popupButton.disabled = false;
            })
            .finally(() => {
                popupButton.textContent = 'Сохранить';
                popupButton.disabled = false;
            });
    } else {
        console.error('Введите корректный URL изображения');
    }
});
