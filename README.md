# Shopverse Frontend

Shopverse is an e-commerce frontend built with **Next.js and React**. It connects to a Node.js and Express REST API to display products, manage orders, handle user authentication, and provide administrative functionality.

This project was developed for **educational purposes** to practice frontend development, API integration, authentication with JWT, and role-based access to application features.

## 🎯 Project Goals

- Build an e-commerce frontend using Next.js and React.
- Connect the frontend to a REST API.
- Implement user registration and sign-in.
- Understand how JWT authentication works on the frontend.
- Restore the user's session after refreshing the page.
- Manage authentication state using React Context.
- Practice sending authenticated requests to a backend API.
- Build an admin dashboard for managing application data.

## 🚀 Features

### 1. User Registration

Users can create an account through the registration page.

The frontend sends the user's name, email, and password to the backend:

```http
POST /auth/register
```

The request body contains:

```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "your-password"
}
```

The backend handles registration and returns a response based on its implementation.

### 2. User Sign In

Users can sign in using their email and password.

```http
POST /auth/login
```

After a successful login, the frontend receives the backend response and uses the authentication context to store the user and token.

The JWT is stored in `localStorage` so it can be reused after a page refresh.

### 3. JWT Authentication

The frontend attaches the stored JWT to authenticated API requests using the `Authorization` header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

The `authHeaders()` helper reads the token from `localStorage` and adds the header when a token exists.

This allows the frontend to send authenticated requests to endpoints that require a logged-in user.

### 4. Restore User Session — Get Me

The frontend uses the following endpoint to retrieve the authenticated user's information:

```http
GET /auth/me
```

When the application loads, the `AuthProvider` checks whether a token exists in `localStorage`.

- If no token exists, the user remains logged out.
- If a token exists, the frontend calls `getMe()`.
- If the request succeeds, the user information is restored in the authentication context.
- If the request fails, the saved token is removed and the user is logged out.

This allows the application to restore the user's session after refreshing the page, provided the token is still valid and the backend accepts it.

### 5. Authentication Context

The application uses React Context to share authentication state across components.

The `AuthProvider` manages:

- `user` — the authenticated user's information.
- `token` — the current JWT.
- `login()` — stores the token and updates the user state.
- `logout()` — removes the token and clears the user state.

Components can access this information through the `useAuth()` custom hook.

This avoids passing authentication data through multiple component levels.

### 6. Product Management

The frontend connects to product endpoints to support operations such as:

- Retrieving all products.
- Retrieving a product by ID.
- Creating products.
- Updating products.
- Deleting products.

Product creation, updates, and deletion send the JWT when available. The backend must enforce the required permissions.

### 7. Categories and Tags

The frontend includes API functions for working with categories and tags.

**Categories**
- Retrieve all categories.
- Retrieve a category by ID.
- Retrieve products belonging to a category.
- Create, update, and delete categories.

**Tags**
- Retrieve tags.
- Retrieve products associated with a tag.
- Create and delete tags.

### 8. Orders

The frontend connects to order endpoints to support:

- Creating orders.
- Retrieving a user's orders.
- Retrieving orders.
- Retrieving a specific order.
- Updating order status.
- Deleting orders.

Authenticated order requests include the JWT when available. The backend determines which operations the user is permitted to perform.

### 9. Users

The API integration includes functions to:

- Retrieve users.
- Create users.
- Retrieve orders associated with a specific user.

These operations may require administrative permissions enforced by the backend.

### 10. Admin Dashboard

The frontend includes an admin dashboard for administrative functionality.

The API layer provides functions for managing products, categories, tags, users, and orders. These functions can be used by the dashboard to perform administrative operations.

The backend must verify the user's identity and role before allowing restricted operations. Hiding an admin page in the frontend is not a replacement for backend authorization.

## 🛠️ Technologies Used

- **Next.js** — React framework for the frontend.
- **React** — Component-based user interface.
- **React Context API** — Shared authentication state.
- **JavaScript** — Application logic and API integration.
- **Fetch API** — HTTP requests to the backend.
- **JWT** — Token-based authentication.
- **localStorage** — Persistence of the authentication token.
- **Node.js and Express.js API** — Backend services.
- **MongoDB** — Database managed by the backend.

## 📁 Main Concepts

### API Integration

The frontend uses reusable asynchronous functions to communicate with the backend API. These functions send HTTP requests, attach authentication headers where required, and handle unsuccessful responses.

### Authentication vs. Authorization

**Authentication** verifies who the user is, using the login process and JWT verification.

**Authorization** determines which actions the user can perform. For example, an administrator may be allowed to manage products and orders, while a regular customer may have more limited permissions.

The backend is responsible for enforcing these permissions.

## ⚙️ Environment Configuration

The frontend reads the backend API URL from an environment variable:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

This allows the API URL to be configured without hardcoding it throughout the API functions.

## 🔐 Authentication Flow

1. A user registers or signs in.
2. The frontend sends the request to the backend.
3. After successful sign-in, the frontend receives the JWT and user information.
4. The `login()` function stores the token and updates the authentication context.
5. Authenticated requests include the token in the `Authorization` header.
6. When the application loads again, `AuthProvider` checks for a saved token.
7. The frontend calls `GET /auth/me` to restore the user session.
8. The backend verifies the token and returns the authenticated user's information.

## 📚 What I Learned

Through this project, I practiced:

- Building frontend features with Next.js and React.
- Connecting a frontend to a REST API.
- Using `fetch()` for asynchronous HTTP requests.
- Implementing registration and sign-in flows.
- Working with JWT authentication.
- Storing and retrieving tokens using `localStorage`.
- Managing shared state with React Context.
- Creating a custom authentication hook.
- Restoring a user session using a protected endpoint.
- Sending authorization headers with API requests.
- Organizing API functions into reusable methods.
- Connecting an admin dashboard to backend resources.
- Understanding the separation between frontend access control and backend authorization.

## 🎓 Project Purpose

Shopverse is an **educational project** designed to strengthen practical frontend and full-stack development skills. Its main focus is learning how a React-based frontend communicates with a backend API, manages authentication state, handles JWTs, and supports administrative functionality.

## 👩‍💻 Author

**Zaynab Hwayji**
