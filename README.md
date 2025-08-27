# BookCrossing Next.js

## Project Overview

BookCrossing Next.js is a modern web application designed to facilitate the sharing, discovery, and management of books among a community of users. Inspired by the global BookCrossing movement, this platform enables users to list, search, and exchange books, fostering a culture of reading and community engagement.

### Background & Motivation

The project was initiated to address the need for a user-friendly, scalable, and secure platform for book enthusiasts. By leveraging cutting-edge web technologies, BookCrossing Next.js aims to:

- Promote book sharing and reading culture
- Provide seamless user experience across devices
- Demonstrate best practices in modern web development

### Goals

- Build a robust, maintainable, and scalable full-stack application
- Showcase proficiency in Next.js, TypeScript, and modern frontend/backend patterns
- Integrate authentication, internationalization, and responsive design
- Serve as a portfolio piece for job applications

## Key Features

- **User Authentication:** Secure login/signup via Auth0
- **Book Management:** CRUD operations for books, including listing, searching, filtering, and sorting
- **Messaging System:** Direct messaging between users
- **Order System:** Request and track book exchanges
- **Internationalization (i18n):** Multi-language support (English, Traditional Chinese)
- **Responsive UI:** Mobile-first design using TailwindCSS and custom hooks
- **Role-based Access:** Member features and admin controls
- **Modern UI Components:** Accordion, dropdowns, tooltips, cards, etc. (shadcn/ui)

## Technologies & Important Libraries

<table>
  <tr>
    <td><img src="/public/next.svg" alt="Next.js" width="40"/></td>
    <td><b>Next.js</b><br>React framework for server-side rendering and routing</td>
  </tr>
  <tr>
    <td><img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" alt="TypeScript" width="40"/></td>
    <td><b>TypeScript</b><br>Type-safe development</td>
  </tr>
  <tr>
    <td><img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" alt="TailwindCSS" width="40"/></td>
    <td><b>TailwindCSS</b><br>Utility-first CSS framework for rapid UI development</td>
  </tr>
  <tr>
    <td></td>
    <td><b>shadcn/ui</b><br>Accessible, customizable UI components</td>
  </tr>
  <tr>
    <td><img src="https://cdn.auth0.com/blog/auth0-logo.svg" alt="Auth0" width="40"/></td>
    <td><b>Auth0-logo</b><br>Authentication and user management</td>
  <tr>
    <td><img src="/public/zod.svg" wi-logodth="40"/></td>
    <td><b>Zod</b><br>Type schema enforcement</td>
  </tr>
  <tr>
    <td><img src="https://react.dev/images/logo.svg" alt="React" width="40"/></td>
    <td><b>React<br>Custom hooks for mobile detection and state management</td>
  </tr>
  <tr>
    <td><img src="https://poshttps:/ment</.dev/images/logobd/logo.svg" alt="PostCSS" width="40"/></td>
    <td><b>PostCSS</b><br>CSS transformations</td>
  </tr>
  <tr>
    <td><img src="https:/https://.org/assets/logoCSSint.org/assets/images/logo.svg" alt="ESLint" width="40"/></td>
    <td><b>ESLint</b><br>Code linting and quality</td>
  </tr>
  <tr>
    <td><img src="https://jestjs.io/img/opengraph.png" alt="Jest" width="40"/></td>
    <td><b>Jest</b><br>Unit and integration testing</td>
  </tr>
</table>

## Folder Structure

- `app/` - Main application code (pages, components, layouts, features)
- `app/_components/` - Shared and feature-specific React components
- `app/_hooks/` - Custom React hooks
- `app/_lib/` - Utility functions and constants
- `app/_modules/` - Domain logic (book, member, message, order, post)
- `app/_providers/` - Context providers (e.g., language)
- `app/_services/` - External service integrations (Auth0, Google)
- `app/[lang]/` - Internationalized routes and pages
- `public/` - Static assets
- `languages/` - Language files and types
- `types/` - Global TypeScript types

## Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd bookcrossing-nextjs
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Configure environment variables:**
   - Create a `.env.local` file for Auth0, database, etc.
   - Include the folowing in your file:
        - AUTH0_ISSUER_BASE_URL
        - AUTH0_CLIENT_ID
        - AUTH0_CLIENT_SECRET
        - AUTH0_AUDIENCE
        - AUTH0_BASE_URL
        - AUTH0_MGT_CLIENT_ID
        - AUTH0_MGT_CLIENT_SECRET
        - AUTH0_MGT_AUDIENCE
        - AUTH0_MGT_ENDPOINT
        - AUTH0_MGT_CONNECTION
        - AUTH_SECRET # Added by `npx auth`
        - GOOGLE_API_KEY
        - BACKEND_URL

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Deployment

- Recommended: [Vercel](https://vercel.com/) for seamless Next.js deployment
- See [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying)

## Specifications

- **Frontend:** Next.js (App Router), TypeScript, TailwindCSS, shadcn/ui
- **Backend:** Next.js API routes, modular service layers
- **Authentication:** Auth0 integration
- **Testing:** Jest (unit/integration)
- **Internationalization:** Dynamic language switching, JSON language files
- **Accessibility:** Semantic HTML, accessible UI components

## Contribution

Contributions are welcome! Please fork the repo and submit a pull request. For major changes, open an issue first to discuss what you would like to change.

## Contact

For questions, job opportunities, or feedback:

- **Author:** Johnny C.
- **LinkedIn:** [johnny-wychung](https://www.linkedin.com/in/johnny-wychung/)

---

This project demonstrates expertise in modern web development, scalable architecture, and best practices. Thank you for reviewing!
