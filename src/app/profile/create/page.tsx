"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase";

export default function CreateProfile() {
  const supabase = createClient();
  const router = useRouter();
  const [username, setUsername] = useState("");

  const handleSubmit = async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      alert("No hay sesión activa");
      return;
    }

    const { error } = await supabase.from("profiles").insert({
      id: session.user.id,
      username
    });

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/onboarding");
  };

  return (
    <div className="p-10 space-y-4">
      <h1 className="text-2xl font-bold">Elegí tu nombre público</h1>

      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="ej: Pelamendia"
        className="border px-3 py-2 w-full"
      />

      <button
        onClick={handleSubmit}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Crear perfil
      </button>
    </div>
  );
}
