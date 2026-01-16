"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

export default function CreatePlayerPage() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [position, setPosition] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("players").insert({
      nickname,
      position,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Crear perfil de jugador</h1>

      <input
        placeholder="Nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        required
      />

      <input
        placeholder="Posición"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      />

      <button disabled={loading}>
        {loading ? "Creando..." : "Crear jugador"}
      </button>
    </form>
  );
}
