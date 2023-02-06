import { useState, useEffect } from "react";
import { Reading, readingsSchema } from "../types/types";
import { z } from "zod";
import api from "../api/axios";
import { AxiosError } from "axios";
import useAuth from "../context/authContext";

function useData() {
  const auth = useAuth();
  if (!auth) return null;
  const { token } = auth;

  const [readings, setReadings] = useState<Reading>({
    temperatureReadings: [],
    humidityReadings: [],
  });
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    getReadings();
  }, []);

  async function getReadings() {
    try {
      let res = await api.get("/api/readings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = readingsSchema.parse(res.data);
      setReadings(data);
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
  };
}

export default useData;
