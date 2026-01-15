"use client";

import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <button
        onClick={() => signIn("google")}
        className="px-4 py-2 bg-black text-white rounded"
      >
        Ingresar con Google
      </button>
    );
  }

  return (
    <div className="p-10">
      <p>Bienvenido {session.user?.name}</p>
      <a href="/onboarding" className="underline">
        Crear mi PlayrID
      </a>
    </div>
  );
}
