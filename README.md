# PartyVote - Radio Elektron

![PartyVote Logo](https://partyvote.ciac.me/imgs/logo.png)

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

- **Frontend**: Next.js, React
- **Backend**: Node.js, Supabase
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **Payments**: Stripe
- **Music API**: Spotify API
- **Analytics**: Google Analytics
- **Deployment**: Vercel

## Screenshots

| Feature | Screenshot |
|---------|-----------|
| Home Page | ![Home Page](https://partyvote.ciac.me/imgs/screenshots/s4b.png) |
| Voting Page | ![Voting Page](https://partyvote.ciac.me/imgs/screenshots/ss1.png) |
| Playlist View | ![Playlist View](https://partyvote.ciac.me/imgs/screenshots/ss2.png) |
| Track Details | ![Track Details](https://partyvote.ciac.me/imgs/screenshots/ss3.png) |
| Admin Panel | ![Admin Panel](https://partyvote.ciac.me/imgs/screenshots/ss5.png) |
| Login Page | ![Login Page](https://partyvote.ciac.me/imgs/screenshots/ss6.png) |
| User Dashboard | ![User Dashboard](https://partyvote.ciac.me/imgs/screenshots/ss7.png) |
| Payment Integration | ![Payment Integration](https://partyvote.ciac.me/imgs/screenshots/ss8.png) |

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

