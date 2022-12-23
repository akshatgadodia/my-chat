import { useState, useCallback, useRef /*useEffect*/ } from "react";
import { Alert } from "react-native";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const activeHttpRequests = useRef([]);

  const showAlert = errorMessage => {
    setIsLoading(false);
    Alert.alert("Some Error Occurred!", errorMessage, [
      { text: "OK", onPress: () => setError(null) }
    ]);
  };

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      setError(null);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal
        });
        // console.log(response)
        const responseData = await response.json();
        activeHttpRequests.current = activeHttpRequests.current.filter(
          reqCtrl => reqCtrl !== httpAbortCtrl
        );
        // console.log(responseData);
        if (!responseData.success) {
          //console.log(responseData)
          throw new Error(responseData.error);
        }
        setIsLoading(false);
        return responseData;
      } catch (err) {
        console.log(err.message);
        // console.log(err.message)
        setError(err.message);
        showAlert(err.message);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  // useEffect(() => {
  //   return () => {
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //     activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
  //   };
  // }, []);

  return { isLoading, error, sendRequest, clearError };
};
