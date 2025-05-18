
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/86f164ff-4c48-47ad-b0da-2ddddf32f601

## Building and Running the Project

### Option 1: Using Docker (Recommended)

1. **Setup Environment Variables:**
   Make a copy of `.env.example` and name it `.env`
   ```
   cp .env.example .env
   ```

   Update the values in `.env` with your Firebase and database credentials.

2. **Build and Run with Docker:**
   ```
   chmod +x start.sh
   ./start.sh
   ```

   This script will:
   - Build and start Docker containers
   - Set up the PostgreSQL database
   - Start the web application

3. **Access your application:**
   - Web App: http://localhost:8080
   - PostgreSQL: localhost:5432
     - Username: postgres
     - Password: postgres
     - Database: budget_tracker

### Option 2: Manual Setup

1. **Setup Environment Variables:**
   Make a copy of `.env.example` and name it `.env`
   ```
   cp .env.example .env
   ```

   Update the values with your Firebase and database credentials.

2. **Install Dependencies:**
   ```
   npm install
   ```

3. **Start the Development Server:**
   ```
   npm run dev
   ```

4. **Access your application:**
   - Web App: http://localhost:8080

## Authentication Features

The application supports the following authentication methods:

1. **Email/Password Authentication**
   - User registration with email and password
   - Login with email and password

2. **Google Authentication**
   - One-click sign-in with Google account

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/86f164ff-4c48-47ad-b0da-2ddddf32f601) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Firebase Authentication
- PostgreSQL

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/86f164ff-4c48-47ad-b0da-2ddddf32f601) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
