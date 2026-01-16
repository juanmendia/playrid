"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

export default function CreatePlayer() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [position, setPosition] = useState("");

  const handleSubmit = async () => {
    // Obtener el usuario logueado
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      console.log("No hay sesión activa");
      return;
    }

    const userId = session.user.id;

    const { data, error } = await supabase
      .from("players")
      .insert([{ profile_id: userId, nickname, position }])
      .select();

    if (error) {
      console.error(error);
    } else {
      console.log("Jugador creado:", data);
      router.push("/player/juan");
    }
  };

  return (
    <div className="p-10 space-y-4">
      <h1 className="text-2xl font-bold">Crear Jugador</h1>
      <input
        type="text"
        placeholder="Nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <input
        type="text"
        placeholder="Posición"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      />
      <button onClick={handleSubmit}>Crear Jugador</button>
    </div>
  );
}
