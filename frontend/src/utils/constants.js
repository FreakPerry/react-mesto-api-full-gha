export const configFormSelector = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__save-button',
  inputErrorClass: 'popup__form-input_type_error'
};

// profile info

export const profileElement = document.querySelector('.profile');
export const profileInfoElement = profileElement.querySelector('.profile__info');
export const profileNameElement = profileInfoElement.querySelector('.profile__name');
export const profileAboutElement = profileInfoElement.querySelector('.profile__about');
export const profileAvatarElement = document.querySelector('.profile__avatar-img');

// profile buttons

export const editProfileButton = profileInfoElement.querySelector('.profile__edit-button');
export const addCardButton = profileElement.querySelector('.profile__add-button');
export const avatarButton = document.querySelector('.profile__avatar');

// popups

export const popupEdit = document.querySelector('#popup-edit-profile');
export const popupAdd = document.querySelector('#popup-add-card');
export const popupImage = document.querySelector('#popup-card-image');
export const popupAvatar = document.querySelector('#popup-avatar');
export const popupConfirm = document.querySelector('#popup-confirm');

// forms

export const editFormElement = document.forms['editProfilePopup'];
export const addFormElement = document.forms['addCardPopup'];
export const avatarFormElement = document.forms['avatarPopup'];

// cards

export const cardContainer = document.querySelector('.cards');
