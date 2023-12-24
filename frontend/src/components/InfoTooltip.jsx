import { useNavigate } from "react-router-dom";

function InfoTooltip({ isOpen, img, text, onClose, roadAfterCloseState }) {
	const navigate = useNavigate();

	function handleClose() {
		onClose();
		roadAfterCloseState ? navigate("sign-in") : navigate("sign-up");
	}

	return (
		<>
			<div
				className={`popup ${isOpen ? "popup_opened" : ""}
        `}>
				<div className='popup__container'>
					<button
						aria-label='Кнопка закрытия попапа'
						type='button'
						className='popup__button-close'
						onClick={handleClose}></button>
					<div className={`popup__form`}>
						<form className='popup__input-wrapper popup__input-profile'>
							<img className='popup__sign-img' src={img} alt='знак' />
							<p className='popup__sign-text'>{text}</p>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default InfoTooltip;
