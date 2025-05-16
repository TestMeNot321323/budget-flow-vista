
#!/bin/bash

# Build and start the containers
docker-compose up -d

# Wait for the database to be ready
echo "Waiting for PostgreSQL to start up..."
sleep 5

echo "Your budget tracker application and database are now running!"
echo "- Web app: http://localhost:8080"
echo "- PostgreSQL database: localhost:5432"
echo "  - Username: postgres"
echo "  - Password: postgres"
echo "  - Database: budget_tracker"
