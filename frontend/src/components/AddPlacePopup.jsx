import PopupWithForm from "./PopupWithForm";
import { useRef } from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoadBtn }) {
	const placeRef = useRef(null);
	const linkRef = useRef(null);

	function handleSubmit() {
		onAddPlace(
			{
				link: linkRef.current.value,
				name: placeRef.current.value,
			},
			placeRef,
			linkRef
		);
	}
	function handleClose() {
		onClose();
		linkRef.current.value = "";
		placeRef.current.value = "";
	}
	return (
		<PopupWithForm
			name='cards'
			title='Новое место'
			buttonText='Создать'
			isOpen={isOpen}
			onClose={handleClose}
			onSubmit={handleSubmit}
			isLoadBtn={isLoadBtn}>
			<input
				id='input-place'
				type='text'
				name='name'
				ref={placeRef}
				required
				className='popup__value popup__value_field_place'
				placeholder='Place'
			/>
			<span id='input-place-error' className='popup__error'></span>
			<input
				id='input-url'
				type='url'
				ref={linkRef}
				name='link'
				required
				className='popup__value popup__value_field_url'
				placeholder='URL'
			/>
			<span id='input-url-error' className='popup__error'></span>
		</PopupWithForm>
	);
}

export default AddPlacePopup;
