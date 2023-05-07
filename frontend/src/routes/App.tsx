import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }

    axios.get("http://localhost:3003/", {
      headers: { Authorization: `Bearer ${token}` },
    }).then(({ data }) => {
      console.log(data);
    }).catch((err) => console.log(err));
  }, []);

  return (
    <div className="h-screen flex justify-center items-center">
      <h1>usuario logado</h1>
      <div></div>
    </div>
  );
}
