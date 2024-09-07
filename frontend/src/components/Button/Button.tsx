import { Link, LinkProps } from "react-router-dom";
import "./Button.scss";

type ButtonType =
  LinkProps | React.ButtonHTMLAttributes<HTMLButtonElement>
  & {
    to?: string;
  };

export default function Button({ className, ...props }: ButtonType) {
  if ("to" in props) {
    return <Link className={`button ${className}`} {...(props as LinkProps)} />;
  }

  return (
    <button
      className={`button ${className}`}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    />
  );
}
