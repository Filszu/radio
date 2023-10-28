

// import { NextRequest, NextResponse } from "next/server";
// import  getSpotifyToken from "@/config/spotifyClient"

// export async function middleware(request: NextRequest) {
//   // Retrieve the Spotify access token
//   const accessToken = await getSpotifyToken();

//   // Store the access token in a cookie
//   const expires = new Date(Date.now() + 3600000); // 1 hour
//   const cookieValue = `access_token=${accessToken}; HttpOnly; Secure; SameSite=Strict; Expires=${expires.toUTCString()}`;
//   request.cookies.set("spotify_token", cookieValue);

//   return NextResponse.next();
// }