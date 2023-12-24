function PopupWithForm({
  name,
  title,
  buttonText,
  isOpen,
  onClose,
  children,
  onSubmit,
  isLoadBtn,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <>
      <div
        className={`popup popup_edit_${name} ${isOpen ? "popup_opened" : ""}
        `}
      >
        <div className="popup__container">
          <button
            aria-label="Кнопка закрытия попапа"
            type="button"
            className="popup__button-close"
            onClick={onClose}
          ></button>
          <div className={`popup__form popup__form_edit_${name}`}>
            <h2 className="popup__title">{title}</h2>
            <form
              name={`${name}`}
              className="popup__input-wrapper popup__input-profile"
              onSubmit={handleSubmit}
            >
              {children}
              <button
                type="submit"
                className={`popup__button popup__button-${name} popup__button_theme_light` }
              >
                {isLoadBtn || buttonText || "Сохранить"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PopupWithForm;
