FROM node:18-slim

# Add curl for healthcheck
RUN apt-get update \
    && apt-get install -y --no-install-recommends curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install nodemon globally for local development (file watching)
RUN npm install -g nodemon

# Copy package*.json files
COPY package*.json ./

# Install dependencies and clean the cache
RUN npm ci \
    && npm cache clean --force

# Copy the rest of the application
COPY . .

# Copy .env.example file to .env (if you don't have a .env file, create a .env.example file with default values)
COPY .env .env

# Expose the port specified in the .env file or default to 80
ARG DEFAULT_PORT=80
ENV PORT=${DEFAULT_PORT}
EXPOSE ${DEFAULT_PORT}

CMD ["node", "server.js"]