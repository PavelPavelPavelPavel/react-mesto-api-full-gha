import React from "react";
import Card from "./Card";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardLike,
  onCardDisLike,
  onConfirmPopup,
  cards,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar">
            <button className="profile__avatar-btn" onClick={onEditAvatar}>
              <img
                src={`${currentUser.avatar || ""}`}
                alt="Аватар пользователя"
                className="profile__avatar-img"
              />
            </button>
          </div>
          <div className="profile__info-text">
            <h1 className="profile__name">{`${currentUser.name || ""}`}</h1>
            <button
              aria-label="Кнопка редактирования профиля"
              type="button"
              className="profile__button"
              onClick={onEditProfile}
            ></button>
            <p className="profile__work">{`${currentUser.about || ""}`}</p>
          </div>
        </div>
        <button
          aria-label="Кнопка добавления фото"
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {cards.map((card) => {
          return (
            <Card
              key={card._id}
              id={card._id}
              link={card.link}
              name={card.name}
              likes={card.likes}
              userCardId={card.owner}
              onCardLike={onCardLike}
              onCardDisLike={onCardDisLike}
              onConfirmPopup={onConfirmPopup}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
