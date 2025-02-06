# Couplespace

**Description:**  
A web app for couples to show their love. Make declarations with words, images, and videos. Log in with your Google account and generate a QR Code for your own page.

---

## Functionalities

- **Login**: Users can make login using Google Provider.
- **Dashboard**: Page for the user to create and edit his page, invite his partner and generate the qr code for his page.
- **Couple Page**: Page where you can view information such as photos, about, day counter and publications.

---

## Technologies Used

- **Front-end:** React, Next.js, TypeScript, Zod,
- **Back-end:** Prisma
- **Database:** PostgreSQL, Firebase Storage
- **Authentication:** Next-Auth
- **Deploy:** Vercel

---

## How to Run the Project Locally

### Prerequisites

- Node installed
- NPM or Yarn

### Steps to run the system

1. Clone the repository:

   ```bash
   git clone https://github.com/restlucas/couplespace
   cd couplespace
   ```

2. Install the dependencies:

   ```bash
   npm install or yarn install
   ```

3. Set up MySQL Database:

   ```bash
   npx prisma generate
   npx prisma migrate dev --name initial-commit
   ```

4. Run the server:
   ```bash
   npm run dev
   ```

---

## Author

This project is developed and maintained by [Lucas Oliveira](https://www.linkedin.com/in/restlucas).

Feel free to connect with me on LinkedIn for more information or to collaborate on other projects!
