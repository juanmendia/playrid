"use client";
import { useState } from "react";
import { supabase } from "@/app/lib/supabase";

export default function CreatePlayer() {
  const [nickname, setNickname] = useState("");
  const [position, setPosition] = useState("");

  const handleSubmit = async () => {
    const user = supabase.auth.getSession(); // o lo traes desde next-auth
    if (!user) return alert("No estás logueado");

    const { data, error } = await supabase.from("players").insert([{
      profile_id: user.user.id,
      nickname,
      position
    }]).select();

    if (error) return alert(error.message);
    alert("Jugador creado!");
  };

  return (
    <div className="p-10 space-y-4">
      <input value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="Nickname" />
      <input value={position} onChange={(e) => setPosition(e.target.value)} placeholder="Posición" />
      <button onClick={handleSubmit}>Crear Jugador</button>
    </div>
  );
}
