import { cookies } from 'next/headers';

// Create an async function to check, update, or create the "votedSong" cookie.
export async function AddedSongCookie() {
  const cookiesList = cookies();
const cookieName = `addedSongs`;
const hasCookie = cookiesList.has(cookieName);

// If the cookie already exists, increment its value.
if (hasCookie && cookiesList.get(cookieName)) {
    console.log("cookiesList.get(cookieName)",cookiesList.get(cookieName)?.value)
    const currentCookieValue = parseInt(cookiesList.get(cookieName)!.value);
    const newCookieValue = currentCookieValue + 1;
    cookiesList.set(cookieName, newCookieValue.toString(), { expires: Date.now() + 12 * 60 * 60 * 1000 });
    return newCookieValue;

} else {
    // If the cookie doesn't exist, create it with an initial value of 1.
    cookiesList.set(cookieName, '1', { expires: Date.now() + 12 * 60 * 60 * 1000 });
    return 1;
}
}

