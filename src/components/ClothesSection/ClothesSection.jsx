import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ClothesSection({ clothingItems, onCardClick, onAddClick,onCardLike={onCardLike} }) {
  const currentUser = useContext(CurrentUserContext);

  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  return (
    <div className="">
      <div className="clothes-section__header">
        <p>Your items</p>
        <button className="clothes-add__btn" onClick={onAddClick}>
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {userItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} onCardLike={onCardLike}/>
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
