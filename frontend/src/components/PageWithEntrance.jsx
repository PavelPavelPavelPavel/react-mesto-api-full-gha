import { Link } from "react-router-dom";
import { useState } from "react";

function PageWithEntrance({
	title,
	buttonText,
	linkTo,
	capchaBtntext,
	name,
	email,
	password,
	onSubmit,
}) {
	const [userEmail, setUserEmail] = useState("");
	const [userPass, setUserPass] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		onSubmit({
			email: userEmail,
			password: userPass,
		});
	}

	return (
		<>
			<form
				className={`popup__form popup__form_edit_sign popup__form_edit_${name}`}
				onSubmit={handleSubmit}
				name={`${name}`}>
				<h2 className='popup__title-sign'>{title}</h2>
				<div className={`popup__input-route popup__input-${name}`}>
					<input
						id={`input-${email}`}
						value={userEmail}
						onChange={(e) => setUserEmail(e.target.value)}
						type='email'
						name={email}
						required
						className='popup__value popup__value_type_sign'
						placeholder='Email'
					/>

					<input
						id={`input-${password}`}
						value={userPass}
						onChange={(e) => setUserPass(e.target.value)}
						type='password'
						name={password}
						required
						className='popup__value popup__value_type_sign'
						placeholder='Пароль'
					/>
				</div>
				<button
					type='submit'
					className={`popup__button popup__button_theme_dark`}>
					{buttonText}
				</button>
				<button className='button-return'>
					<Link to={linkTo} className='button-return button-return_place_popup'>
						{capchaBtntext}
					</Link>
				</button>
			</form>
		</>
	);
}
export default PageWithEntrance;
