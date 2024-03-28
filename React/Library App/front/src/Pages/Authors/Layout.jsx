import { useContext } from "react";
import Nav from "../../Components/Nav";
import Create from "./Create";
import Delete from "./Delete";
import Edit from "./Edit";
import List from "./List";
import { Authors } from "../../Contexts/Authors";

export default function Layout() {
  const { editAuthor, authors } = useContext(Authors);

  if (null === authors) {
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
            <h1>Author</h1>
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
      <Delete />
      {editAuthor && <Edit />}
    </>
  );
}
