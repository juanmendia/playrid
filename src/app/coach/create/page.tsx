"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

export default function CreatePlayer() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [position, setPosition] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      setError("No hay sesión activa");
      return;
    }

    const { error } = await supabase.from("players").insert({
      profile_id: session.user.id,
      nickname,
      position,
    });

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Crear perfil de jugador</h1>
      {error && <p>{error}</p>}
      <input value={nickname} onChange={e => setNickname(e.target.value)} />
      <input value={position} onChange={e => setPosition(e.target.value)} />
      <button type="submit">Crear jugador</button>
    </form>
  );
}
