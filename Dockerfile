
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Create a .env file from .env.example if .env doesn't exist
RUN if [ ! -f .env ]; then cp -n .env.example .env || echo "No .env.example file found"; fi

EXPOSE 8080

CMD ["npm", "run", "dev"]
