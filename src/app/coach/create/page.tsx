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
      user_id: session.user.id,
      nickname,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    router.push("/onboarding");
  };

  return (
    <div className="p-10 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Crear perfil de entrenador</h1>

      {errorMsg && <p className="text-red-600">{errorMsg}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="border w-full px-3 py-2"
          placeholder="Nickname (ej: JuanCoach)"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Creando..." : "Crear entrenador"}
        </button>
      </form>
    </div>
  );
}
