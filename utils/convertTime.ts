export function secondsToMinutesAndSeconds(seconds:number) {
    // Calculate minutes and seconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
  
    // Ensure the minutes and seconds are in two-digit format
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
  
    // Combine minutes and seconds in the "mm:ss" format
    const formattedTime = `${formattedMinutes}:${formattedSeconds}`;
  
    return formattedTime;
  }
  
