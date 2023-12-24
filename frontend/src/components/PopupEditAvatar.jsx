import PopupWithForm from "./PopupWithForm";
import React from "react";
import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function PopupEditAvatar({ isOpen, onClose, onUpdateAvatar, isLoadBtn }) {
  
  const { currentUser } = useContext(CurrentUserContext);
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    setAvatar("");
  }, [currentUser]);

  function handleSubmit() {
    onUpdateAvatar(
      {
        avatar
      },
    );
  }

  function handleClose() {
    onClose();
    setAvatar('');
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      isLoadBtn={isLoadBtn}
    >
      <input
        id="input-url-avatar"
        type="url"
        name="link"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        required
        className="popup__value popup__value_field_url"
        placeholder="URL"
      />
      <span id="input-url-avatar-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default PopupEditAvatar;
