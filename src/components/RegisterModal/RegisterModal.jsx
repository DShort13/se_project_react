import { useEffect, useState } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { Link } from "react-router-dom";

function RegisterModal({ onClose, onRegister, isOpen }) {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(
      {
        email: data.email,
        password: data.password,
        name: data.name,
        avatar: data.avatar,
      },
      resetForm
    );
  };

  const resetForm = () => {
    setData({ email: "", password: "", name: "", avatar: "" });
  };

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <div>
      <ModalWithForm
        title="Sign up"
        buttonText="Sign Up"
        onClose={onClose}
        isOpen={isOpen}
        onSubmit={handleSubmit}
      >
        <label htmlFor="register-email" className="modal__label">
          Email *{" "}
          <input
            id="register-email"
            name="register-email"
            value={data.email}
            type="email"
            className="modal__input"
            placeholder="Email"
            required
            minLength="1"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="register-password" className="modal__label">
          Password *{" "}
          <input
            id="register-password"
            name="register-password"
            value={data.password}
            type="password"
            className="modal__input"
            placeholder="Password"
            required
            minLength="1"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="name" className="modal__label">
          Name *{" "}
          <input
            id="name"
            name="name"
            value={data.name}
            type="text"
            className="modal__input"
            placeholder="Name"
            required
            minLength="1"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="avatar" className="modal__label">
          Avatar URL *{" "}
          <input
            id="avatar"
            name="avatar"
            value={data.avatar}
            type="text"
            className="modal__input"
            placeholder="Avatar URL"
            required
            minLength="1"
            onChange={handleChange}
          />
        </label>
        <div className="register__button-container">
          <button type="button" className="register__link">
            Sign Up
          </button>
        </div>
        <div className="register__signin">
          <Link to="login" className="register__login-link">
            or Log In
          </Link>
        </div>
      </ModalWithForm>
    </div>
  );
}

export default RegisterModal;
