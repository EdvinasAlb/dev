import { AuthorsProvider } from "../../Contexts/Authors";
import Layout from "./Layout";

export default function Index() {
  return (
    <AuthorsProvider>
      <Layout />
    </AuthorsProvider>
  );
}
