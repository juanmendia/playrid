export function getRarity(rating: number) {
    if (rating >= 85) return "gold";
    if (rating >= 75) return "silver";
    if (rating >= 60) return "bronze";
    return "base";
  }
  
  export function getBorderColor(rarity: string) {
    switch (rarity) {
      case "gold":
        return "border-yellow-400";
      case "silver":
        return "border-gray-300";
      case "bronze":
        return "border-orange-600";
      default:
        return "border-zinc-600";
    }
  }
  