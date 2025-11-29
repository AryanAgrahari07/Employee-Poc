**Employee Management POC**

A full-stack proof-of-concept built with **React**, **Node.js**, and **GraphQL** demonstrating clean UI, scalable backend patterns, and modern development best practices.

---

**Overview**

This project showcases a simple but production-ready employee management system.
It includes:

* A beautiful and responsive **grid view** + **tile view**
* Sortable & paginated employee list
* Full CRUD (**add / update / delete**)
* Role-based access (**admin / employee**)
* Employee detail view (modal / expanded)
* Hamburger menu + horizontal navigation
* Clean GraphQL API with Prisma ORM and authentication

The goal of this POC is to demonstrate solid engineering practices, clean architecture, and attention to UI/UX.

---

**Tech Stack**

**Frontend**

* React + Vite + TypeScript
* Tailwind CSS
* Apollo Client (GraphQL)
* React Router
* Zustand
  
**Backend**

* Node.js + Express
* Apollo Server (GraphQL)
* Prisma ORM
* PostgreSQL
* DataLoader + pagination

---

**Key Features**

**Frontend**

* Modern responsive UI
* Grid/Tile view 
* Employee detail modal
* Smooth navigation, loading & error states
* Accessible hamburger menu + horizontal navbar
* Admin-only options: Add, Edit, Delete

**Backend**

* GraphQL API with structured schema
* List, filter, sort, and paginate employees
* Retrieve employee details
* Add / Update / Delete mutations
* Admin vs Employee role enforcement
* Prisma ORM + clean error handling
* Efficient queries with DataLoader

---

**Installation & Setup**

**1. Clone Repository**

```bash
git clone <repo-url>
cd project-root
```

---

**2. Backend Setup**

```bash
cd backend
npm install
```

**Environment Variables**

Create a `.env` file:

```
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret"
PORT=4000
```

**Database Setup**

```bash
npx prisma db push
node prisma/seed.js
```

**Start Backend**

```bash
npm run dev
```

GraphQL Playground available at:
👉 **[http://localhost:4000/graphql](http://localhost:4000/graphql)**

---

**3. Frontend Setup**

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:
👉 **[http://localhost:5173](http://localhost:5173)**

---

**Authentication**

Use seeded users:

| Role     | Username | Password    |
| -------- | -------- | ----------- |
| Admin    | admin    | admin123    |
| Employee | employee | employee123 |

Admin can:
✔ Add Employees
✔ Edit Employees
✔ Delete Employees

Employee can:
✔ View only

---

**Project Structure**

```
frontend/
backend/
```

Backend follows clean architecture:
`schema → resolvers → services → db → utils`.

Frontend is modular with:
`components / pages / graphql / hooks / store / utils`.

---

**Deployment**

* **Frontend:** Vercel 
* **Backend:** Render 
* Set production `VITE_API_URL` for frontend.
