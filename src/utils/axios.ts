const url = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

const request = async (options: object) => {
  const response = await fetch(url, options);
  return await response.json();
};

export const getSettlements = (FindByString: string) => {
  return request({
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apiKey,
      modelName: "Address",
      calledMethod: "getSettlements",
      methodProperties: {
        FindByString,
      },
    }),
  });
};

export const getWarehouses = (settlementRef: string) => {  
  return request({
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apiKey,
      modelName: "Address",
      calledMethod: "getWarehouses",
      methodProperties: {
        Language: "UA",
        SettlementRef: settlementRef,
      },
    }),
  });
};
