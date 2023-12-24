import PopupWithForm from "./PopupWithForm";

function PopupConfirmDeleteCard({
  isOpen,
  onClose,
  onCardDelete,
  id,
  isLoadBtn,
}) {
  function handleSubmit() {
    console.log(`FROM POPUPCONFIRM ${id}`)
    onCardDelete(id);
  }

  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      name="delete-cards"
      title="Вы уверены?"
      buttonText={isLoadBtn || "Да"}
      onSubmit={handleSubmit}
    />
  );
}

export default PopupConfirmDeleteCard;
