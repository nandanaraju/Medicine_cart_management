# MEDICINE CART MANAGEMENT SYSTEM

## Setting Up the Project

Clone the repository to your local machine:  
```
git clone git@github.com:nandanaraju/Medicine_cart_management.git
cd Medicine_cart_management
```

Navigate to the backend folder:
```
cd backend
```

Install dependencies:
```
npm install
```

Start the PostgreSQL database service (if not already running):
```
sudo systemctl start postgresql
```

Create a .env file in the backend folder and add the following content:

```
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
DB_PORT=your_database_port
JWT_SECRET=your_jwt_secret
```

Replace your_database_host, your_database_user, etc., with actual values. 

Once the environment variables are set up, start the backend server:

```
node server.js
```

Your backend should now be running and connected to the database successfully