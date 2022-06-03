import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Inicio from "./components/Inicio";
import Login from "./components/Login";
import Admin from "./components/Admin";
import Navbar from "./components/Navbar";
import { auth } from "./firebase";

function App() {
  const [firebaseUser, setFirebaseUser] = React.useState(false);
  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        setFirebaseUser(user);
      } else {
        setFirebaseUser(null);
      }
    });
  }, []);
  return firebaseUser !== false ? (
    <Router>
      <div className="container">
        <Navbar firebaseUser={firebaseUser}/>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="login" element={<Login />} />
          <Route path="admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  ) : (
    <h1>Cargando...</h1>
  );
}

export default App;
