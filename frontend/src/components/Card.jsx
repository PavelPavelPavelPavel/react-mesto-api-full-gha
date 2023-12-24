import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({
	id,
	userCardId,
	link,
	name,
	likes,
	onCardLike,
	onCardDisLike,
	onConfirmPopup,
}) {
	const { currentUser, handleCardClick } = useContext(CurrentUserContext);
	const isOwn = userCardId === currentUser._id;
	const isLiked = likes.some((i) => i === currentUser._id);
	const cardLikeButtonClassName = `element__button-like ${
		isLiked && "element__button-like_active"
	}`;

	function handleLikeClick() {
		onCardLike(id, isLiked);
	}

	function handleDisLikeClick() {
		console.log(isLiked);
		onCardDisLike(id, isLiked);
	}

	function handleDeleteClick() {
		onConfirmPopup(id);
	}

	return (
		<article className='element'>
			{isOwn && (
				<button
					type='button'
					className='element__button-delete'
					onClick={handleDeleteClick}
				/>
			)}
			<button
				className='element__link'
				onClick={() => handleCardClick({ link, name })}>
				<img src={link} alt={name} className='element__img' />
			</button>
			<div className='element__wrapper'>
				<h2 className='element__title'>{name}</h2>
				<div className='element__wrapper-btn'>
					<button
						type='button'
						className={cardLikeButtonClassName}
						onClick={!isLiked ? handleLikeClick : handleDisLikeClick}/>
					<div className='element__like-counter'>{likes.length}</div>
				</div>
			</div>
		</article>
	);
}

export default Card;
