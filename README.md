# NeoTradez

A modern web platform for trading physical items without using money, focusing on value exchange and community.

## Features

- General Listing: Post items and wait for trade offers
- Specific Request: List items with specific trade requests
- Trading Journey: Track your trading history and item evolution
- User Profiles: Manage your trading history and reputation
- Secure Messaging: Built-in communication system for trade negotiations

## Tech Stack

- **Frontend**: Next.js 14, TailwindCSS, Shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Deployment**: Vercel

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
DATABASE_URL="your-database-url"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 