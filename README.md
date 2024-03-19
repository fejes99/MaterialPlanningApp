# Material Planning Web Application

This project is developed as a part of the master's studies, focusing on the subject of Automation of Production Systems Management.

## Overview

The Material Planning Web Application is designed to facilitate the planning of materials required for production systems. It streamlines the process by integrating roles for planners and buyers within the system.

### Roles:

- **Planner:** Responsible for reserving materials based on production plans or creating purchase requests.
- **Buyer:** Handles purchase requests and generates purchase orders accordingly.

### Key Features:

- **Material Reservation:** Planners can reserve materials based on production plans, ensuring the availability of materials for production.
- **Purchase Request Management:** Planners can create purchase requests for materials needed in production, initiating the procurement process.
- **Purchase Order Generation:** Buyers can generate purchase orders based on received purchase requests, facilitating material acquisition.
- **Receipt Management:** Material counts are updated upon receipt of materials from suppliers, ensuring accurate inventory management.

## Getting Started

To run the application locally, follow these steps:

1. **Environment Setup:** Create a `.env.server` file and provide the `DATABASE_URL` for database connection.

2. **Start the Application:** Execute `wasp start` command to start the application. Dependencies will be installed automatically.

3. **Database Seeding:** Optionally, seed the database with initial data using the command `wasp db seed`.

## File Structure

The project follows a structured approach for better organization:

- **`auth/`**: Handles authentication-related operations.
- **`materials/`**: Manages materials and related functionalities.
- **`products/`**: Manages products and their associations.
- **`productionPlans/`**: Handles production planning operations.
- **`reservations/`**: Manages reservations and their associations.
- **`purchaseRequests/`**: Manages purchase requests and their lifecycle.
- **`suppliers/`**: Manages supplier-related operations.
- **`purchaseOrders/`**: Handles purchase order generation and management.
- **`supplierConfirmations/`**: Manages supplier confirmations.
- **`receipts/`**: Manages receipts and associated operations.

## Technology Stack

Wasp is a tool for building modern web applications, providing an opinionated approach to full-stack development. It utilizes React, Node.js, and Prisma under the hood, with its compiler automating various tasks like authentication, data fetching, and security.
