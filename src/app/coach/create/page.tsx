"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase";


export default function CreateCoach() {
  const supabase = createClient();
  const router = useRouter();

  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      setErrorMsg("No hay sesión activa");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("coaches").insert({
      profile_id: session.user.id,
      nickname,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    router.push("/coach/" + nickname);
  };

  return (
    <div className="p-10 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Crear perfil de entrenador</h1>

      {errorMsg && <p className="text-red-600 mb-2">{errorMsg}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Nickname"
          className="border px-3 py-2 w-full"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-black text-white rounded w-full"
        >
          {loading ? "Creando..." : "Crear entrenador"}
        </button>
      </form>
    </div>
  );
}