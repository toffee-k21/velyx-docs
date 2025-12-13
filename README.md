<p align="center">
  <img src="https://github.com/user-attachments/assets/3597a23b-9494-497f-b223-da7a0be0dfff" alt="Velyx Logo" width="140" />
</p>
<!-- <img width="1080" height="1080" alt="velyx" src="https://github.com/user-attachments/assets/3597a23b-9494-497f-b223-da7a0be0dfff" /> -->


<h1 align="center">Velyx Docs</h1>

<p align="center">
  Official documentation repository for <strong>Velyx</strong> — a developer-first real-time infrastructure platform.
</p>


## What is Velyx?

Velyx is a real-time event delivery layer designed for modern applications.

It allows you to:
- Publish events from your backend
- Deliver them instantly to connected clients
- Manage real-time connections without handling scaling, reconnections, or routing logic

Velyx focuses on **simplicity, reliability, and developer experience**.

## About This Repository

This repository exists to:

- Maintain clear and accurate documentation for Velyx
- Improve developer experience through good explanations and examples
- Allow the community to contribute to docs in an open way

If you’re looking for the Velyx source code, this repository focuses only on **documentation**.

## Tech Stack

The documentation site is built using:

- **Next.js** — documentation framework
- **TypeScript** — type safety
- **NextAuth.js** — authentication (Google OAuth)
- **JWT** — backend authentication tokens
- **Tailwind CSS** — styling

## Architecture Overview

Below is a **high-level, conceptual overview** of how Velyx works.

This diagram focuses on **data flow**, not internal implementation details.

<p align="center">
  <!-- Replace with actual diagram -->
  <img
    src="./assets/velyx-architecture.png"
    alt="Velyx High-Level Architecture"
    width="700"
  />
</p>

### How Velyx Works (Conceptual)

1. Clients connect to Velyx using WebSockets
2. Clients subscribe to topics
3. Backend services publish events via HTTP
4. Velyx delivers events to all active subscribers in real time

This separation keeps application backends stateless and scalable.

## Environment Variables

To run the documentation site locally, the following environment variables are required:

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_SECRET=
BACKEND_JWT_SECRET=
VELYXSERVER_URL=http://localhost:5001


---

## ✅ Section 9 — Local Development (Minimal)

```md
## Local Development

1. Clone the repository
2. Install dependencies
3. Create a `.env.local` file with the required variables
4. Start the development server
```
```bash
npm install
npm run dev
```

## ✅ Section 10 — Backend Dependency

```md
## Backend Dependency

Some parts of the documentation site rely on a running Velyx backend
(for authentication and API key management).

You can point `VELYXSERVER_URL` to:
- A locally running backend, or
- An existing Velyx backend instance
```

## Documentation Scope

The documentation covers topics such as:

- Authentication
- WebSocket connections
- Publishing events
- Topics and subscriptions
- Best practices

Each topic lives in its own markdown file inside this repository.


