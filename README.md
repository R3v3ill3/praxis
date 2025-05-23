A

Praxis: Digital Ad Co-op Platform

Praxis is a digital advocacy platform designed to empower progressive campaigns. Built with Node.js, React (Vite), Firestore, NGINX, Cloudflared, and PM2, it facilitates targeted, data-driven digital actions.

⸻

Table of Contents
	•	Overview
	•	Stack
	•	Prerequisites
	•	Setup Instructions
	•	Configuration
	•	Environment Variables
	•	Google Service Account
	•	NGINX
	•	Cloudflared
	•	Running the Project
	•	Troubleshooting & FAQ
	•	Contributing
	•	License

⸻

Overview

This repository powers the Praxis platform: an online tool enabling progressive organizations and campaigns to run targeted, data-driven digital actions. The stack comprises a Node.js/Express backend, Vite-powered React frontend, Firestore for data, NGINX as a reverse proxy, Cloudflared for secure tunneling, and PM2 for backend process management.

⸻

Stack
	•	Backend: Node.js (Express)
	•	Frontend: React (Vite)
	•	Database: Google Firestore (Firebase)
	•	Reverse Proxy: NGINX
	•	Tunneling: Cloudflared
	•	Process Manager: PM2 ￼ ￼ ￼ ￼

⸻

Prerequisites
	•	Node.js (version 14.x or higher)
	•	npm (version 6.x or higher)
	•	PM2 (install globally via npm install -g pm2)
	•	NGINX
	•	Cloudflared
	•	Google Cloud project with Firestore enabled
	•	Google Service Account JSON key ￼ ￼

⸻

Setup Instructions

1. Clone the Repository

git clone https://github.com/R3v3ill3/praxis.git
cd praxis

2. Backend Setup

cd backend-node
npm install
cp .env.example .env

	•	Edit .env to fill in your settings.
	•	Place your Google service account key as specified in .env.
	•	Ensure Firestore is enabled for your Google Cloud project.

3. Frontend Setup

cd ../frontend
npm install
cp .env.example .env

	•	Edit .env as needed (see Configuration).

4. NGINX Setup
	•	Copy and adapt nginx.conf.example to your NGINX config folder.
	•	Reload NGINX: sudo systemctl reload nginx.

5. Cloudflared Tunnel Setup (Optional)
	•	Install cloudflared.
	•	See cloudflared-example.yml for tunnel config; create and run your tunnel.

⸻

Configuration

Environment Variables

Both backend and frontend require .env files.
Copy .env.example to .env in each directory and fill in the required values.

Example: backend-node/.env.example

PORT=4000
GOOGLE_APPLICATION_CREDENTIALS=./service-account.json
OPENAI_API_KEY=

Example: frontend/.env.example

VITE_API_BASE_URL=http://localhost:4000/api
VITE_OPENAI_API_KEY=_API_KEY=your-firebase-api-key

Google Service Account
	•	Obtain a service account key JSON from your Google Cloud console.
	•	Place the file where your .env expects it (e.g., backend-node/service-account.json).
	•	Do not commit this file to git! ￼

NGINX
	•	Use nginx.conf.example as a template.
	•	Adjust server names, proxy_pass targets, SSL as appropriate.

Cloudflared
	•	Create a Cloudflare tunnel for your domain.
	•	Use cloudflared-example.yml as a template.

⸻

Running the Project

Backend (Node/Express via PM2)

cd backend-node
pm2 start server.js --name praxis-backend

Frontend (React/Vite)

cd frontend
npm run build         # For production
# or
npm run dev           # For development

NGINX
	•	Reload/restart after config change. ￼

Cloudflared

cloudflared tunnel run YOUR_TUNNEL_NAME

Access:
	•	Local: http://localhost
	•	Via Tunnel: https://your-cloudflared-domain.example.com

⸻

Troubleshooting & FAQ
	•	Missing .env or credentials:
Ensure you’ve copied and edited .env.example and placed your service account file.
	•	Frontend or backend won’t start:
Double-check Node/NPM version, dependencies, and that .env is present.
	•	Can’t connect to Firestore:
Validate your service account JSON, GOOGLE_APPLICATION_CREDENTIALS path, and Firestore setup.

⸻

Contributing
	1.	Fork the repo and create a branch: git checkout -b feature/your-feature.
	2.	Commit and push changes.
	3.	Open a Pull Request.

⸻

License

This project is licensed under the MIT License. See the LICENSE file for details.

⸻

Note: This README.md is tailored based on the current structure and requirements of the Praxis project. Ensure that all paths and configurations match your actual project setup.

⸻
