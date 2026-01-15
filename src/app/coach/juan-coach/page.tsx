import PlayerCard from "@/app/components/PlayerCard";


type CoachProfile = {
    name: string;
    role: string;
    experience: string[];
    rating: number;
  };
  
  const mockCoach: CoachProfile = {
    name: "Juan Coach",
    role: "Director Técnico",
    experience: [
      "2018-2020 – Inferiores Club X",
      "2021-Actualidad – Primera Club Y"
    ],
    rating: 85,
  };
  
  export default function CoachPage() {
    return (
      <main className="min-h-screen bg-zinc-900 text-white flex justify-center items-center gap-12 p-8">
        <PlayerCard
          name={mockCoach.name}
          role={mockCoach.role}
          rating={mockCoach.rating}
        />

        <div className="max-w-md">
          <h2 className="text-xl font-semibold mb-2">Experiencia</h2>
          <ul className="list-disc list-inside text-gray-300">
            {mockCoach.experience.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </main>

    );
  }
  