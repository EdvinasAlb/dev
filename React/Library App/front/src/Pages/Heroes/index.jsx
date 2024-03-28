import { HeroesProvider } from "../../Contexts/Heroes";
import Layout from "./Layout";

export default function Index() {
  return (
    <HeroesProvider>
      <Layout />
    </HeroesProvider>
  );
}
