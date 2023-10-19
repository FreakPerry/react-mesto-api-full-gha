import { useContext, useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';
import useFormAndValidation from '../hooks/useFormAndValidation';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation({
    name: '',
    about: ''
  });

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ name: values.name, about: values.about });
  }

  useEffect(() => {
    if (currentUser.name && currentUser.about) {
      setValues({
        name: currentUser.name,
        about: currentUser.about
      });
    }
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, currentUser]);

  return (
    <PopupWithForm
      title={'Редактировать профиль'}
      name={'profile'}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={'Сохранить'}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <fieldset className="popup__form-fieldset">
        <input
          type="text"
          className="popup__form-input"
          placeholder="Ваше Имя"
          name="name"
          minLength="2"
          maxLength="40"
          required
          value={values.name || ''}
          onChange={handleChange}
        />
        <span className="error-message name-error">{errors.name}</span>
        <input
          type="text"
          className="popup__form-input"
          placeholder="Место Работы"
          name="about"
          minLength="2"
          maxLength="200"
          required
          value={values.about || ''}
          onChange={handleChange}
        />
        <span className="error-message about-error">{errors.about}</span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
