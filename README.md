# VEDATRACE
ISIH-2025 AstraX

VEDATRACE is a blockchain herb traceability platform built to trace the lifecycle of Ayurvedic and herbal products — from the farm to the consumer.

## About VEDATRACE :
Vedatrace ensures end to end traceability of medicinal herbs from geo-tagged collection points to final formulation labels offering full transparency to both regulators and consumers.
1. 🌿 Farmer logs geo-tagged harvest data as the first entry in the traceability chain.
2. 🔬 Processing & Lab Testing steps are digitally signed; reports stored on IPFS.
3. 🏭 Manufacturing links final product to the original batch, entire history anchored on Polygon blockchain.
4. 📱 Consumer scans QR code to access the full, verified journey from farm to shelf.


---

## Tech Stack

| Layer             | Tech Used                                                   |
|-------------------|-------------------------------------------------------------|
| Frontend          | React (with Next.js App Router, TypeScript)                 |
| Styling           | Tailwind CSS                                                |
| Backend           | Next.js (API Routes),Typescript(.ts),Prisma ORM             |
| Database          | PostgreSQL                                                  |
| Auth              | Cookie Sessions                                             |
| Package           | npm                                                         |
| IPFS & (Pinata)   | Decentralized file storage                                  |
| Solidity & Polygon| For writing and deploying our on-chain smart contract.      |
| Ethers.js         | To connect our backend service to the blockchain            |                                            

---

## Getting Started – Local Development Setup

### 1. **Clone the Repository**

```bash
git clone https://github.com/Parshv-sudo/VEDATRACE.git
cd VEDATRACE
```
Make your .env file by following the .env.example file.

### 2. Install Dependencies
```
npm install
```
You can see all project dependencies listed in package.json.

### 3. Set Up the Database
➤ Start PostgreSQL locally (make sure it's running on port 5432). Create a database called vedatrace manually OR run:
```
CREATE DATABASE vedatrace;
```
➤ Create a .env file at the root:
```
DATABASE_URL="postgresql://youruser:yourpassword@localhost:5432/vedatrace"
```
If your password includes special characters then URL-encode.
### 4. Prisma Setup
```
npx prisma db pull     # Pull the DB schema
npx prisma generate    # Generate Prisma client
```
Your models will be in prisma/schema.prisma.

### 5. Run the App Locally
```
npm run dev
```
Your app should now be running at: http://localhost:3000

### Contributing
Before You Start
```
-Pull the latest changes from main:
-Create a new branch:
-Make your changes and commit:
-Push and open a Pull Request:
```


