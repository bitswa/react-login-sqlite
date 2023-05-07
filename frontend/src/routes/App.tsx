import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export default function App() {
  const navigate = useNavigate();

  const [user, setUser] = useState<User>();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }

    axios.get("http://localhost:3003/", {
      headers: { Authorization: `Bearer ${token}` },
    }).then(({ data }) => {
      console.log(data);
      setUser(data);
    }).catch((err) => {
      console.log(err);
      navigate("/login");
    });
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    return navigate("/login");
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div>
        <ul>
          <li>
            nome: {user?.name}
          </li>
          <li>
            email: {user?.email}
          </li>
          <li>
            criado em: {user?.created_at}
          </li>
        </ul>
        <button onClick={handleSignOut}>Sair</button>
      </div>
    </div>
  );
}
