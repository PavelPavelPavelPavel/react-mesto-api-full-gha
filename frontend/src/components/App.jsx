import { useState, useEffect } from "react";
import "../index.css";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import PopupEditAvatar from "./PopupEditAvatar";
import PopupConfirmDeleteCard from "./PopupConfirmDeleteCard";
import ProtectedRoute from "./ProtectedRoute";
import AddPlacePopup from "./AddPlacePopup";
import PopupEditProfile from "./PopupEditProfile";
import InfoTooltip from "./InfoTooltip";
import ImagePopup from "./ImagePopup";
import Login from "./Login";
import Register from "./Register";
import api from "../utils/Api";
import auth from "../utils/Auth";
import success from "../images/success.svg";
import reject from "../images/reject.svg";
//import { useResize } from "../utils/ResizeWidth";

function App() {
	const location = useLocation();
	const navigate = useNavigate();
	//const resize = useResize();
	const [cardId, setCardId] = useState("");
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [isConfirmDeleteCardPopupOpen, setIsConfirmDeleteCardPopupOpen] =
		useState(false);
	const [isInfoTooltip, setIsInfoTooltip] = useState(false, "");
	const [selectedCard, setSelectedCard] = useState({
		state: false,
		name: " ",
		link: " ",
	});
	const [linkText, setLinkText] = useState("");
	const [toLink, setTolink] = useState("");
	const [currentUser, setCurrentUser] = useState({name: "", about: "", avatar: ""});
	const [cards, setCards] = useState([]);
	const [btnTextLoad, setBtnTextLoad] = useState("");
	const [loggedIn, setLoggedIn] = useState(false);
	const [infoTextTooltip, setInfoTextTooltip] = useState("");
	const [infoImgTooltip, setInfoImgTooltip] = useState();
	const [roadAfterClose, setRoadAfterClose] = useState(false);
	const [userEmail, setUserEmail] = useState("");

	
	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token && !null) {
				auth
					.getInfo()
					.then(() => setLoggedIn(true))
					.catch(err => console.log(err));
		} else {
			setLoggedIn(false);
		}
	}, []);

	
	useEffect(() => {
		if (loggedIn) {
			 Promise.all([api.getInfo(), api.getInfoCards()])
				.then(([user, card]) => {
						setCurrentUser(user);
						setCards(card);	
						setUserEmail(user.email)	
						navigate("/")
				})
				.catch(err => {
					navigate("/sign-in");
					setUserEmail("");
					console.log(err);
				});
		} 
	}, [loggedIn, navigate]);

	useEffect(() => {
		let pathName = location.pathname;
		if (pathName === "/sign-in") {
			setTolink("/sign-up");
			setLinkText("Регистрация");
		} else if (pathName === "/sign-up") {
			setTolink("/sign-in");
			setLinkText("Вход");
		} else if (pathName === "/") {
			setTolink("/sign-in");
			setLinkText("Выйти");
		}
	}, [location.pathname]);

	function handleUpdateUser({ name, about }) {
		setBtnTextLoad("Сохранение...");
		api
			.setUserData(name, about)
			.then((res) => {
				setCurrentUser(res);
				setIsEditProfilePopupOpen(false);
			})

			.catch((err) => console.log(err))
			.finally(() => {
				setBtnTextLoad("");
			});
	}

	function handleUpdateAvatar({ avatar }) {
		setBtnTextLoad("Сохранение...");
		api
			.setUserAvatar(avatar)
			.then((res) => {
				setCurrentUser(res);
				setIsEditAvatarPopupOpen(false);
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setBtnTextLoad("");
			});
	}

	function handleAddPlaceSubmit(newCard, placeRef, linkRef) {
		setBtnTextLoad("Создаём...");
		api
			.setNewCard(newCard.link, newCard.name)
			.then((res) => {
				setCards([res, ...cards]);
				setIsAddPlacePopupOpen(false);
				placeRef.current.value = "";
				linkRef.current.value = "";
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setBtnTextLoad("");
			});
	}

	function handleApiLikeRequest(id, updateCard) {
		setCards((state) => state.map((c) => (c._id === id ? updateCard : c)));
	}

	function handleCardLike(id, isLiked) {
		api
			.addLikeToCard(id, !isLiked)
			.then((newCard) => {
				handleApiLikeRequest(id, newCard);
			})
			.catch((err) => console.log(err));
	}

	function handleCardDislike(id, isLiked) {
		api
			.deleteResponseLike(id, !isLiked)
			.then((newCard) => {
				handleApiLikeRequest(id, newCard);
			})
			.catch((err) => console.log(err));
	}

	function handleCardDelete(id) {
		setBtnTextLoad("Удаляем...");
		api
			.deleteResponse(id)
			.then(() => {
				const res = cards.filter((card) => {
					console.log(`FROM API DELETE ${id}`)
					return card._id !== id;
				});
				setCards(res);
				setIsConfirmDeleteCardPopupOpen(false);
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setBtnTextLoad("");
			});
	}

	function handleCardClick({ name, link }) {
		setSelectedCard({
			state: true,
			name: `${name}`,
			link: `${link}`,
		});
	}

	

	function closeAllPopups() {
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setIsConfirmDeleteCardPopupOpen(false);
		setIsInfoTooltip(false);
		setSelectedCard({
			state: false,
			name: " ",
			link: " ",
		});
	}
	function handleConfirmDeletePopupOpen(id) {
		setIsConfirmDeleteCardPopupOpen(true);
		setCardId(id);
	}

	function handleSignUp({ email, password }) {
		auth
			.authentication(email, password)
			.then(() => {
				setIsInfoTooltip(true);
				setInfoImgTooltip(success);
				setInfoTextTooltip("Вы успешно зарегистрировались!");
				setRoadAfterClose(true);
			})
			.catch(() => {
				setIsInfoTooltip(true);
				setInfoImgTooltip(reject);
				setInfoTextTooltip("Что-то пошло не так! Попробуйте ещё раз.");
				setRoadAfterClose(false);
			});
	}

	function handleSignIn({ email, password }) {
		auth
			.authorization({password, email})
			.then((res) => {
				localStorage.setItem("token", res.token);
				setLoggedIn(true);
				setUserEmail(res.email);
				navigate("/");
			})
			.catch(() => {
				setIsInfoTooltip(true);
				setInfoImgTooltip(reject);
				setInfoTextTooltip("Что-то пошло не так! Попробуйте ещё раз.");
				setRoadAfterClose(true);
			});
	}

	function handleExitProfile() {
		 localStorage.removeItem("token");
		 setLoggedIn(false);
	}

	return (
		<>
			<CurrentUserContext.Provider
				value={{
					currentUser,
					cards,
					handleCardClick,
				}}>
				<div className='App'>
					<div className='main'>
						<div className='page'>
							<Header
								linkText={linkText}
								toLink={toLink}
								userEmail={userEmail}
								loggedIn={loggedIn}
								onSignOut={handleExitProfile}
							/>
							<Routes>
								<Route
									path='/'
									element={
										<ProtectedRoute loggedIn={loggedIn}>
											<Main
												onAddPlace={setIsAddPlacePopupOpen}
												onEditAvatar={setIsEditAvatarPopupOpen}
												onEditProfile={setIsEditProfilePopupOpen}
												onCardLike={handleCardLike}
												onCardDisLike={handleCardDislike}
												cards={cards}
												onConfirmPopup={handleConfirmDeletePopupOpen}
											/>
											<Footer />
										</ProtectedRoute>
									}
								/>
								<Route
									path='/sign-in'
									element={<Login onLogin={handleSignIn} />}
								/>
								<Route
									path='/sign-up'
									element={<Register onUserSubmit={handleSignUp} />}
								/>
							</Routes>
						</div>
					</div>
					<PopupEditAvatar
						isOpen={isEditAvatarPopupOpen}
						onClose={closeAllPopups}
						onUpdateAvatar={handleUpdateAvatar}
						isLoadBtn={btnTextLoad}
					/>
					<AddPlacePopup
						isOpen={isAddPlacePopupOpen}
						onClose={closeAllPopups}
						onAddPlace={handleAddPlaceSubmit}
						isLoadBtn={btnTextLoad}
					/>
					<PopupEditProfile
						isOpen={isEditProfilePopupOpen}
						onClose={closeAllPopups}
						onUpdateUser={handleUpdateUser}
						isLoadBtn={btnTextLoad}
					/>
					<PopupConfirmDeleteCard
						isOpen={isConfirmDeleteCardPopupOpen}
						onClose={closeAllPopups}
						onCardDelete={handleCardDelete}
						id={cardId}
						isLoadBtn={btnTextLoad}
					/>
					<ImagePopup card={selectedCard} onClose={closeAllPopups} />
					<InfoTooltip
						isOpen={isInfoTooltip}
						text={infoTextTooltip}
						img={infoImgTooltip}
						onClose={closeAllPopups}
						roadAfterCloseState={roadAfterClose}
					/>
				</div>
			</CurrentUserContext.Provider>
		</>
	);
}

export default App;
