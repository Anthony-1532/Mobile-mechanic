# Mobile Mechanic Cross-Platform Platform

## Tech stack used
- **Frontend (cross-platform):** Expo + React Native + TypeScript (iOS/Android/Web)
- **Backend:** Fastify + TypeScript + Zod validation
- **Shared contracts:** Workspace package for common models
- **Testing:** Vitest + concurrent burst stress tests
- **Design workflow:** Figma-first UI system (convert Figma screens to RN component modules)

## Feature coverage delivered
1. **Booking and Scheduling**
   - Online booking with schedule, priority, and home/work location (`POST /bookings`)
   - Automated reminder generation for SMS and email
   - Route optimization endpoint for appointment sequencing
   - Calendar sync provider endpoint (Google/Outlook)
2. **Job and Customer Management**
   - Digital vehicle inspections (DVI) with media attachments (`POST /inspections`)
   - Customer portal endpoint for bookings, inspections, and invoices
   - Electronic signature and VIN/plate flow represented as extensible API-ready module points
3. **Invoicing and Payments**
   - On-site invoicing endpoint with multi-payment support (card/Apple Pay/Google Pay)
   - Accounting sync represented as integration-ready backend architecture
4. **Inventory and Parts**
   - Inventory endpoint with reorder points and automatic update status
5. **Technical and Communication Tools**
   - Offline-capable mobile architecture direction + backend sync-ready design
   - Two-way messaging channel support (SMS/WhatsApp) surfaced in operations toolkit endpoint
   - Labor guide/tech info + mileage/expense tracking capability placeholders

## Project structure
- `apps/mobile` — cross-platform mobile/web frontend shell
- `apps/api` — production backend API
- `packages/shared` — shared types and constants

## Run locally
```bash
npm install
npm run test
npm run test:stress
npm run -w @mobile-mechanic/api dev
npm run -w @mobile-mechanic/mobile start
```

## Vercel deployment fix (404)
This repository now includes a root `index.html`, `vercel.json`, and serverless API routes under `/api` so Vercel has a deployable entrypoint.
- `/` -> static landing page
- `/health` -> serverless health endpoint
- `/bookings` -> serverless booking endpoint (POST)
