import "./Header.scss";

export default function Header({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <header className="header">
      <h1>{title}</h1>
      <div>{children}</div>
    </header>
  );
}
