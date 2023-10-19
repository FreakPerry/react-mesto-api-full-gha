import { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import useFormAndValidation from '../hooks/useFormAndValidation.js';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation({
    name: '',
    link: ''
  });

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: values.name,
      link: values.link
    });
  }

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      title={'Новое место'}
      name={'card'}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={'Добавить'}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <fieldset className="popup__form-fieldset">
        <input
          type="text"
          className="popup__form-input"
          placeholder="Название"
          name="name"
          minLength="2"
          maxLength="30"
          required
          value={values.name || ''}
          onChange={handleChange}
        />
        <span className="error-message name-error">{errors.name}</span>
        <input
          type="url"
          className="popup__form-input"
          placeholder="Ссылка на картинку"
          name="link"
          required
          value={values.link || ''}
          onChange={handleChange}
        />
        <span className={'error-message link-error'}>{errors.link}</span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
