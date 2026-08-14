import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./hooks/useAuth.jsx";

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
