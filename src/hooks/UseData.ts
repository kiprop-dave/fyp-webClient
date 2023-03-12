import { useState, useEffect } from "react";
import { Reading, readingsSchema } from "../types/types";
import { z } from "zod";
import api from "../api/axios";
import { AxiosError } from "axios";
import useAuth from "../context/authContext";

/*
 *This hook is used to fetch previous readings from the database and store them in state.
 *The web token is sent in the header of the request to authorize the request.
 *It also returns the data in a format that can be used by the chart component.
 */
function useData() {
  const auth = useAuth();
  const { credentials } = auth;

  const [readings, setReadings] = useState<Reading>({ readings: [] });
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getReadings();
  }, []);

  async function getReadings() {
    try {
      if (!credentials) {
        setIsError(true);
        setErrorMessage("No credentials found");
        return;
      } else {
        setIsLoading(true);
        let res = await api.get("/api/readings/day", {
          headers: {
            Authorization: `Bearer ${credentials.token}`,
          },
        });
        const data = readingsSchema.parse(res.data);
        setReadings(data);
        setIsLoading(false);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setIsError(true);
        setErrorMessage(error.response?.data.message);
      } else if (error instanceof z.ZodError) {
        setIsError(true);
        setErrorMessage(error.message);
      }
    }
  }

  const avianTemperature = readings.readings.map((reading) => reading.avianTemp);
  const avianHumidity = readings.readings.map((reading) => reading.avianHum);
  const reptileTemperature = readings.readings.map((reading) => reading.reptTemp);
  const reptileHumidity = readings.readings.map((reading) => reading.reptHum);
  const storedLabels = readings.readings.map((reading) =>
    new Date(reading._id).toLocaleTimeString()
  );

  return {
    avianTemperature,
    avianHumidity,
    reptileTemperature,
    reptileHumidity,
    storedLabels,
    isError,
    errorMessage,
    isLoading,
  };
}

export default useData;
