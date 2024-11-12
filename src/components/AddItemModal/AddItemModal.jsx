import { useEffect, useState } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ closeActiveModal, onAddItem, isOpen }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const handleUrlChange = (e) => {
    console.log(e.target.value);
    setImageUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, imageUrl }, resetForm);
  };

  const resetForm = () => {
    setName("");
    setImageUrl("");
  };

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <div>
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        onClose={closeActiveModal}
        isOpen={isOpen}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name" className="modal__label">
          Name{" "}
          <input
            id="name"
            value={name}
            type="text"
            className="modal__input"
            placeholder="Name"
            required
            minLength="1"
            maxLength="30"
            onChange={handleNameChange}
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image{" "}
          <input
            id="imageUrl"
            value={imageUrl}
            type="text"
            className="modal__input"
            placeholder="Image URL"
            required
            minLength="1"
            maxLength="30"
            onChange={handleUrlChange}
          />
        </label>
        <fieldset className="modal__radio-buttons" required>
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input
              id="hot"
              type="radio"
              className="modal__input_type_radio"
              name="weatherType"
              value="hot"
            />
            <span>Hot</span>
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="warm"
              type="radio"
              className="modal__input_type_radio"
              name="weatherType"
              value="warm"
            />
            <span>Warm</span>
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="cold"
              type="radio"
              className="modal__input_type_radio"
              name="weatherType"
              value="cold"
            />
            <span>Cold</span>
          </label>
        </fieldset>
      </ModalWithForm>
    </div>
  );
}

export default AddItemModal;
