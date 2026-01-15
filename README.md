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

<img width="2066" height="1454" alt="image" src="https://github.com/user-attachments/assets/ebb641cb-f60d-4cc7-917a-b30a5e1d87f2" />


### How Velyx Works (Conceptual)

1. Clients connect to Velyx using WebSockets
2. Clients subscribe to topics
3. Backend services publish events via HTTP
4. Velyx delivers events to all active subscribers in real time

This separation keeps application backends stateless and scalable.


