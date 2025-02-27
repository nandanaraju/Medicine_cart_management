# 🚀 MEDICINE CART MANAGEMENT SYSTEM

## 📌 Setting Up the Project

### 🔽 Clone the Repository

```
git clone git@github.com:nandanaraju/Medicine_cart_management.git
cd Medicine_cart_management
```

### ⚙ Navigate to the Backend Folder

```
cd backend
```

### 📦 Install Dependencies

```
npm install
```

### 🗄 Start PostgreSQL Database Service (if not already running)

```
sudo systemctl start postgresql
```

### 🔑 Set Up Environment Variables

Create a `.env` file in the `backend` folder and add the following content:

```
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
DB_PORT=your_database_port
JWT_SECRET=your_jwt_secret
```

Replace `your_database_host`, `your_database_user`, etc., with actual values.

### 🚀 Start the Backend Server

```
node server.js
```

Your backend should now be running and connected to the database successfully.

### 🌐 Navigate to the Frontend Folder

```
cd frontend
```

### 📦 Install Dependencies

```
npm install
```

### ▶ Start the Frontend Server

```
npm run dev
```

Now you can access the project at `localhost:5173`.

---

## 🔥 Functionalities

### 🔐 JWT Token-Based Authentication

- 🛡️ Secure authentication system using JWT tokens.
- 👤 Separate roles for **Admin** and **User**.

### 🏥 Admin Functionalities

- ➕ **Add** new medicines.
- ✏ **Edit** medicine details.
- 🗑 **Delete** medicines from the inventory.
- 🔄 **Change order status** using **drag-and-drop** with `@hello-pangea/dnd`:
  - ⏳ **To Do**
  - 🔄 **Pending**
  - ✅ **Confirmed**

### 🛍 User Functionalities

- 🛒 **Add medicines** to the cart.
- 📋 **View order status** once handled by the admin.

---

## 🖥 UI Enhancements

- 🎨 Added intuitive **icons** for better user experience.
- 🔄 **Real-time updates** for order status changes.

---
