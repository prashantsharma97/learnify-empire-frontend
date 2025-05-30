# Learnify Empire 🎓🚀

A Teachable-level multi-tenant SaaS platform where course creators can build and launch their own **online course websites** with full subdomain support, role-based dashboards, student management, and secure payments via **Stripe** and **Razorpay**.

---

## 🔥 Features

- 🏗️ **Multi-Tenant Architecture** – Launch custom subdomain-based course sites (e.g., `creator.learnify.app`)
- 🧑‍💼 **Role-Based Access Control**
  - **Admin** – Platform superuser
  - **Creator** – Can manage their own site, courses, students
  - **Student** – Can enroll, watch, and purchase courses
- 💳 **Payment Integration** – Supports Stripe and Razorpay for seamless transactions
- 📦 **Course Builder** – Intuitive interface for uploading and organizing content
- 👥 **Student Management** – Track progress, issue certificates, and more
- 🌍 **Subdomain Routing** – Isolated data and branding per creator
- 📊 **Analytics Dashboard** – Insights for creators and admins

---

## 🛠️ Tech Stack

| Frontend     | Backend            | Others               |
|--------------|--------------------|----------------------|
| React.js     | Node.js / Express  | Stripe, Razorpay     |
| React Router | MongoDB / PostgreSQL | JWT Auth, Tailwind CSS |
| Axios        | REST API           |     

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/<prashantsharma97>/learnify-empire-frontend.git
cd learnify-empire-frontend

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

### 3. Install Backend Dependencies

```bash
cd ../server
npm install
```

---

## 📦 Environment Variables

Create `.env` files in both `client/` and `server/` directories.

### 🔐 Backend `.env` example:

```ini
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=sk_test_...
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
```

---

## 📂 Project Structure

```
learnify-empire/
│
├── client/             # React frontend (role-based routing)
├── server/             # Node.js backend
├── subdomain-handler/  # Middleware for subdomain routing
└── README.md
```

---

## 👥 User Roles & Access

| Role     | Access Level                                |
|----------|----------------------------------------------|
| Admin    | Manage all creators, billing, settings       |
| Creator  | Manage courses, students, earnings           |
| Student  | Enroll and access purchased courses          |

---

## 💳 Payments

Supports:

- Stripe Checkout  
- Razorpay Webhooks  
- Multi-currency & tax support *(coming soon)*

---

## 📈 Future Plans

- 🌐 Custom domain support  
- 🧾 Certificate generation  
- 📱 Mobile app (React Native)  
- 📚 AI-based course recommendation engine  
