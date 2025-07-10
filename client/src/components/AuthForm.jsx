import { useState } from "react";

function AuthForm({ onSubmit }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, isRegistering);
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded shadow bg-white">
      <h2 className="text-xl font-bold mb-4">
        {isRegistering ? "Register" : "Login"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {isRegistering && (
          <input
            type="text"
            placeholder="Username"
            required
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            className="w-full border px-3 py-2 rounded"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {isRegistering ? "Register" : "Login"}
        </button>
      </form>
      <p className="mt-4 text-sm text-center">
        {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          className="text-blue-600 underline"
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering ? "Login" : "Register"}
        </button>
      </p>
    </div>
  );
}

export default AuthForm;