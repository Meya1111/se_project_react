import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";

function ClothesSection({ onCardClick }) {
return (
 <div className="clothes-section">
    <div>
      <p>Your items</p>
      <button>+ Add New</button>  
    </div>
    <ul className="clothes-section__items">
        {defaultClothingItems.map((filteredCard) => (
         <ItemCard
         key={filteredCard._id}
          card={filteredCard} 
          onCardClick={onCardClick}
         />
        ))}
        </ul>
     </div>   
    );
}

export default ClothesSection;