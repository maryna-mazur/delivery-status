import { FC } from "react";
import "./CheckDeliveryStatus.css";

export const CheckDeliveryStatus: FC = () => {
  console.log("CheckDeliveryStatus render");

  return (
    <form className="form">
      <input type="number" className="form__input" placeholder="Введіть номер ТТН" />
      <button className="form__button">Отримати статус ТТН</button>
    </form>
  );
};
