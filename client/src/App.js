import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import { AuthProvider } from "./contexts/AuthContext";
import Navigation from "./routes/components/Navigation";
import routesConfig from "./routes/config";

function App() {
  return (
    <AuthProvider>
      <CookiesProvider>
        <BrowserRouter>
          <Navigation routes={routesConfig} />
        </BrowserRouter>
      </CookiesProvider>
    </AuthProvider>
  );
}

export default App;
