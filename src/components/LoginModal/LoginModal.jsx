 import { useForm } from "../../contexts/hooks/useForm";
  import ModalWithForm from "../ModalWithForm/ModalWithForm";

  function LoginModal({ isOpen, onClose, onLogin, onRegisterClick }) {
    const defaultValues = { email: "", password: "" };
    const { values, handleChange } = useForm(defaultValues); // removed setValues

    function handleLoginSubmit(e) {
      e.preventDefault();
     if (onLogin) {
       onLogin(values);
     }
   }

   function handleOpenRegisterModal() {
   if (onClose) {
       onClose();          // close login modal
    }
     if (onRegisterClick) {
     }
   }

  return (
     <ModalWithForm
      title="Log in"
      name="login"
       isOpen={isOpen}
      onClose={onClose}
    onSubmit={handleLoginSubmit}
  buttonText="Log In"          // main button
      altText="or Sign Up"         // text under the main button
      onAltClick={handleOpenRegisterModal} // alt button opens Sign Up
  >
      <label className="modal__label">
        Email
     <input
          className="modal__input"
         type="email"
          name="email"
         value={values.email}
          onChange={handleChange}
           required
        />
      </label>

      <label className="modal__label">
        Password
        <input
           className="modal__input"
          type="password"
          name="password"
        value={values.password}
          onChange={handleChange}
        required
       />
      </label>
    </ModalWithForm>
  );
}

 export default LoginModal;