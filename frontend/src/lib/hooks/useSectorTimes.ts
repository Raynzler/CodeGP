// src/lib/hooks/useSectorTimes.ts
import { useState, useEffect } from 'react';

export function useSectorTimes(totalLength: number, currentPosition: number) {
  const sectorSize = Math.floor(totalLength / 3);
  const [sectorTimes, setSectorTimes] = useState<number[]>([0, 0, 0]);
  const [currentSector, setCurrentSector] = useState(1);
  const [sectorStartTime, setSectorStartTime] = useState(Date.now());
  
  const getSector = (position: number) => {
    if (position < sectorSize) return 1;
    if (position < sectorSize * 2) return 2;
    return 3;
  };
  
  useEffect(() => {
    const sector = getSector(currentPosition);
    
    if (sector !== currentSector) {
      // Completed a sector
      const sectorTime = Date.now() - sectorStartTime;
      setSectorTimes(prev => {
        const times = [...prev];
        times[currentSector - 1] = sectorTime;   
        return times;
      });
      
      setCurrentSector(sector);
      setSectorStartTime(Date.now());
    }
  }, [currentPosition, currentSector, sectorStartTime]);
  
  return { currentSector, sectorTimes, getSector };
}