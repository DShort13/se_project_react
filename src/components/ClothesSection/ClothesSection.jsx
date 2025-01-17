import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ onCardClick, clothingItems, handleAddClick }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="clothes-section">
      <div className="clothes-section__text">
        <p>Your Items</p>
        <button
          onClick={handleAddClick}
          type="button"
          className={`clothes-section__btn`}
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__list">
        {clothingItems.map((item) => {
          const isOwner = item.owner === currentUser._id;
          return (
            isOwner && (
              <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
            )
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
