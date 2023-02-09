import { useState, useEffect } from "react";
import { Reading, readingsSchema } from "../types/types";
import { z } from "zod";
import api from "../api/axios";
import { AxiosError } from "axios";
import useAuth from "../context/authContext";

function useData() {
  const auth = useAuth();
  if (!auth) return null;
  const { credentials } = auth;

  const [readings, setReadings] = useState<Reading>({
    temperatureReadings: [],
    humidityReadings: [],
  });
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
        let res = await api.get("/api/readings", {
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

  const avianTemperature = readings.temperatureReadings.map(
    (reading) => reading.sensorOne
  );
  const avianHumidity = readings.humidityReadings.map(
    (reading) => reading.sensorOne
  );
  const reptileTemperature = readings.temperatureReadings.map(
    (reading) => reading.sensorTwo
  );
  const reptileHumidity = readings.humidityReadings.map(
    (reading) => reading.sensorTwo
  );
  const storedLabels = readings.temperatureReadings.map((reading) =>
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
