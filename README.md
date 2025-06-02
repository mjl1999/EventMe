# Event-Me

Event-Me is a platform designed to help community members browse, sign up for, and manage events. Staff members have additional functionality to create and manage events, while users can add events to their personal calendars using Google Calendar integration via a generated URL. The platform is built with modern technologies, ensuring a responsive and accessible user experience.

## Hosted Website

The platform is hosted on Vercel and can be accessed at:  
[https://event-me-two.vercel.app/](https://event-me-two.vercel.app/)

---

## Project Overview

Event-Me was created for a small community business to provide a platform where members can:

- Browse a list of events.
- Sign up for events.
- Add events to their personal calendars using a Google Calendar URL.
- Allow staff members to create and manage events.

The platform fulfills the following **Minimum Viable Product (MVP)** requirements:

1. Display a list of events for users to browse.
2. Allow users to sign up for an event.
3. Enable users to add events to their Google Calendar after signing up via a generated URL.
4. Provide staff members with the ability to sign in and create/manage events.

---

## Tech Stack

Event-Me is built using the following technologies:

- **Next.js**: Framework for building the frontend and backend.
- **Prisma**: ORM for database management.
- **TypeScript**: Ensures type safety and better developer experience.
- **Clerk**: Handles user authentication and authorization.
- **Shadcn**: Provides a modern and accessible UI component library.
- **Google Calendar URL**: Allows users to add events to their personal calendars via a generated URL.
- **Vercel**: Hosting platform for the application.
- **Neon**: Cloud-hosted PostgreSQL database.

---

## Features

### User Features

- **Browse Events**: Users can view a list of upcoming events.
- **Sign Up for Events**: Users can register for events and manage their signups.
- **Add to Calendar**: Users can add events to their Google Calendar using a generated URL.

### Staff Features

- **Create Events**: Staff members can create new events with details like title, description, location, and capacity.
- **Manage Events**: Staff members can edit or delete events.

### Additional Features

- **Responsive Design**: The platform is fully responsive and works seamlessly across devices.
- **Accessibility**: Designed with accessibility in mind, supporting screen readers and keyboard navigation.
- **Loading States**: Clear feedback is provided during interactions, such as signing up for events or removing signups.

---

## Test Account Access

To explore the platform, you can use the following test accounts:

### Staff Account

- **Email**: eventmeadmin@eventme.com
- **Password**: eventmeadminishere123

### User Account

- **Email**: eventmeuser@eventme.com
- **Password**: eventmeuserishere123

---

## How to Run the Project Locally

Follow these steps to set up and run the project locally:

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database (hosted on Neon or locally)
- Clerk account for authentication

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/mjl1999/event-me.git
   cd event-me
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```
     DATABASE_URL="your_postgresql_connection_string"
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_key"
     CLERK_SECRET_KEY="your_clerk_secret_key"
     CLERK_WEBHOOK_SIGNING_SECRET="a_random_webhook_key"
     ```
   - Replace the placeholder values with your actual credentials.
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:3000`.

---

## Google Calendar Integration

Event-Me uses a **Google Calendar URL** to allow users to add events to their personal calendars. After signing up for an event, users can click the "Add to Google Calendar" button, which generates a URL that opens Google Calendar with the event details pre-filled.

---

## Conclusion

Event-Me is a comprehensive platform that streamlines the process of event management for both users and staff members. With its modern tech stack, responsive design, and intuitive features, it addresses the needs of community members and organizers alike!
