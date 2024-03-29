import { useState } from "react";
import { Login, loginSchema, authResponseSchema } from "../../types/types";
import { z } from "zod";
import styles from "./form.module.css";
import api from "../../api/axios";
import { AxiosError } from "axios";
import useAuth from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

/*
 * This is the form component
 * It is used to display the login form
 *The form is validated using zod
 *The user can login using their email and password
 *The handleSubmit function is called when the form is submitted
 *The handleSubmit function will send a POST request to the server
 *The handleSubmit function will then set the credentials in the authentication context
 *The handleSubmit function will then redirect the user to the readings page
 */
function Form() {
  const [loginData, setLoginData] = useState<Login>({
    email: "",
    password: "",
  });
  const auth = useAuth();
  const { setCredentials } = auth;
  const navigate = useNavigate();

  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isError) setIsError(false);
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      loginSchema.parse(loginData);
      setIsLoading(true);
      const response = await api.post("/admin/login", JSON.stringify(loginData), {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const credentials = authResponseSchema.parse(response.data);
      setCredentials(credentials);
      setIsLoading(false);
      navigate("/readings", { replace: true });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setIsError(true);
        setErrorMessage("Invalid email or password");
        setIsLoading(false);
      } else if (error instanceof AxiosError) {
        setIsError(true);
        setErrorMessage(error.response?.data.message);
        setIsLoading(false);
      } else {
        setIsError(true);
        setErrorMessage("Something went wrong");
        setIsLoading(false);
      }
    }
  };

  return (
    <div className={styles.container}>
      {isLoading && <Loader />}
      {isError && <div className={styles.error}>{errorMessage}</div>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={loginData.email}
          onChange={handleChange}
          className={styles.input}
        />
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleChange}
          className={styles.input}
        />
        <button type="submit" className={styles.submit} aria-label="sign in">
          Sign in
        </button>
      </form>
    </div>
  );
}

export default Form;
