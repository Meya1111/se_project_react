import { useForm } from "../../contexts/hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ isOpen, onClose, onRegister, onLoginClick }) {
  const defaultValues = { name: "", avatar: "", email: "", password: "" };
  const { values, handleChange } = useForm(defaultValues);

  function handleRegisterSubmit(e) {
    e.preventDefault();
    if (onRegister) {
      onRegister(values);
    }
  }

  function handleOpenLoginModal() {
    if (onClose) {
      onClose();
    }
    if (onLoginClick) {
      onLoginClick();
    }
  }

  return (
    <ModalWithForm
    title="Sign up"
      name="register"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleRegisterSubmit}
      buttonText="Sign Up"
      altText="or Log In"
      onAltClick={handleOpenLoginModal}
    >
      <label className="modal__label">
        Email*
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
        Password*
        <input
          className="modal__input"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label">
        Name*
        <input
          className="modal__input"
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label">
        Avatar URL*
        <input
          className="modal__input"
          type="url"
          name="avatar"
          value={values.avatar}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
