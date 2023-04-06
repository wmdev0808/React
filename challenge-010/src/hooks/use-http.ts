import { useCallback, useState } from "react";

enum RequestHeaderProps {
  "Content-Type" = "Content-Type",
}

type RequestHeaders = {
  [prop in keyof typeof RequestHeaderProps]?: string;
};

export interface RequestConfig {
  url: string;
  method?: "GET" | "POST";
  headers?: RequestHeaders;
  body?: { text: string } | null;
}

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const sendRequest = useCallback(
    async (requestConfig: RequestConfig, applyData: (data: any) => void) => {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method ?? "GET",
          headers: requestConfig.headers ?? {},
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        });

        if (!response.ok) {
          throw new Error("Request failed!");
        }

        const data = await response.json();
        applyData(data);
      } catch (e) {
        setError((e as Error).message || "Something went wrong!");
      }
      setIsLoading(false);
    },
    []
  );

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
