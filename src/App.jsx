import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Carrinho from "./pages/Carrinho.jsx";
import ConfirmarPagamentos from "./pages/ConfirmarPagamentos.jsx";
import Home from "./pages/Home.jsx";
import Lanches from "./pages/Lanches.jsx";
import Login from "./pages/Login.jsx";
import MeusPedidos from "./pages/MeusPedidos.jsx";
import Perifericos from "./pages/Perifericos.jsx";
import Register from "./pages/Register.jsx";
import { authenticateUser } from "./services/api.js";

function ProtectedRoute({ user, children }) {
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

function AdminRoute({ user, children }) {
  return user?.role === "admin" ? children : <Navigate to="/" replace />;
}

function AppRoutes() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  function handleLogin(username, password) {
    const authenticatedUser = authenticateUser(username, password);
    if (!authenticatedUser) return false;

    const { username: name, email, role } = authenticatedUser;
    setUser({ username: name, email, role });
    return true;
  }

  function handleLogout() {
    setUser(null);
    navigate("/login", { replace: true });
  }

  return <>
    <Navbar
      username={user?.username || "Visitante"}
      email={user?.email}
      role={user?.role || "user"}
      onLogout={handleLogout}
    />
    <main id="conteudo" className="page">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lanches" element={<Lanches />} />
        <Route path="/perifericos" element={<Perifericos />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/carrinho" element={
          <ProtectedRoute user={user}>
            <Carrinho username={user?.username} />
          </ProtectedRoute>
        } />
        <Route path="/meus-pedidos" element={
          <ProtectedRoute user={user}>
            <MeusPedidos username={user?.username} role={user?.role} />
          </ProtectedRoute>
        } />
        <Route path="/admin/pagamentos" element={
          <ProtectedRoute user={user}>
            <AdminRoute user={user}>
              <ConfirmarPagamentos />
            </AdminRoute>
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  </>;
}

export default function App() {
  return <BrowserRouter><AppRoutes /></BrowserRouter>;
}
