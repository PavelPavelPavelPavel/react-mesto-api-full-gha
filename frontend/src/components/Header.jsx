import Logo from "../images/logo.svg";
import { Link } from "react-router-dom";

function Header({ linkText, toLink, userEmail, loggedIn, onSignOut }) {
	function exitProfile() {
		if (loggedIn) {
			onSignOut();
		}
	}

	return (
		<header className='header'>
			<img src={Logo} alt='Место' className='header__logo' />
			<div className='header__wrapper'>
				<p className='header__email'>{loggedIn ? userEmail : ""}</p>
				<button className='button-return' onClick={exitProfile}>
					<Link
						to={toLink}
						className='button-return button-return_place_header'>
						{linkText}
					</Link>
				</button>
			</div>
		</header>
	);
}

export default Header;
