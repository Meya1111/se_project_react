import "./ItemCard.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked =
    !!currentUser && Array.isArray(item.likes)
      ? item.likes.some((id) => id === currentUser._id)
      : false;
  const handleLike = () => {
    if (!currentUser) return;
    onCardLike({ id: item._id, isLiked });
  };
  if (!item || Object.keys(item).length === 0) return null;
  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
      {currentUser && (
        <button
          className={`card__like-button ${
            isLiked ? "card__like-button_active" : ""
          }`}
          onClick={handleLike}
          aria-label={isLiked ? "Unlike" : "Like"}
        />
      )}
    </li>
  );
}
export default ItemCard;
