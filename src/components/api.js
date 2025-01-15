const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-30',
    headers: {
        authorization: '5a5d79f0-fc72-4c09-93bb-cb54cd269ec7',
        'Content-Type': 'application/json'
    }
}

const getUserData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
    })
        .then((res) => {
            if (res.ok){
                return res.json();
            }
            return Promise.reject(`Что-то пошло не так: ${res.status}`);
        });
};

const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
};

const updateUser = (name, about) => {
    const popupTypeEdit = document.querySelector('.popup_type_edit');
    const popupButton = popupTypeEdit.querySelector('.popup__button');
    popupButton.textContent = 'Сохранение...';
    popupButton.disabled = true;
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
        .then(res => {
            if (res.ok){
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .finally(() => {
            popupButton.textContent = 'Сохранить';
            popupButton.disabled = false;
        });
};

const addNewCard = (name, link) => {
    const popupTypeNewCard = document.querySelector('.popup_type_new-card');
    const popupButton = popupTypeNewCard.querySelector('.popup__button');
    popupButton.textContent = 'Сохранение...';
    popupButton.disabled = true;
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
        .then(res => {
            if (res.ok){
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .finally(() => {
            popupButton.textContent = 'Сохранить';
            popupButton.disabled = false;
        });
};

const deleteCardFromApi = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
};

const addLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
};

const deleteLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
};

const updateUserAvatar = (avatar) => {
    const popupTypeNewAvatar = document.querySelector('.popup_type_new-avatar');
    const popupButton = popupTypeNewAvatar.querySelector('.popup__button');
    popupButton.textContent = 'Сохранение...';
    popupButton.disabled = true;
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({ avatar })
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .finally(() => {
            popupButton.textContent = 'Сохранить';
            popupButton.disabled = false;
        });
};

export {getUserData, getInitialCards, updateUser, addNewCard, deleteCardFromApi, addLike, deleteLike, updateUserAvatar};