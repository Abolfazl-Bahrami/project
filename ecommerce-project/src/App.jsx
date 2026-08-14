import HomePage from "./pages/HomePage.jsx";
import { Routes , Route } from "react-router";

function App() {
  return (
      <Routes>
        <Route index element={HomePage} />
      </Routes>
  )
}

export default App
