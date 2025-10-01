import "./ModalWithForm.css";
import closeIcon from "../../assets/closebtn2.png"
import { useState } from "react";

const ModalWithForm = ({
title,
name,
buttonText = "Save",
onClose,
children,
isOpen,
onSubmit,
}) => (

     <div 
      className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content"> 
      <button onClick={onClose} type="button" className="modal__close"> <img src={closeIcon} alt="Close" /> </button>
     <h3 className="modal__title">{title}</h3>
     <form className="modal__form" name={name} onSubmit={onSubmit}>  
        {children}
      <button 
      type="submit" 
      className="button modal__submit">
       Add garment
      </button>
      </form>
      </div>
     </div>   
);

export default ModalWithForm;