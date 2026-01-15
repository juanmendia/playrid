import { getRarity, getBorderColor } from "../lib/rating";

type Props = {
  name: string;
  role: string;
  rating: number;
};

export default function PlayerCard({ name, role, rating }: Props) {
  const rarity = getRarity(rating);
  const border = getBorderColor(rarity);

  return (
    <div
      className={`w-80 h-96 bg-zinc-900 rounded-2xl border-4 ${border} p-4 flex flex-col justify-between shadow-xl`}
    >
      <div>
        <h2 className="text-2xl font-bold">{name}</h2>
        <p className="text-gray-400">{role}</p>
      </div>

      <div className="flex justify-center items-center text-6xl font-extrabold">
        {rating}
      </div>

      <div className="text-center uppercase tracking-wide text-sm">
        {rarity}
      </div>
    </div>
  );
}
