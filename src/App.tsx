import classNames from "classnames";
import { FC } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import "./App.css";
import { BranchesList } from "./components/BranchesList/BranchesList";
import { CheckDeliveryStatus } from "./components/CheckDeliveryStatus/CheckDeliveryStatus";

export const App: FC = () => {
  console.log('App render');
  
  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar__menu">
          <NavLink
            to="/"
            className={({ isActive }) =>
              classNames('navbar__item', { 'navbar__item--status--is-active': isActive })
            }
          >
            Перевірити ТТН
          </NavLink>

          <NavLink
            to="branches"
            className={({ isActive }) =>
            classNames('navbar__item', { 'navbar__item--status--is-active': isActive })
            }
          >
            Список відділень
          </NavLink>
        </div>
      </nav>

      <div className="section">
        <Routes>
          <Route path="/" element={<CheckDeliveryStatus />} />
          <Route path="branches" element={<BranchesList />} />
          <Route path="*" element={<div className="message">Page not found</div>} />
        </Routes>
      </div>
    </div>
  );
};
