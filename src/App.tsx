import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Main from './pages/main';
import Auth from './pages/auth';
import { createTheme, ThemeProvider } from "@mui/material";
import Catalog from "./pages/catalog";
import Basket from "./pages/basket";
import Dashboard from "./pages/dashboard";
import Flower from "./pages/flower";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Cormorant Garamond"
    ].join(','),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/flower/:id" element={<Flower />} />
          <Route path="*" element={<Main />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
