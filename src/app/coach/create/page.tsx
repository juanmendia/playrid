"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

export default function CreateCoachPage() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.from("coachs").insert({
      nickname,
    });

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Crear perfil de entrenador</h1>

      <input
        placeholder="Nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        required
      />

      <button>Crear entrenador</button>
    </form>
  );
}
