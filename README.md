# BrandOS

**AI-Powered Content Generation and Brand Management Platform for Small Businesses**

BrandOS is a full-stack SaaS application designed to help small businesses create, manage, analyse, and improve marketing content using Artificial Intelligence.

The platform combines persistent business profile information with user instructions and optional image input to generate brand-aware marketing content using the OpenAI API.

---

## 🚀 Live Application

**Frontend:**  
https://brand-os-sigma-ten.vercel.app/

**Backend:**  
Deployed using Render.

---

## ✨ Features

### 🤖 AI Content Generation

BrandOS uses the OpenAI API to generate marketing content including:

- Blog posts
- Social media captions
- Email campaigns

Users can provide a specific topic or instructions to control what the AI generates.

---

### 🖼️ Image-Aware Content Generation

Users can optionally upload an image when generating content.

BrandOS can use the uploaded image as additional context, allowing businesses to generate content for specific products, promotions, food, services, or other visual material.

For example, a café can upload a photo of a new matcha drink and ask BrandOS to create an Instagram caption promoting it.

---

### 🧠 Business Profile & Brand Context

Users can create and maintain a business profile containing information such as:

- Business name
- Industry
- Target audience
- Preferred brand tone

This information is automatically used as context during content generation, helping BrandOS produce content that is more consistent with the business and its audience.

---

### 🔎 AI SEO Analysis

Generated content can be analysed using AI for:

- SEO score
- Relevant keywords
- SEO improvement suggestions

Analysis results are stored with the associated content.

---

### 💬 AI Tone Analysis

BrandOS can analyse generated content to determine:

- Detected tone
- Tone confidence

This helps users evaluate whether their marketing content aligns with their intended brand voice.

---

### 📚 Content History

Generated content is automatically stored in the user's account.

Users can:

- View previous generations
- Edit content
- Copy content
- Delete content
- Run SEO analysis
- Run tone analysis

---

### 📊 Dashboard & Analytics

The dashboard provides an overview of content activity, including:

- Total generated content
- Blog post count
- Social media post count
- Email campaign count
- Content distribution charts
- Recent generated content

Analytics provide additional insight into content and analysis results.

---

### 👤 Authentication & Account Management

BrandOS includes JWT-based authentication and protected application routes.

Users can:

- Register
- Login
- View their account information
- Update account information
- Change their password
- Delete their account
- Logout securely

User-specific data is isolated so each account can only access its own business profile and content.

---

### 💳 Pricing Interface

BrandOS includes:

- Pricing plans
- Upgrade interface
- Demo checkout flow

The checkout is currently implemented for demonstration purposes and does not process real payments.

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Recharts
- Lucide React
- React Markdown

### Backend

- Node.js
- Express.js
- REST API
- JWT Authentication
- bcrypt
- Multer

### Database

- PostgreSQL
- Prisma ORM
- Neon PostgreSQL

### Artificial Intelligence

- OpenAI API
- AI text generation
- Image-aware generation
- SEO analysis
- Tone analysis

### Deployment

- Vercel — Frontend
- Render — Backend
- Neon — PostgreSQL Database

---

## 🏗️ Project Structure

```text
BrandOS/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   └── services/
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   └── server.js
│
├── database/
├── docs/
└── README.md
```

---

## 🔐 Security

BrandOS includes several security measures:

- Password hashing using bcrypt
- JWT-based authentication
- Protected API routes
- User-specific database queries
- Environment variables for sensitive credentials
- Restricted CORS configuration
- API keys stored only on the backend

Sensitive values such as the OpenAI API key, JWT secret, and database connection string are not stored in the frontend or committed to the repository.

---

## ⚙️ Local Development

### 1. Clone the repository

```bash
git clone <repository-url>
cd BrandOS
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

```bash
cd ../server
npm install
```

### 4. Configure environment variables

Create a `.env` file inside the server directory and configure:

```env
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
```

Do not commit the `.env` file or expose these values publicly.

### 5. Start the backend

```bash
cd server
npm run dev
```

### 6. Start the frontend

Open another terminal:

```bash
cd client
npm run dev
```

---

## 🎯 Project Purpose

BrandOS was developed as an IT Capstone Project at Victoria University.

The project explores how generative AI can be integrated into a full-stack SaaS platform to help small businesses create marketing content while maintaining business context and providing supporting SEO and tone analysis tools.

---

## 📌 Current Status

BrandOS is a functioning full-stack MVP.

Core functionality is implemented and deployed, including authentication, business profiles, OpenAI-powered content generation, optional image input, content management, SEO analysis, tone analysis, analytics, account management, and responsive SaaS-style interfaces.

---

## 👨‍💻 Development Team

BrandOS was developed as part of the Victoria University IT Capstone Project.