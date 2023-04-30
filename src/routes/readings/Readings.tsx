import { useEffect, useState } from "react";
import styles from "./Readings.module.css";
import ChartComponent from "../../components/Chart/Chart";
import useMqtt from "../../hooks/UseMqtt";
import useData from "../../hooks/UseData";
import Loader from "../../components/Loader/Loader";
import { Toast } from "../../components/Toast/Toast";

/*
 * This is the readings page
 *There is a toast component that will show up if an alert message is published
 * There are 4 charts on this page
 * 2 charts for the live feed from the hatchery
 * 2 charts for the readings from the past 24 hours
 * The charts are rendered using the ChartComponent
 */
function Readings() {
  const mqtt = useMqtt();
  if (!mqtt) return null;
  const { mqttData, messageAllert } = mqtt;
  const { avianTemp, avianHum, reptTemp, reptHum, labels } = mqttData;
  const data = useData();
  const {
    avianTemperature,
    avianHumidity,
    reptileTemperature,
    reptileHumidity,
    storedLabels,
    isError,
    errorMessage,
    isLoading,
  } = data;

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!messageAllert.length) return;
    setShowToast(true);
    const id = setTimeout(() => {
      setShowToast(false);
    }, 8000);
    return () => clearTimeout(id);
  }, [messageAllert]);

  return (
    <>
      {showToast && <Toast message={messageAllert} />}
      {isLoading ? (
        <Loader />
      ) : (
        <main className={styles.page}>
          <header className={styles.header}>
            <h1>ANALYTICS</h1>
          </header>
          <div className={styles.container}>
            <h2 className={styles.title}>LIVE FEED FROM HATCHERY</h2>
            <div className={styles.live}>
              <ChartComponent
                label="AVIAN UNIT"
                labels={labels}
                temperature={avianTemp}
                humidity={avianHum}
                isError={isError}
                errorMessage={errorMessage}
              />
              <ChartComponent
                label="REPTILIAN UNIT"
                labels={labels}
                temperature={reptTemp}
                humidity={reptHum}
                isError={isError}
                errorMessage={errorMessage}
              />
            </div>
            <h2 className={styles.title}>READINGS FROM THE PAST 24 HOURS</h2>
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
      )}
    </>
  );
}

export default Readings;
