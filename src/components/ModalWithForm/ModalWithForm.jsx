import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  // buttonText,
  onClose,
  isOpen,
  onSubmit,
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close" />
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          {/* <button type="submit" className="modal__submit">
            {buttonText}
            {children}
          </button> */}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
