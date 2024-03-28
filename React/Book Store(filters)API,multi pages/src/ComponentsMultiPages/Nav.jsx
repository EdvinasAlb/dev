import Link from "./Link";

export default function Nav() {
  return (
    <nav className="navbar">
      <a className="navbar-brand" href="#home">
        Home
      </a>
      <div className="navbar-nav">
        <Link href="#animals">Animals</Link>
        <Link href="#about">About</Link>
        <Link href="#contacts">Contact</Link>
      </div>
    </nav>
  );
}
