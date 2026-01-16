"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase";

export default function CreateProfile() {
  const supabase = createClient();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      setErrorMsg("No hay sesión activa");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("profiles").insert({
      id: session.user.id,
      username
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="p-10 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Elegí tu usuario</h1>

      {errorMsg && <p className="text-red-600 mb-2">{errorMsg}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value.toLowerCase())}
          placeholder="pelamendia"
          className="border px-3 py-2 w-full"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Guardando..." : "Crear perfil"}
        </button>
      </form>
    </div>
  );
}
