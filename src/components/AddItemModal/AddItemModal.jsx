import { useForm } from "../../contexts/hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
    const defaultValues = {
     name: "",
     link: "",
     weatherType: "",   
    };
   const { values, handleChange } = useForm(defaultValues);

  function handleSubmit(evt) {
   evt.preventDefault(); 
   onAddItem(values);
  }

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
            name="name"
            type="text"
            className="modal__input modal__input_type_card-name"
            id="clothing-name"
            placeholder="Name"
            required
            min="1"
            maxLength="30"
            value={values.name}
            onChange={handleChange}
          />
          <span className="modal__error" id="place-name-error" />
        </label>
        <label className="modal__label">
          Image{" "}
          <input
            type="url"
            name="link"
            className="modal__input modal__input_type_url"
            id="clothing-link"
            placeholder="Image URL"
            required
            value={values.link}
            onChange={handleChange}
          />
        </label>
        <fieldset className="modal__fieldset modal__fieldset_type_radio">
          <legend className="modal__legend">Select the weather type:</legend>
        <div>
            <input 
            className="modal__radio-button"
            id="choiceHot"
             type="radio" 
             name="weatherType" 
             value="hot" 
             onChange={handleChange}
              /> 
          <label htmlFor="choiceHot" className="modal__label modal__label_type_radio">  
            Hot
          </label>
          </div>
          <div>
          <input 
         className="modal__radio-button" 
         id="choiceWarm" 
         type="radio"
         name="weatherType"
         value="warm"
         onChange={handleChange}
         />
          <label htmlFor="choiceWarm" className="modal__label modal__label_type_radio">
            Warm
          </label>
          </div>
          <div>
          <input 
          className="modal__radio-button"
           id="choiceCold"
           type="radio"
           name="weatherType" 
           value="cold"
           onChange={handleChange} 
           /> 
          <label htmlFor="choiceCold" className="modal__label modal__label_type_radio">
            cold
          </label>
          </div>
        </fieldset>
      </ModalWithForm>
    );
  };
  
  export default AddItemModal;