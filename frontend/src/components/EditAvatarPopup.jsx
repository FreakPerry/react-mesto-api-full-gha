import PopupWithForm from './PopupWithForm';
import { useEffect } from 'react';
import useFormAndValidation from '../hooks/useFormAndValidation';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation({
    avatar: ''
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      onUpdateAvatar({
        avatar: values.avatar
      });
    }
  }

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      title={'Обновить аватар'}
      name={'avatar'}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={'Подтвердить'}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <fieldset className="popup__form-fieldset">
        <input
          type="url"
          className="popup__form-input"
          placeholder="Ссылка на аватар"
          name="avatar"
          required
          value={values.avatar || ''}
          onChange={handleChange}
        />
        <span className="error-message avatar-error">{errors.avatar}</span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
