import React, { useCallback, useEffect, useState } from "react";
import { Branch } from "../../types/Branch";
import { Settlement } from "../../types/Settlement";
import { getSettlements, getWarehouses } from "../../utils/axios";
import { BranchesListForm } from "../BranchesListForm";
import { Loader } from "../Loader";

import "./BranchesList.css";

export const BranchesList = React.memo(() => {
  const [query, setQuery] = useState<string>("");
  const [settlements, setSettlements] = useState<Settlement[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [settlementRef, setSettlementRef] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const handlerOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettlementRef("");
    setQuery(event.target.value);
    const selectedSettlement = settlements.find((settlement) => {
      return createSettlementString(settlement) === event.target.value;
    });

    if (selectedSettlement) {
      setQuery(createSettlementString(selectedSettlement));
      setSettlementRef(selectedSettlement.Ref);
    }
  };

  useEffect(() => {
    if (query.length > 2) {
      getSettlements(query)
        .then((response) => {
          setSettlements(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, [query]);

  useEffect(() => {
    if (settlementRef) {
      setIsLoading(true);
      getWarehouses(settlementRef)
        .then((response) => {
          const branches = response.data.filter(
            (el: { CategoryOfWarehouse: string }) =>
              el.CategoryOfWarehouse === "Branch"
          );

          setBranches(branches);
        })
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false));
    }
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
        <p className="message">
          В обраному населенному пункті відсутні відділення Нової Пошти
        </p>
      )}
    </section>
  );
});
