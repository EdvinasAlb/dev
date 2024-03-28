import { useContext } from "react";
import { ParameterContext } from "./Layout";
import Nav from "./Nav";
import Link from "./Link";

export default function About() {
  const { params } = useContext(ParameterContext);
  return (
    <>
      <Nav />
      <main>
        <h1>About</h1>
        <h2>Parameter 1:</h2>
        <p style={{ textAlign: "center", fontFamily: "sans-serif" }}>
          Parameter 1 is {params[0]}
        </p>
        <div className="about-param__links">
          <Link href="#about/param-a">About param: a</Link>
          <Link href="#about/param-b">About param: b</Link>
        </div>
      </main>
    </>
  );
}
