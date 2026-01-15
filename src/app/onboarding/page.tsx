"use client";

import { useRouter } from "next/navigation";

export default function Onboarding() {
  const router = useRouter();

  return (
    <div className="p-10 space-y-4">
      <h1 className="text-2xl font-bold">¿Quién sos en PlayrID?</h1>

      <button onClick={() => router.push("/player/create")}>
        Soy Jugador
      </button>

      <button onClick={() => router.push("/coach/create")}>
        Soy Entrenador
      </button>
    </div>
  );
}
