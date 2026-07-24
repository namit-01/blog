# 🚀 Full Stack Blog Platform with Microservices

A scalable and production-ready **Blog Platform** built using a **Microservices Architecture**. The application separates responsibilities into dedicated services for authentication, author operations, and blog management, making the system modular, maintainable, and scalable.

---

# ✨ Features

- 🔐 JWT Authentication & Authorization
- 🔑 Google Authentication (OAuth)
- 👤 User Registration & Login
- 👨‍💻 Author Dashboard
- 📝 Create Blog
- ✏️ Update Blog
- 🗑️ Delete Blog
- 📖 Read Blogs
- ❤️ Save/Unsave Blogs
- 💬 Comment System
- 🤖 AI Blog Title Generator
- 🤖 AI Blog Description Generator
- 🤖 AI Blog Content Generator
- 🖼️ Image Upload
- ⚡ Redis Caching
- 📨 RabbitMQ Cache Invalidation
- 🐳 Dockerized Services
- 📱 Fully Responsive UI

---

# 🏗️ Architecture

```
Next.js Frontend
        │
        ▼
 ┌──────────────┬──────────────┬──────────────┐
 │              │              │
 ▼              ▼              ▼
User Service  Author Service  Blog Service
 │              │              │
 └──────────────┼──────────────┘
                │
                ▼
           RabbitMQ
                │
                ▼
             Redis
```

---

# 🛠️ Tech Stack

## Frontend

- Next.js
- React.js
- Tailwind CSS
- Axios

## Backend

- Node.js
- Express.js
- Microservices Architecture

## Databases

- MongoDB (User Service)
- PostgreSQL (Blog Service)

## Authentication

- JWT
- Google OAuth

## Messaging

- RabbitMQ

## Caching

- Redis

## DevOps

- Docker
- Docker Compose

---

# 📦 Services

## 👤 User Service

- User Registration
- Login
- Google Authentication
- JWT Authentication
- Profile Management

---

## ✍️ Author Service

- Create Blogs
- Update Blogs
- Delete Blogs
- AI Blog Generation
- Image Upload

---

## 📚 Blog Service

- Fetch Blogs
- Blog Details
- Save & Unsave Blogs
- Comment Management
- Cache Management

---

# 🤖 AI Features

- AI Blog Title Generation
- AI Blog Description Generation
- AI Blog Content Generation

---

# ⚡ Redis

Redis is used for:

- Blog List Caching
- Individual Blog Caching
- Faster API Responses

---

# 📨 RabbitMQ

RabbitMQ is used for asynchronous communication between services.

### Example

```
Blog Created
      │
      ▼
RabbitMQ Event
      │
      ▼
Cache Invalidation
      │
      ▼
Redis Cache Updated
```

The same workflow is used for **blog updates** and **blog deletion**.

---

# 🐳 Docker

All services are containerized using Docker.

- User Service
- Author Service
- Blog Service
- Redis
- RabbitMQ

---

# 📂 Project Structure

```
blog-platform/
│
├── frontend/
│
├── services/
│   ├── user/
│   ├── author/
│   └── blog/
│
├── docker-compose.yml
│
└── README.md
```

---

# 🚀 Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/blog-platform.git
cd blog-platform
```

### Install Dependencies

```bash
npm install
```

### Start the Project

```bash
docker compose up --build
```

---

# 🔑 Environment Variables

Create a `.env` file inside each service.

```env
PORT=

JWT_SECRET=

MONGO_URI=
DATABASE_URL=

REDIS_URL=

RABBITMQ_URL=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

GEMINI_API_KEY=

SUPABASE_URL=
SUPABASE_KEY=
SUPABASE_BUCKET=
```

---

# 📌 API Features

### Authentication

- Register
- Login
- Google Login
- JWT Authentication

### Author

- Create Blog
- Update Blog
- Delete Blog
- AI Content Generation

### Blog

- Get All Blogs
- Get Blog by ID
- Save & Unsave Blog
- Get Saved Blogs
- Add Comment
- Delete Comment

---

# 🚀 Future Improvements

- 🔍 Advanced Search & Filters
- ❤️ Likes & Reactions
- 📊 Analytics Dashboard
- 🏷️ Tags
- 📈 Trending Blogs
- 👑 Admin Panel
- 📧 Email Notifications

---

# 👨‍💻 Author

**Namit Chaturvedi**

If you found this project useful, consider giving it a ⭐ on GitHub!
