import { useState } from "react";
import Form from "../../components/form/Form";
import styles from "./Login.module.css";

/*
 * This is the login page
 * The user can enter their email and password to login
 *The server will respond with a JWT token and MQTT credentials
 *The user is then redirected to the readings page
 */
function Login() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>Sign in</header>
        <p className={styles.description}>Sign in to your account</p>
        <Form />
      </div>
      <img src="/Vectors.png" alt="background pic" className={styles.bgPic} />
    </main>
  );
}

export default Login;
