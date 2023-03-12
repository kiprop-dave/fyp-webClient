import styles from "./Loader.module.css";

/*
 *This is just a simple loader component
 *It is used to display a loading animation
 *It renders as a fallback for the lazy loading of the components
 *It also renders as the app is waiting for the response from the server
 */
const Loader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loader} />
    </div>
  );
};

export default Loader;
