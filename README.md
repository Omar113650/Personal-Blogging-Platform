# Personal Blogging Platform API

A secure, scalable RESTful API for a personal blogging platform. Built with Node.js, Express, and MongoDB.

---

##  Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js + Express |
| Database | MongoDB + Mongoose |
| Authentication | JWT (Access + Refresh Tokens) |
| Password Hashing | bcryptjs |
| Validation | Zod |
| Documentation | Swagger / OpenAPI |

---

##  Setup & Run Locally

### 1. Prerequisites
- Node.js v18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### 2. Clone the Repository
```bash
git clone https://github.com/your-username/personal-blogging-platform.git
cd personal-blogging-platform
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory (use `example.env` as a reference):

```env
PORT=3000
NODE_ENV=development

MONGO_URI=mongodb://localhost:27017/blogging-platform

JWT_SECRET=your_access_token_secret_here
JWT_REFRESH_SECRET=your_refresh_token_secret_here
```

### 5. Run the Server

```bash
# Development (with hot reload)
npm run dev

# Production
npm start
```

The API will be available at: `http://localhost:3000`

---

## API Endpoints

###  Auth Routes — `/auth`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/auth/register` | Public | Create a new user account |
| `POST` | `/auth/login` | Public | Login and receive JWT tokens |
| `POST` | `/auth/logout` | Public | Clear auth cookies |
| `POST` | `/auth/refresh` | Public | Get a new access token |
| `GET` | `/auth/users` | Private | Get all users (admin) |



###  Post Routes — `/posts`

> Protected routes require `Authorization: Bearer <accessToken>` header.

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/posts` | Public | Get all blog posts |
| `POST` | `/posts` | Private | Create a new post |
| `PUT` | `/posts/:id` | Private (Owner) | Update a post |
| `DELETE` | `/posts/:id` | Private (Owner) | Delete a post |


## Database Choice: MongoDB

Why MongoDB over PostgreSQL/MySQL?

| Factor | MongoDB  | PostgreSQL |
|--------|-----------|------------|
| Schema flexibility | Dynamic, easy to change | Fixed schema, migrations needed |
| Setup speed | Fast (Atlas free tier) | Requires more configuration |
| Node.js integration | Native with Mongoose | Needs ORM (Sequelize/Prisma) |
| Blog content storage | Ideal for varied content | Works but more rigid |

MongoDB fits this project because blog posts have flexible content structures, and Mongoose provides a clean schema layer with built-in validation and middleware (like password hashing via pre-save hooks).

---

##  Project Structure

```
src/
├── controllers/
│   ├── auth.controller.js
│   └── post.controller.js
├── services/
│   ├── auth.service.js
│   └── post.service.js
├── models/
│   ├── User.js
│   └── Post.js
├── routes/
│   ├── auth.routes.js
│   └── post.routes.js
├── middlewares/
│   ├── auth.middleware.js
│   └── errorHandler.js
├── utils/
│   └── Token.js
└── app.js
```

---

##  Security Features

- Passwords hashed with **bcryptjs** (salt rounds: 10)
- **Access Token** expires in 15 minutes
- **Refresh Token** expires in 7 days, stored in `httpOnly` cookie
- Rate limiting on `/auth/login` (5 attempts per 15 min)
- Protected routes verify JWT before processing
- Users can only edit/delete their **own** posts
- **Helmet** used to secure HTTP headers
- **Mongo Sanitize** prevents NoSQL Injection attacks
- **HPP** protects against HTTP Parameter Pollution attacks
- **CORS** configured for secure cross-origin requests
- Centralized global error handling middleware
- Cookies parsed securely using **cookie-parser**
- Request logging with **Morgan**
- Real-time API monitoring using **express-status-monitor**
---






API Documentation:::

api-dog:::
https://share.apidog.com/61fc9610-5b97-4c01-980f-921559cc52e3/get-all-user-35804888e0


api-postman:::
https://documenter.getpostman.com/view/41953671/2sBXqRicDk


