function ImagePopup({ card, onClose }) {
	return (
		<div className={`popup popup_edit_img ${card.state ? "popup_opened" : ""}`}>
			<figure className='popup__figure popup__figure-image'>
				<button
					aria-label='Кнопка закрытия попапа'
					type='button'
					className='popup__button-close'
					onClick={onClose}></button>
				<img src={card.link} alt={card.name} className='popup__img' />
				<figcaption className='popup__caption'>{card.name}</figcaption>
			</figure>
		</div>
	);
}

export default ImagePopup;
