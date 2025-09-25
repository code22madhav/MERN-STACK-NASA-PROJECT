# ---- Build stage ----
FROM node:lts-alpine AS builder

WORKDIR /app

# Install client deps (with devDependencies)
COPY client/package*.json ./client/
RUN npm install --prefix client

# Making public so that ../server/public exists for react build
RUN mkdir -p server/public

# Copy client code
COPY client ./client

# Build React app into server/public
RUN npm run build --prefix client


# ---- Production stage ----
FROM node:lts-alpine

WORKDIR /app

# Install only server production deps
COPY server/package*.json ./server/
RUN npm install --omit=dev --prefix server

# Copy server source code
COPY server ./server

# Copy built React app from builder
COPY --from=builder /app/server/public ./server/public

USER node

EXPOSE 5000
CMD ["npm", "start", "--prefix", "server"]