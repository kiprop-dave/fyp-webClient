import S from "./Toast.module.css";

type ToastProps = {
  message: string;
};

export function Toast({ message }: ToastProps): JSX.Element {
  return (
    <div className={S.toast_container}>
      <p className={S.toast_message}>{message}</p>
    </div>
  );
}
