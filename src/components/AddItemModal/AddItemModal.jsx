import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, handleSubmit, onClose }) => {
      
    return (
      <ModalWithForm 
       title="New garment"
       name="new-card"
       isOpen={isOpen}
       onClose={onClose}
       onSubmit={handleSubmit}
       > 
    <label htmlFor="name" className="modal__label">
          Name{" "}
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image{" "}
          <input
            type="text"
            className="modal__input"
            id="imageUrl"
            placeholder="Image URL"
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input id="hot" type="radio" name="weather" value="hot" className="modal__radio-input" /> Hot
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input id="warm" type="radio" name="weather" value="warm" className="modal__radio-input" /> Warm
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input id="cold" value="cold" type="radio" name="weather" className="modal__radio-input" /> cold
          </label>
        </fieldset>
      </ModalWithForm>
    );
  };
  
  export default AddItemModal;