"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

export default function CreateCoach() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    // 1️⃣ Usuario logueado
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setErrorMsg("No hay sesión activa");
      setLoading(false);
      return;
    }

    // 2️⃣ Insertar entrenador
    const { error } = await supabase.from("coaches").insert({
      profile_id: user.id,
      nickname,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    // 3️⃣ Redirigir
    router.push("/coach");
  };

  return (
    <div className="p-10 space-y-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Crear perfil de entrenador</h1>

      {errorMsg && <p className="text-red-600">{errorMsg}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="border w-full px-3 py-2"
          placeholder="Nombre público"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded"
        >
          {loading ? "Creando..." : "Crear entrenador"}
        </button>
      </form>
    </div>
  );
}
