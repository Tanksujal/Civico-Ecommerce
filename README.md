# Civico-Ecommerce

Civico-Ecommerce is a MERN stack-based e-commerce platform for construction materials. It allows users to browse, purchase, and manage construction-related products efficiently.

## Features

### User Features:
- User authentication (Login, Register)
- Profile management (Update name, email, profile picture)
- Browse construction materials by categories
- Search and filter products
- Add products to cart and wishlist
- Checkout with billing and shipping details
- Offline payment integration
- Order tracking and history
- Review and rating system(Pending)

### Seller Features:
- Seller registration and login
- Add, edit, and delete products
- View and manage orders
- Track product inventory
- Generate invoices

### Admin Features:
- Dashboard with analytics
- User management
- Seller approval and management(pending)
- Order management
- Product category management

## Tech Stack
- **Frontend:** React.js (Vite), Redux Toolkit, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT
- **File Uploads:** Multer,Cloudnairy
- **Hosting:** Aws (Backend), GoDaddy (Frontend)

## Installation

### Clone the Repository
```sh
git clone https://github.com/Tanksujal/Civico-Ecommerce.git
cd Civico-Ecommerce
```

### Backend Setup
```sh
cd backend
npm install
npx nodemon
```

### Frontend Setup
```sh
cd frontend
npm install
npm run dev
```

## Environment Variables
Create a `.env` file in both `backend` and `frontend` directories and configure required keys.

## API Routes Overview
- **User Routes:** Login, Register, Profile Update
- **Product Routes:** Fetch, Create, Update, Delete
- **Order Routes:** Create, Fetch, Update Status
- **Cart Routes:** Add/Remove Items
- **Payment Routes:** Process Payments

## Deployment
- **Frontend:** Deploy on Godaddy
- **Backend:** Deploy on AWS


## License
This project is open-source and available under the MIT License.

