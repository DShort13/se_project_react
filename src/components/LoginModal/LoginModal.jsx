import { useEffect, useState } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { Link } from "react-router-dom";

function LoginModal({ onClose, onLogIn, isOpen, handleRegisterModal }) {
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      return;
    }

    onLogIn({ email: data.email, password: data.password }, resetForm);
  };

  const resetForm = () => {
    setData({ email: "", password: "" });
  };

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <div>
      <ModalWithForm
        title="Log In"
        buttonText="Log In"
        onClose={onClose}
        isOpen={isOpen}
        onSubmit={handleSubmit}
      >
        <label htmlFor="login-email" className="modal__label">
          Email *{" "}
          <input
            id="login-email"
            name="login-email"
            value={data.email}
            type="email"
            className="modal__input"
            placeholder="Email"
            required
            minLength="1"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="login-password" className="modal__label">
          Password *{" "}
          <input
            id="login-password"
            name="login-password"
            value={data.password}
            type="password"
            className="modal__input"
            placeholder="Password"
            required
            minLength="1"
            onChange={handleChange}
          />
        </label>
        <div className="login__button-container">
          <button type="button" className="login__link">
            Log In
          </button>
        </div>
        <div className="login__signup">
          <Link
            to="register"
            onClick={handleRegisterModal}
            className="login__signup-link"
          >
            or Sign Up
          </Link>
        </div>
      </ModalWithForm>
    </div>
  );
}

export default LoginModal;
