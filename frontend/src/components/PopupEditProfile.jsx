import React from "react";
import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function PopupEditProfile({ isOpen, onClose, onUpdateUser, isLoadBtn }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser]);

  function handleSubmit() {
    onUpdateUser({
      name,
      about
    });
  }

  function handleClose() {
    onClose();
    setName(currentUser.name);
    setAbout(currentUser.about);
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      isLoadBtn={isLoadBtn}
    >
      <input
        id="input-name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        name="name"
        required
        className="popup__value popup__value_field_name"
        placeholder="Name"
      />

      <span id="input-name-error" className="popup__error"></span>
      <input
        id="input-job"
        value={about}
        onChange={(e) => setAbout(e.target.value)}
        type="text"
        name="job"
        required
        className="popup__value popup__value_field_work"
        placeholder="About me"
      />
      <span id="input-job-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default PopupEditProfile;
