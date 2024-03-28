import { HomeProvider } from "../../Contexts/Home";
import Layout from "./Layout";

export default function Index() {
  return (
    <HomeProvider>
      <Layout />
    </HomeProvider>
  );
}
