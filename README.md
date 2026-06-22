# HostelDiscovery

A production-ready **Next.js 15** (App Router) + **TypeScript** + **Tailwind CSS** website for PG/Hostel discovery. Students scan a QR code to view hostel building information; a single admin manages all content via Firebase.

## Features

### Public Website
- **Home** — Hero, hostel overview, featured buildings, contact CTA
- **Buildings** — Responsive grid with rent, vacancy, distance
- **Building Details** — Gallery, room types, fees, facilities, contact actions
- **Transport** — Auto timings, pickup points, charges
- **Facilities** — WiFi, laundry, food, security, and more
- **Contact** — Phone, WhatsApp, Google Maps links

### Admin Dashboard (`/admin`)
- Firebase Authentication (single admin user)
- CRUD for buildings with image upload
- Manage transport, facilities, and contact info
- Vacancy status and fee structure updates

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Firebase Auth, Firestore, Storage

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env.local` and fill in your Firebase credentials:

```bash
cp .env.example .env.local
```

### 3. Firebase Setup

1. Create a project at [Firebase Console](https://console.firebase.google.com)
2. Enable **Authentication** → Email/Password
3. Create an admin user with the email matching `NEXT_PUBLIC_ADMIN_EMAIL`
4. Enable **Firestore Database**
5. Enable **Storage**
6. Add your web app and copy config values to `.env.local`

#### Firestore Security Rules (recommended)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /buildings/{doc} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == "admin@example.com";
    }
    match /transport/{doc} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == "admin@example.com";
    }
    match /facilities/{doc} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == "admin@example.com";
    }
    match /contact/{doc} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == "admin@example.com";
    }
  }
}
```

Replace `admin@example.com` with your admin email.

#### Storage Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /buildings/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public site.  
Admin login: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

> **Note:** Without Firebase configured, the site runs with demo data so you can preview all pages immediately.

## Project Structure

```
src/
├── app/                    # App Router pages
│   ├── page.tsx            # Home
│   ├── buildings/          # Buildings list & details
│   ├── transport/
│   ├── facilities/
│   ├── contact/
│   └── admin/              # Protected admin dashboard
├── components/
│   ├── ui/                 # Reusable UI (Button, Card, etc.)
│   ├── layout/             # Header, Footer, PublicLayout
│   ├── buildings/          # BuildingCard, ImageGallery
│   ├── contact/            # ContactButtons
│   ├── facilities/         # FacilityCard
│   ├── home/               # HeroSection
│   └── admin/              # AdminGuard, BuildingForm, etc.
├── contexts/               # AuthContext
├── lib/
│   ├── firebase/           # Config & Firestore services
│   ├── data.ts             # Server-side data fetching
│   ├── demo-data.ts        # Fallback demo content
│   └── utils.ts
└── types/                  # TypeScript interfaces
```

## Firestore Collections

| Collection   | Document ID | Fields |
|-------------|-------------|--------|
| `buildings` | auto        | name, description, images[], roomTypes[], feeStructure[], facilities[], vacancyStatus, distanceFromUniversity, googleMapsUrl, startingRent, createdAt |
| `transport` | `default`   | autoTimings[], pickupPoints[], charges[], updatedAt |
| `facilities`| auto        | name, description, icon |
| `contact`   | `default`   | phone, whatsapp, email, address, googleMapsUrl, updatedAt |

## Scripts

| Command       | Description          |
|---------------|----------------------|
| `npm run dev` | Start dev server     |
| `npm run build` | Production build   |
| `npm run start` | Start production   |
| `npm run lint`  | Run ESLint         |

## QR Code Integration

Generate QR codes pointing to:
- Home: `https://yourdomain.com`
- Specific building: `https://yourdomain.com/buildings/{buildingId}`

Place QR codes at hostel entrances for instant access.

## License

MIT
