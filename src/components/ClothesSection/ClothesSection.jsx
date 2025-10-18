import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ clothingItems, onCardClick, onAddClick }) {
return (
 <div className="clothes-section">
    <div className="clothes-section__header">
      <p>Your items</p>
      <button className="clothes-add__btn" onClick={onAddClick}>+ Add New</button>  
    </div>
    <ul className="clothes-section__items">
        {clothingItems.map((filteredCard) => (
         <ItemCard
         key={filteredCard._id}
          item={filteredCard} 
          onCardClick={onCardClick}
         />
        ))}
        </ul>
     </div>   
    );
}

export default ClothesSection;