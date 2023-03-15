import classNames from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import { Branch } from "../../types/Branch";
import { Settlement } from "../../types/Settlement";
import { getSettlements, getWarehouses } from "../../utils/fetchRequests";
import { BranchesListForm } from "../BranchesListForm";
import { Loader } from "../Loader";

import "./BranchesList.css";

export const BranchesList = React.memo(() => {
  const [query, setQuery] = useState<string>("");
  const [settlements, setSettlements] = useState<Settlement[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [settlementRef, setSettlementRef] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const createSettlementString = useCallback((settlement: Settlement) => {
    const {
      SettlementTypeDescription,
      Description,
      AreaDescription,
      RegionsDescription,
    } = settlement;
    return SettlementTypeDescription !== "село"
      ? `${SettlementTypeDescription} ${Description}, ${AreaDescription}`
      : `${SettlementTypeDescription} ${Description}, ${RegionsDescription}, ${AreaDescription}`;
  }, []);

  const handlerOnChange = useCallback((
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSettlementRef("");
    setQuery(event.target.value);
    const selectedSettlement = settlements.find((settlement) => {
      return createSettlementString(settlement) === event.target.value;
    });

    if (selectedSettlement) {
      setQuery(createSettlementString(selectedSettlement));
      setSettlementRef(selectedSettlement.Ref);
    }
  },[settlements]);

  useEffect(() => {
    async function fetchSettlements() {
      if (query.length > 2) {
        try {
          const response = await getSettlements(query);
          setSettlements(response.data);
        } catch (error) {
          setIsError(true);
        }
      }
    }
    fetchSettlements();
  }, [query]);

  useEffect(() => {
    async function fetchWarehouses() {
      if (settlementRef) {
        try {
          setIsLoading(true);
          const response = await getWarehouses(settlementRef);
          const branches = response.data.filter(
            (el: { CategoryOfWarehouse: string }) =>
              el.CategoryOfWarehouse === "Branch"
          );
          setBranches(branches);
        } catch (error) {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      }
    }
    fetchWarehouses();
  }, [settlementRef]);
  

  return (
    <section className="branches-list">
      <BranchesListForm
        query={query}
        handlerOnChange={handlerOnChange}
        settlements={settlements}
        createSettlementString={createSettlementString}
      />

      {branches.length > 0 && !isLoading && (
        <>
          <h3 className="branches-list-title">Список відділень:</h3>
          <ul className="list">
            {branches.map((branch) => (
              <li key={branch.Ref} className="list__item">
                {branch.Description}
              </li>
            ))}
          </ul>
        </>
      )}

      {isLoading && <Loader />}

      {branches.length === 0 && settlementRef && !isLoading && (
        <p className={classNames('message', { 'message--error': isError })}>
          {!isError ? (
            'В обраному населенному пункті відсутні відділення Нової Пошти'
          ) : (
            'Помилка завантаження даних з сервера'
          )}
        </p>
      )}
    </section>
  );
});
