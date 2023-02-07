import styles from "./Readings.module.css";
import ChartComponent from "../../components/Chart/Chart";
import useMqtt from "../../hooks/UseMqtt";
import useData from "../../hooks/UseData";

function Readings() {
  const mqtt = useMqtt();
  if (!mqtt) return null;
  const { avianTemp, avianHum, reptTemp, reptHum, labels } = mqtt;
  const data = useData();
  if (!data) return null;
  const {
    avianTemperature,
    avianHumidity,
    reptileTemperature,
    reptileHumidity,
    storedLabels,
    isError,
    errorMessage,
  } = data;

  return (
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
  );
}

export default Readings;
