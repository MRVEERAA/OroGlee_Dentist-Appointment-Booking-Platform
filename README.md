🦷 OroGlee Dentist Appointment Booking Platform

A full-stack MERN application for booking dentist appointments, built with React, Node.js, and MongoDB. Users can view dentists, book appointments, and admins can manage appointments. The application is fully responsive and provides a modern, clean user experience.

🔹 Features
User Features:

Browse a list of dentists with details:

Photo, Name, Qualification, Years of Experience

Clinic Name, Address, Location

Book appointments with a simple form:

Patient Name, Age, Gender, Appointment Date

Receive confirmation after successful booking

Admin Features:

View all appointments in a table

Details include:

Patient Name, Age, Gender, Appointment Date

Dentist Name, Clinic Name

Optional: Search and filter appointments

Optional: Mark appointments as Booked / Completed

UI & UX:

Clean, modern design using Tailwind CSS

Responsive design for desktop and mobile

Proper loading and error handling

Smooth booking flow with confirmation

🛠️ Tech Stack
Layer	Technology
Frontend	React.js, Tailwind CSS
Backend	Node.js, Express.js
Database	MongoDB or SQLite
HTTP Requests	Axios
Deployment	Netlify (Frontend), Heroku (Backend)
📁 Project Structure
dentist-appointment/
├── backend/
│   ├── server.js
│   ├── models/
│   │   ├── Dentist.js
│   │   └── Appointment.js
│   └── routes/
│       ├── dentistRoutes.js
│       └── appointmentRoutes.js
├── src/
│   ├── components/
│   │   ├── DentistList.js
│   │   ├── BookAppointment.js
│   │   └── AdminPanel.js
│   ├── App.js
│   └── index.js
└── README.md
🚀 Getting Started
Prerequisites

Node.js installed (download here
)

MongoDB installed locally or MongoDB Atlas

Frontend Setup
# Clone the repo
git clone <repository_link>
cd dentist-appointment

# Install frontend dependencies
npm install

# Start React app
npm start
Backend Setup
cd backend

# Install backend dependencies
npm install express mongoose cors dotenv

# Start Node.js server
node server.js
API Endpoints
Dentist APIs

GET /api/dentists – Fetch all dentists

POST /api/dentists – Add a new dentist

Appointment APIs

POST /api/appointments – Create a new appointment

GET /api/appointments – Fetch all appointments

⚡ Bonus Features (Optional)

Admin authentication

Dentist search / filter

Appointment status (Booked / Completed)

Pagination for long lists

Form validation with proper error handling

🏗️ Application Flow

User View

Load Dentist Listing Page

Click Book Appointment

Fill form → Send to backend → Show confirmation

Admin View

Load Admin Panel

Fetch all appointments → Display in table

Optional: Filter or update status

📦 Deployment

Frontend: Deploy using Netlify

Backend: Deploy using Heroku or any Node.js server

Ensure the frontend points to the deployed backend API

👨‍💻 Author

Your Name
Full-Stack Developer | MERN Stack Enthusiast
