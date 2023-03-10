import { FC } from "react";

export const CheckDeliveryStatus: FC = () => {
  console.log('CheckDeliveryStatus render');
  
  return (
    <form>
      <input type="number" />
      <button>Отримати статус ТТН</button>
    </form>
  );
}