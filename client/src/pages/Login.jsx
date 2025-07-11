import AuthForm from "../components/AuthForm";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleAuth = async (formData, isRegistering) => {
    const url = `http://localhost:5000/api/auth/${
      isRegistering ? "register" : "login"
    }`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        login({ username: data.username, token: data.token, id: data.id }); // includes id
        navigate("/");
      } else {
        alert(data.message || "Authentication failed");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return <AuthForm onSubmit={handleAuth} />;
}

export default Login;