# StartPerks - Backend API

The RESTful API service powering the Startup Benefits Platform. Handles authentication, deal management, and claim logic.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (Bearer Token)
- **Security:** Bcrypt password hashing

## Key Features

- 🔐 **Secure JWT Authentication** - Bearer token-based auth with protected routes
- 👥 **Role-based Access** - Public endpoints for browsing, protected for claiming
- 🔒 **Locked Deal Verification** - Only verified users can access premium deals
- 📦 **Scalable MVC Architecture** - Clean separation of concerns

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/shivamngpal/startup-benefits-backend.git
cd startup-benefits-backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Copy the example environment file and fill in your values:
```bash
cp .env.example .env
```
Then edit `.env` with your MongoDB URI and JWT secret.

### 4. Start the server
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

### 5. Seed the database (optional)
```bash
npm run seed
```
This populates the database with sample deals.

## API Documentation

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create new user account |
| POST | `/api/auth/login` | Authenticate & get JWT token |

### Deals (Public)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/deals` | List all available deals |
| GET | `/api/deals/:id` | Get single deal details |

### Claims (Protected - Requires JWT)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/claims` | Claim a deal |
| GET | `/api/claims` | Get user's claimed deals |

## Project Structure

```
server/
├── src/
│   ├── config/
│   │   └── db.js           # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── dealController.js
│   │   └── claimController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Deal.js
│   │   └── Claim.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── dealRoutes.js
│   │   └── claimRoutes.js
│   ├── seed.js
│   └── server.js
├── .env
└── package.json
```

## License

MIT
