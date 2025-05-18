
# Budget Tracker Backend API

This is a Spring Boot application that provides API endpoints for the Budget Tracker application.

## Requirements

- Java 17 or higher
- Maven
- PostgreSQL database

## Configuration

Before running the application, you need to:

1. Set up your Firebase service account credentials:
   - Obtain a service account key file from the Firebase Console
   - Replace the placeholder values in `src/main/resources/serviceAccountKey.json` with your actual Firebase credentials

2. Configure database connection:
   - Update the database connection properties in `src/main/resources/application.properties` if needed
   - By default, it uses the same PostgreSQL database as configured in the docker-compose.yml file

## Building and Running

### Using Maven

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Using Docker

The backend service can be added to your docker-compose.yml file:

```yaml
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8081:8081"
    environment:
      - PG_HOST=db
      - PG_PORT=5432
      - PG_USER=postgres
      - PG_PASSWORD=postgres
      - PG_DATABASE=budget_tracker
    depends_on:
      - db
```

## API Endpoints

### Budgets

- `GET /api/budgets?year={year}&month={month}&currency={currency}` - Get budget for a specific year, month and currency
- `POST /api/budgets` - Create a new budget
- `PUT /api/budgets` - Update an existing budget
- `DELETE /api/budgets?year={year}&month={month}&currency={currency}` - Delete a budget

### Transactions

- `GET /api/transactions` - Get all transactions
- `GET /api/transactions?year={year}&month={month}` - Get transactions for a specific year and month
- `GET /api/transactions?currency={currency}` - Get transactions for a specific currency
- `GET /api/transactions/{id}` - Get a specific transaction
- `POST /api/transactions` - Create a new transaction
- `PUT /api/transactions/{id}` - Update an existing transaction
- `DELETE /api/transactions/{id}` - Delete a transaction

## Authentication

All API endpoints are protected and require a valid Firebase ID token. The token should be included in the request header as:

```
Authorization: Bearer {your-firebase-id-token}
```
