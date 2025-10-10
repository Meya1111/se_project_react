import "./ItemModal.css";
import closeIcon from "../../assets/closebtn2.png";

function ItemModal({ onClose, item, isOpen }) {
return (
 <div className={isOpen ? "modal modal_opened" : "modal"}>
   <div className="modal__content modal__content_type_image">
   <button
       onClick={onClose}
       type="button"
        className="modal__close">
       <img src={closeIcon} alt="Close" />
      </button>
      <img src={item.link} alt={item.name} className="modal__image" />
      <div className="modal__footer">
        <h2 className="modal__caption">{item.name}</h2>
        <p className="modal__weather">Weather: {item.weather}</p>
      </div>
    </div> 
 </div>
);
}

export default ItemModal;