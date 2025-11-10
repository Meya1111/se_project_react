import "./ItemModal.css";
import closeIcon from "../../assets/closebtn2.png";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemModal({ onClose, item, isOpen, onDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const handleDelete = (e) => {
    e.preventDefault();
    onDelete(item._id);
  };

  if (!item) return null;
  const ownerId =
    typeof item?.owner === "string" ? item.owner : item?.owner?._id;
  const isOwn = Boolean(currentUser?._id) && currentUser._id === ownerId;

  return (
    <div className={isOpen ? "modal modal_opened" : "modal"}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIcon} alt="Close" />
        </button>
        <img
          src={item.imageUrl || item.link}
          alt={item.name}
          className="modal__image"
        />
        <div className="modal__footer">
          <h2 className="modal__caption">{item.name}</h2>
          <p className="modal__weather">Weather: {item.weather}</p>
          {isOwn && (
            <button
              type="button"
              className="modal__delete-btn"
              onClick={handleDelete}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
