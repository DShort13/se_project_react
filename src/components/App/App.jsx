import { Routes, Route, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import ModalWithConfirm from "../ModalWithConfirm/ModalWithConfirm";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import {
  addClothingItems,
  deleteClothingItems,
  getClothingItems,
} from "../../utils/api";
import { logIn, register } from "../../utils/auth";
import { setToken, getToken } from "../../utils/token";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleLogIn = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    logIn(email, password)
      .then((data) => {
        if (data.jwt) {
          setToken(data.jwt);
          setCurrentUser(data.user);
          setIsLoggedIn(true);
          navigate("/profile");
          closeActiveModal();
        }
      })
      .catch(console.error);
  };

  const handleRegistration = (data) => {
    register(data)
      .then(() => {
        handleLogIn({ email: data.email, password: data.password });
      })
      .catch(console.error);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleOpenDelete = () => {
    setActiveModal("confirm");
  };

  const handleAddItem = ({ name, imageUrl, weather }) => {
    addClothingItems({ name, imageUrl, weather })
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleDeleteItem = () => {
    deleteClothingItems(selectedCard)
      .then(() => {
        const updatedClothingItems = clothingItems.filter(
          (item) => item._id !== selectedCard._id
        );
        setClothingItems(updatedClothingItems);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getClothingItems()
      .then((data) => {
        setClothingItems(data.data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header onCardClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  weatherTemp={weatherData.temp}
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    handleAddClick={handleAddClick}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </div>
        <div>
          <RegisterModal
            onClose={closeActiveModal}
            isOpen={activeModal === "signup"}
            onRegister={handleRegistration}
          />
          <LoginModal
            onClose={closeActiveModal}
            isOpen={activeModal === "signin"}
          />
          <AddItemModal
            onClose={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            onAddItem={handleAddItem}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onOpenDelete={handleOpenDelete}
          />
          <ModalWithConfirm
            activeModal={activeModal}
            onClose={closeActiveModal}
            onDeleteItem={handleDeleteItem}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
