import { BooksProvider } from "../../Contexts/Books";
import Layout from "./Layout";

export default function Index() {
  return (
    <BooksProvider>
      <Layout />
    </BooksProvider>
  );
}
