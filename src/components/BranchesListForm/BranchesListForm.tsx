import React from "react";
import { FC } from "react";
import { Settlement } from "../../types/Settlement";
import './BranchesListForm.css';

type BranchesListFormProps = {
  query: string,
  handlerOnChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void,
  settlements: Settlement[],
  createSettlementString: (settlement: Settlement) => string,
}

export const BranchesListForm: FC<BranchesListFormProps> = React.memo(({
  query,
  handlerOnChange,
  settlements,
  createSettlementString,
}) => {
  return (
    <div className="branches-list-form">
        <label 
          htmlFor="settlements" 
          className="branches-list-form__label"
        >
          Оберіть населений пункт:
        </label>
        <input
          className="input branches-list-form__input"
          type="text"
          list="settlements"
          value={query}
          onChange={handlerOnChange}
          placeholder="Ведіть назву населеного пункту"
        />
        <datalist 
          id="settlements" 
          className="branches-list-form__datalist"
        >
          {settlements &&
            settlements.map((settlement) => (
              <option
                className="branches-list-form__option"
                key={settlement.Ref}
                value={createSettlementString(settlement)}
              ></option>
            ))}
        </datalist>
      </div>
  );
})