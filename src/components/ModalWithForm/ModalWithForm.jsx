import "./ModalWithForm.css";
import closeIcon from "../../assets/closebtn2.png";

function ModalWithForm({
  name,
  isOpen,
  onClose,
  onSubmit,
  children,
  buttonText = "Save",
  altText,
  onAltClick,
}) {
  if (!isOpen) return null;
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button onClick={onClose} type="button" className="modal__close">
          {" "}
          <img src={closeIcon} alt="Close" />{" "}
        </button>
        <h3 className="modal__title">Log In</h3>
        <form className="modal__form" name={name} onSubmit={onSubmit}>
          {children}
          <div className="modal__buttons">
            <button type="submit" className="button modal__submit" >
              {buttonText}
            </button>
            {altText && (
              <button
                type="button"
                className="button modal__alt"
                onClick={onAltClick}
              >
                {altText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
