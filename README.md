# Notes App Backend

A RESTful API backend for a notes application built with Node.js, Express, and Prisma.

## Features

- User authentication using JWT
- CRUD operations for notes
- Database integration with Prisma ORM
- Environment variable configuration
- CORS support

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL database

## Installation

1. Clone the repository:
```bash
git clone https://github.com/164sumit/notes-app-backend
cd notes-app-backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add the following:
```env
DATABASE_URL="your-database-url"
JWT_SECRET="your-secret-key-here"
PORT=5000
```

4. Set up the database:
```bash
# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# (Optional) Seed the database
npm run prisma:seed
```

## Available Scripts

- `npm start`: Start the production server
- `npm run dev`: Start the development server with hot-reload
- `npm run prisma:generate`: Generate Prisma client
- `npm run prisma:migrate`: Run database migrations
- `npm run prisma:seed`: Seed the database with initial data

## Project Structure

```
notes-app-backend/
├── prisma/
│   ├── schema.prisma
│   └── seed.js
├── src/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── server.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Notes
- `GET /notes` - Get all notes
- `GET /notes/:id` - Get a specific note
- `POST /notes` - Create a new note
- `PUT /notes/:id` - Update a note
- `DELETE /notes/:id` - Delete a note

## Dependencies

- [@prisma/client](https://www.prisma.io/docs/concepts/components/prisma-client) - Database ORM
- [express](https://expressjs.com/) - Web framework
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - JWT authentication
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js/) - Password hashing
- [cors](https://github.com/expressjs/cors) - CORS middleware
- [dotenv](https://github.com/motdotla/dotenv) - Environment variable management

## Development Dependencies

- [nodemon](https://nodemon.io/) - Development server with hot reload
- [prisma](https://www.prisma.io/) - Database toolkit

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
