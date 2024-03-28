import { AuthProvider } from "./Contexts/Auth";
import { RouterProvider } from "./Contexts/Router";

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider></RouterProvider>
    </AuthProvider>
  );
}
