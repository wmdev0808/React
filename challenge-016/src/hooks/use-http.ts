import { useCallback, useReducer } from "react";

interface HttpState {
  data: unknown;
  status: "pending" | "completed" | null;
  error: string | null;
}

interface HttpAction {
  type: "SEND" | "SUCCESS" | "ERROR";
  responseData?: unknown;
  errorMessage?: string;
}

function httpReducer(state: HttpState, action: HttpAction): HttpState {
  if (action.type === "SEND") {
    return {
      data: null,
      error: null,
      status: "pending",
    };
  }

  if (action.type === "SUCCESS") {
    return {
      data: action.responseData,
      error: null,
      status: "completed",
    };
  }

  if (action.type === "ERROR") {
    return {
      data: null,
      error: action.errorMessage!,
      status: "completed",
    };
  }

  return state;
}

function useHttp(requestFunction: Function, startWithPending = false) {
  const [httpState, dispatch] = useReducer(httpReducer, {
    status: startWithPending ? "pending" : null,
    data: null,
    error: null,
  });

  const sendRequest = useCallback(
    async function (requestData?: unknown) {
      dispatch({ type: "SEND" });
      try {
        const responseData = await requestFunction(requestData);
        dispatch({ type: "SUCCESS", responseData });
      } catch (error: unknown) {
        dispatch({
          type: "ERROR",
          errorMessage: (error as Error).message || "Something went wrong!",
        });
      }
    },
    [requestFunction]
  );

  return {
    sendRequest,
    ...httpState,
  };
}

export default useHttp;
