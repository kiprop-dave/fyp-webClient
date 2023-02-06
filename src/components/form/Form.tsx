import { useState } from "react";
import { Login, loginSchema } from "../../types/types";
import { z } from "zod";
import styles from "./form.module.css";
import api from "../../api/axios";
import { AxiosError } from "axios";
import useAuth from "../../context/authContext";
import { useNavigate } from "react-router-dom";

function Form() {
  const [loginData, setLoginData] = useState<Login>({
    email: "",
    password: "",
  });
  const auth = useAuth();
  if (!auth) return null;
  const { setToken } = auth;
  const navigate = useNavigate();

  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isError) setIsError(false);
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      loginSchema.parse(loginData);
      const response = await api.post(
        "/admin/login",
        JSON.stringify(loginData),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: false,
        }
      );
      setToken(response.data.token);
      navigate("/readings", { replace: true });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setIsError(true);
        setErrorMessage("Invalid email or password");
      } else if (error instanceof AxiosError) {
        setIsError(true);
        setErrorMessage(error.response?.data.message);
      }
    }
  };

  return (
    <div className={styles.container}>
      {isError && <div className={styles.error}>{errorMessage}</div>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={loginData.email}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleChange}
          className={styles.input}
        />
        <button type="submit" className={styles.submit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
