export interface DriverRank {
  name: string;
  title: string;
  emoji: string;
  minWPM: number;
  color: string;
}

export const driverRankings: DriverRank[] = [
  { name: "Mazespin", title: "Nikita Mazepin", emoji: "🌪️", minWPM: 0, color: "text-gray-400" },
  { name: "Latifi", title: "Nicholas Latifi", emoji: "🇨🇦", minWPM: 20, color: "text-blue-400" },
  { name: "Alonso", title: "Fernando Alonso", emoji: "🇪🇸", minWPM: 35, color: "text-orange-400" },
  { name: "Hamilton", title: "Lewis Hamilton", emoji: "🇬🇧", minWPM: 70, color: "text-purple-400" },
  { name: "Verstappen", title: "Max Verstappen", emoji: "🇳🇱", minWPM: 90, color: "text-yellow-400" },
  { name: "Schumacher", title: "Michael Schumacher", emoji: "🇩🇪", minWPM: 120, color: "text-red-600" },
  { name: "Raikkonen", title: "Kimi Räikkönen", emoji: "🥶", minWPM: 140, color: "text-blue-300" },
];

export function getDriverRank(wpm: number): DriverRank {
  // Find the highest rank the user qualifies for
  for (let i = driverRankings.length - 1; i >= 0; i--) {
    if (wpm >= driverRankings[i].minWPM) {
      return driverRankings[i];
    }
  }
  return driverRankings[0]; 
}