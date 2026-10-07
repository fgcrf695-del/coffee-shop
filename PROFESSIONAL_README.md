# Bean & Bloom - Professional Coffee E-Commerce Platform

**Production-Ready Coffee Shop Platform**

## 🎯 Features

### Frontend
- ✅ Modern React + Next.js 14 with TypeScript
- ✅ Tailwind CSS with custom theme
- ✅ Responsive design (mobile-first)
- ✅ Advanced filtering & search
- ✅ Real-time cart management
- ✅ Secure checkout flow
- ✅ Order tracking
- ✅ User authentication
- ✅ Product reviews & ratings
- ✅ Wishlist functionality

### Backend
- ✅ Node.js + Express.js
- ✅ PostgreSQL database
- ✅ Prisma ORM
- ✅ JWT authentication
- ✅ Stripe payment integration
- ✅ Email notifications
- ✅ File uploads (AWS S3)
- ✅ REST API
- ✅ Rate limiting
- ✅ Error handling

### Admin Panel
- ✅ Product management
- ✅ Order management
- ✅ User management
- ✅ Analytics & reports
- ✅ Inventory tracking
- ✅ Revenue dashboard

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis (optional, for caching)

### Installation

```bash
# Clone repository
git clone <repo>
cd coffee-shop

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local

# Configure database
npx prisma migrate dev

# Seed database
npm run seed

# Start development
npm run dev
```

## 📦 Deployment

### Heroku
```bash
heroku create
git push heroku develop
```

### Docker
```bash
docker-compose up -d
```

## 📄 License
MIT
