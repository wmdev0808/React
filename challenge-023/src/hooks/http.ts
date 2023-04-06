import { useReducer, useCallback } from "react";

import { IngredientInput } from "../components/Ingredients/IngredientForm";
import { Response } from "../components/Ingredients/Search";

type RequestIdentifierType = "ADD_INGREDIENT" | "REMOVE_INGREDIENT" | null;

type ResponseDataType = { name: string } | Response<IngredientInput> | null;

type ExtraDataType = string | IngredientInput | null;

type HttpState = {
  loading: boolean;
  error: string | null;
  data?: ResponseDataType;
  extra?: ExtraDataType;
  identifier?: RequestIdentifierType;
};

type HttpAction =
  | {
      type: "SEND";
      identifier?: RequestIdentifierType;
    }
  | { type: "RESPONSE"; responseData: ResponseDataType; extra?: ExtraDataType }
  | { type: "ERROR"; errorMessage: string }
  | { type: "CLEAR" };

const initialState: HttpState = {
  loading: false,
  error: null,
  data: null,
  extra: null,
  identifier: null,
};

const httpReducer = (curHttpState: HttpState, action: HttpAction) => {
  switch (action.type) {
    case "SEND":
      return {
        loading: true,
        error: null,
        data: null,
        extra: null,
        identifier: action.identifier,
      };
    case "RESPONSE":
      return {
        ...curHttpState,
        loading: false,
        data: action.responseData,
        extra: action.extra,
      };
    case "ERROR":
      return { loading: false, error: action.errorMessage };
    case "CLEAR":
      return initialState;
    default:
      throw new Error("Should not be reached!");
  }
};

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

  const clear = useCallback(() => dispatchHttp({ type: "CLEAR" }), []);

  const sendRequest = useCallback(
    (
      url: string,
      method: string,
      body?: string | null,
      reqExtra?: string | IngredientInput,
      reqIdentifier?: RequestIdentifierType
    ) => {
      dispatchHttp({ type: "SEND", identifier: reqIdentifier });
      fetch(url, {
        method: method,
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((responseData: ResponseDataType) => {
          dispatchHttp({
            type: "RESPONSE",
            responseData: responseData,
            extra: reqExtra,
          });
        })
        .catch((_error) => {
          dispatchHttp({
            type: "ERROR",
            errorMessage: "Something went wrong!",
          });
        });
    },
    []
  );

  return {
    isLoading: httpState.loading,
    data: httpState.data,
    error: httpState.error,
    sendRequest: sendRequest,
    reqExtra: httpState.extra,
    reqIdentifer: httpState.identifier,
    clear: clear,
  };
};

export default useHttp;
