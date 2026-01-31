# **App Name**: FuelTrack Pro

## Core Features:

- Fuel Entry Form: Capture fuel entries with date, slip number, vehicle number, driver, location (GPS), fuel type, quantity, amount, and meter reading.
- Fuel Type Management: Manage fuel types (Petrol, Diesel, HOBC) and their prices, storing prices in Firestore.
- Real-time Fuel Price Updates: Fuel price updates powered by generative AI that uses historical trends and current market data to suggest optimal pricing strategies.
- Automatic Calculations: Automatically calculate the fuel amount (quantity × price) and fuel average ((Current Meter – Previous Meter) / Quantity).
- History Display & Filtering: Display a history of saved fuel entries with filtering by vehicle number and date.
- Google Sheets Sync: Sync fuel entries to Google Sheets using Google Apps Script via HTTP POST requests. NO BACKEND or serviceAccountKey.json
- Offline Persistence: Enable offline persistence to store and sync data even when the device is offline.

## Style Guidelines:

- Primary color: Deep blue (#3F51B5) to evoke trust and reliability, aligned with vehicle and management systems.
- Background color: Light blue-gray (#ECEFF1), desaturated for a clean and professional look.
- Accent color: Amber (#FFC107), contrasting with the primary to highlight important actions.
- Body and headline font: 'PT Sans', a modern and readable humanist sans-serif.
- Use material design icons to maintain consistency and clarity throughout the app.
- Implement a clean and intuitive Material Design layout for ease of use.
- Subtle animations and transitions to enhance user experience when entering or viewing data.