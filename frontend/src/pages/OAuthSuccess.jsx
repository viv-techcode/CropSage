import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const decodeJwtPayload = (token) => {
  const payload = token.split(".")[1];
  const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
  const json = decodeURIComponent(
    atob(base64)
      .split("")
      .map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, "0")}`)
      .join("")
  );

  return JSON.parse(json);
};

function OAuthSuccess() {
  const [message, setMessage] = useState("Completing Google sign-in...");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setMessage("Missing authentication token.");
      return;
    }

    try {
      const payload = decodeJwtPayload(token);

      login(
        {
          id: payload.id,
          email: payload.email,
          name: payload.email,
        },
        token
      );

      navigate("/dashboard", { replace: true });
    } catch (error) {
      setMessage("Could not complete Google sign-in.");
    }
  }, [login, navigate, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-center text-white">
      <div className="max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl">
        <h1 className="text-2xl font-bold">Google sign-in</h1>
        <p className="mt-3 text-sm text-slate-300">{message}</p>
      </div>
    </div>
  );
}

export default OAuthSuccess;