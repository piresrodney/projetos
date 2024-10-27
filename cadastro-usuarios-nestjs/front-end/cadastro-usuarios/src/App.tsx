import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NovoUsuario from "./pages/NovoUsuario/NovoUsuario";
import TodosUsuarios from "./pages/TodosUsuarios/TodosUsuarios";
import AtualizaUsuario from "./pages/AtualizaUsuario/AtualizaUsuario";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodosUsuarios />} />
        <Route path="/novousuario" element={<NovoUsuario />} />
        <Route path="/atualizausuario/:id" element={<AtualizaUsuario />} />
      </Routes>
    </Router>
  );
}

export default App;
