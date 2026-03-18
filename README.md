# 🦷 OroGlee Dentist Appointment Booking Platform

A **full-stack MERN application** for managing dentist appointments. Built with **React**, **Node.js**, and **MongoDB**, this platform enables users to browse dentists, book appointments, and allows admins to manage appointments efficiently. The application is fully **responsive**, with a modern UI/UX.

---

## 🔹 Key Features

### **User Interface**
- Browse a **dynamic list of dentists** with detailed profiles:
  - Photo, Name, Qualification, Years of Experience  
  - Clinic Name, Address, Location
- **Book appointments** via a form:
  - Patient Name, Age, Gender, Appointment Date
- **Real-time confirmation** after booking

### **Admin Panel**
- View and manage all appointments in a **table-based dashboard**
- Display details:
  - Patient Name, Age, Gender, Appointment Date
  - Dentist Name, Clinic Name
- Optional:
  - Search & filter appointments
  - Mark appointments as **Booked / Completed**

### **UI/UX Enhancements**
- Fully **responsive design** (mobile + desktop)
- Built with **Tailwind CSS** for modern styling
- Loading states & error handling
- Smooth **booking workflow** with form validation

---

## 🛠️ Tech Stack

| Layer         | Technology                                           |
|---------------|------------------------------------------------------|
| **Frontend**  | React.js (Functional Components + Hooks), Tailwind CSS |
| **Backend**   | Node.js, Express.js                                 |
| **Database**  | MongoDB (Mongoose) / SQLite                         |
| **HTTP Client** | Axios                                             |
| **Deployment**| Netlify (Frontend), Heroku (Backend)               |

**Technical Highlights:**
- Component-driven architecture for maintainable UI  
- RESTful APIs for frontend-backend communication  
- Mongoose schema for structured data storage  
- Environment configuration using `.env` files  
- Modular route design for **scalability**  

---

## 📁 Project Structure

```text
dentist-appointment/
├── backend/
│   ├── server.js                 # Entry point for Node/Express server
│   ├── models/
│   │   ├── Dentist.js            # Dentist schema
│   │   └── Appointment.js        # Appointment schema
│   └── routes/
│       ├── dentistRoutes.js      # Dentist CRUD APIs
│       └── appointmentRoutes.js  # Appointment APIs
├── src/
│   ├── components/
│   │   ├── DentistList.js        # Dentist listing page
│   │   ├── BookAppointment.js    # Booking form
│   │   └── AdminPanel.js         # Admin dashboard
│   ├── App.js                    # Main React app
│   └── index.js                  # Entry point
└── README.md
```
🚀 Getting Started
Prerequisites

Node.js (v16+ recommended) – Install Node.js

MongoDB locally or via MongoDB Atlas

Frontend Setup

# Clone repository
git clone <repository_link>
cd dentist-appointment

# Install dependencies
npm install

# Start development server
npm start

Backend Setup
cd backend

# Install dependencies
npm install express mongoose cors dotenv

# Start server
node server.js

📡 API Endpoints
Dentist APIs

GET /api/dentists – Fetch all dentists

POST /api/dentists – Add a new dentist

Appointment APIs

POST /api/appointments – Create a new appointment

GET /api/appointments – Fetch all appointments

Technical Notes:

All APIs follow REST conventions

JSON is used for request & response payloads

Proper HTTP status codes (200, 201, 400, 500) for error handling

⚡ Optional / Bonus Features

Admin authentication using JWT

Search / filter for dentists and appointments

Appointment status (Booked / Completed)

Pagination for large datasets

Form validation using React Hook Form or custom validators

🏗️ Application Workflow

User Flow

Load Dentist Listing → Click Book Appointment → Fill Form → Submit → Confirmation

Admin Flow

Load Admin Panel → Fetch appointments → View / Filter / Update Status

📦 Deployment

Frontend: Deploy using Netlify

Backend: Deploy using Heroku or any Node.js hosting service

Ensure frontend API URLs point to deployed backend

👨‍💻 Author

Your Name
Full-Stack Developer | MERN Stack Enthusiast
