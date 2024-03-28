import { useContext } from "react";
import { Home } from "../../Contexts/Home";
import Nav from "../../Components/Nav";

export default function Layout() {
  const { home } = useContext(Home);

  if (!home) {
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
            <h1>Home</h1>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-4 mt-4">
            <div className="card">
              <div className="card-header">
                <h3>Stats</h3>
              </div>
              <div className="card-body">
                {home.map((item) => (
                  <div className="row" key={item.name}>
                    <div className="col-6">
                      <h5>{item.name}</h5>
                      {item.name === "Authors" && <p>{item.count} authors</p>}
                      {item.name === "Books" && (
                        <>
                          <p>{item.count} books</p>
                          <p>The biggest book {item.stats}p.</p>
                        </>
                      )}
                      {item.name === "Heroes" && (
                        <>
                          <p>{item.count} heroes</p>
                          <p>Good heroes: {item.stats}</p>
                          <p>Bad heroes: {item.count - item.stats}</p>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
