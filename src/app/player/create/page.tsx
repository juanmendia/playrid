"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/app/lib/database.types"; // tu tipo generado en supabase.ts

export default function CreatePlayer() {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const [nickname, setNickname] = useState("");
  const [position, setPosition] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    // Obtener sesión
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session) {
      setErrorMsg("No hay sesión activa. Por favor inicia sesión.");
      setLoading(false);
      return;
    }

    // Insertar jugador en Supabase
    const { data, error: insertError } = await supabase
      .from("players")
      .insert([{
        profile_id: session.user.id,
        nickname,
        position
      }])
      .select();

    if (insertError) {
      setErrorMsg(insertError.message);
      setLoading(false);
      return;
    }

    // Redirigir a la página del jugador o dashboard
    router.push("/player/" + data[0].id);
  };

  return (
    <div className="p-10 space-y-4">
      <h1 className="text-2xl font-bold">Crear mi perfil de jugador</h1>

      {errorMsg && <p className="text-red-600">{errorMsg}</p>}

      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <label className="block font-semibold">Nickname</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="border px-2 py-1 w-full"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Posición</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="border px-2 py-1 w-full"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-black text-white rounded"
        >
          {loading ? "Creando..." : "Crear jugador"}
        </button>
      </form>
    </div>
  );
}
