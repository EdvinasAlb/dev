import { useContext } from "react";
import Nav from "../../Components/Nav";
import Create from "./Create";
import Delete from "./Delete";
import Edit from "./Edit";
import { Heroes } from "../../Contexts/Heroes";
import List from "./List";

export default function Layout() {
  const { editHero, deleteHero, heroes } = useContext(Heroes);

  if (null === heroes) {
    return (
      <div className="container-loader">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      <Nav />

      <div className="container text-center">
        <div className="row">
          <div className="col-4 mt-4">
            <h1>Heroes</h1>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-4 mt-4">
            <Create />
          </div>
          <div className="col-8 mt-4">
            <List />
          </div>
        </div>
      </div>
      {editHero && <Edit />}
      {deleteHero && <Delete />}
    </>
  );
}
