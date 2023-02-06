import { useState, useEffect } from "react";
import { Reading, readingsSchema } from "../../types/types";
import { z } from "zod";
import api from "../../api/axios";
import { AxiosError } from "axios";
import useAuth from "../../context/authContext";
import styles from "./Readings.module.css";
import ChartComponent from "../../components/Chart/Chart";

function Readings() {
  const auth = useAuth();
  if (!auth) return null;
  const { token } = auth;

  const [readings, setReadings] = useState<Reading>({
    temperatureReadings: [],
    humidityReadings: [],
  });
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

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

  useEffect(() => {
    getReadings();
  }, []);

  async function getReadings() {
    try {
      const response = await api.get("/api/readings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      readingsSchema.parse(response.data);
      setReadings(response.data);
      setIsLoaded(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        setIsError(true);
        setErrorMessage(error.response?.data.message);
      } else if (error instanceof z.ZodError) {
        setIsError(true);
        setErrorMessage("Invalid readings");
      }
    }
  }
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1>ANALYTICS</h1>
      </header>
      <div className={styles.container}>
        <h2>LIVE FEED FROM HATCHERY</h2>
        <div className={styles.live}></div>
        <h2>READINGS FROM PAST THE 24 HOURS</h2>
        <div className={styles.previous}>
          <ChartComponent
            label="AVIAN UNIT"
            labels={storedLabels}
            temperature={avianTemperature}
            humidity={avianHumidity}
            isError={isError}
            errorMessage={errorMessage}
          />
          <ChartComponent
            label="REPTILIAN UNIT"
            labels={storedLabels}
            temperature={reptileTemperature}
            humidity={reptileHumidity}
            isError={isError}
            errorMessage={errorMessage}
          />
        </div>
      </div>
    </main>
  );
}

export default Readings;
