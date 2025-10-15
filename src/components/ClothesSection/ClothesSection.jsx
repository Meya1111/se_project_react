import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";

function ClothesSection({ clothingItems, onCardClick, onAddClick }) {
return (
 <div className="clothes-section">
    <div>
      <p>Your items</p>
      <button onClick={onAddClick}>+ Add New</button>  
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