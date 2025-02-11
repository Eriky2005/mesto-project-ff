function openModal(popupElement) {
    popupElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupEsc);
    popupElement.addEventListener('click',closePopupOverlay);
}

function closeModal(popupElement) {
    popupElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupEsc);
    popupElement.classList.add('popup_is-animated');
    popupElement.removeEventListener('click',closePopupOverlay);
}

function closePopupEsc(evt){
    if (evt.key === 'Escape'){
        const popup = document.querySelector('.popup_is-opened')
        closeModal(popup);
    };
};

function closePopupOverlay(evt){
    const popup = evt.currentTarget;
    if (evt.target === popup){
        closeModal(popup);
    }
};

export {openModal, closeModal}; 