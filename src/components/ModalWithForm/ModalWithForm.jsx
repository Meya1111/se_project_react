import "./ModalWithForm.css";
import closeIcon from "../../assets/closebtn2.png";
import { useState } from "react";

function ModalWithForm({
  title,
  name,
  isOpen,
  onClose,
  onSubmit,
  children,
  buttonText = "Save",
}) {
  if (!isOpen) return null;
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button onClick={onClose} type="button" className="modal__close">
          {" "}
          <img src={closeIcon} alt="Close" />{" "}
        </button>
        <h3 className="modal__title">{title}</h3>
        <form className="modal__form" name={name} onSubmit={onSubmit}>
          {children}
          <button type="submit" className="button modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
