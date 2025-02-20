# PartyVote - Radio Elektron

![PartyVote Main Page](https://partyvote.ciac.me/imgs/screenshots/ss1.png)

## Vote for Your Favorite Songs

PartyVote is an interactive web application that allows users to vote for their favorite songs and influence what plays on Radio Elektron.

### Features
- **User Voting**: Users can vote for their favorite tracks in real-time.
- **Live Playlist Updates**: See which songs are currently trending.
- **Spotify Integration**: Connects with Spotify to fetch track details.
- **Admin Panel**: Manage votes, add new songs, and control settings.
- **Stripe Integration**: Allows for premium voting features.
- **Google Analytics**: Tracks user interactions to optimize experience.
- **Supabase Database**: Used for storing user votes and application data securely.

## Tech Stack

Here are the technologies used in this project:

![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Google Cloud Platform](https://img.shields.io/badge/Google_Cloud-4285F4?logo=google-cloud&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-008CDD?logo=stripe&logoColor=white)

- **Frontend**: Next.js, React
- **Backend**: Node.js, Supabase
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **Payments**: Stripe
- **Music API**: Spotify API
- **Analytics**: Google Analytics
- **Deployment**: Vercel

## FEATURES - Screenshots

### Music Voting Page
![Music Voting Page](https://partyvote.ciac.me/imgs/screenshots/ss3.png)

### Intro Page
![Intro Page](https://partyvote.ciac.me/imgs/screenshots/ss2.png)

### Add Song From Spotify or YT Music
![Add Song Page](https://partyvote.ciac.me/imgs/screenshots/s4b.png)

### Share party on Social Media feture
![Share Party](https://partyvote.ciac.me/imgs/screenshots/ss8.png)


### Admin Panel - Manage Songs
![Admin Panel](https://partyvote.ciac.me/imgs/screenshots/ss5.png)

### Admin Panel - Manage Party Settings
![Admin Panel](https://partyvote.ciac.me/imgs/screenshots/ss6.png)

### Admin Panel - Developer Tools
![Admin Panel](https://partyvote.ciac.me/imgs/screenshots/ss7.png)

### Stripe Payment Integration
![Stripe Payment](https://partyvote.ciac.me/imgs/screenshots/ss9.png)

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret

DB_PASS=your_database_password
ADMIN_PASS=your_admin_password

GOOGLE_ANALYTICS_ID=your_google_analytics_id

NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

## Authors

- [@filszu](https://www.github.com/Filszu)

## Live Website

Check out the live version: [PartyVote](https://partyvote.ciac.me/)

![PartyVote Logo](https://partyvote.ciac.me/imgs/logo.png)