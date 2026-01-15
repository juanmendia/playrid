import PlayerCard from "@/app/components/PlayerCard";


type PlayerProfile = {
    name: string;
    position: string;
    birthYear: number;
    clubs: string[];
    rating: number;
  };
  
  const mockPlayer: PlayerProfile = {
    name: "Juan Mendia",
    position: "Volante",
    birthYear: 1987,
    clubs: [
      "Club A (Infantiles)",
      "Club B (Juveniles)",
      "Club C (Primera)"
    ],
    rating: 78,
  };
  
  export default function PlayerPage() {
    return (
      <main className="min-h-screen bg-zinc-900 text-white flex justify-center items-center gap-12 p-8">
        <PlayerCard
          name={mockPlayer.name}
          role={mockPlayer.position}
          rating={mockPlayer.rating}
        />

        <div className="max-w-md">
          <h2 className="text-xl font-semibold mb-2">Historial</h2>
          <ul className="list-disc list-inside text-gray-300">
            {mockPlayer.clubs.map((club, i) => (
              <li key={i}>{club}</li>
            ))}
          </ul>
        </div>
      </main>

    );
  }
  