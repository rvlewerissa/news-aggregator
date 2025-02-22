# --- Stage 1: Builder ---
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./

# Use --legacy-peer-deps to fix dependency issues
RUN npm ci --legacy-peer-deps

# Copy the rest of the app
COPY . .

# Set environment variables
ENV NEWS_API_KEY=$NEWS_API_KEY
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV GUARDIAN_API_KEY=$GUARDIAN_API_KEY

# Build the Next.js app
RUN npm run build

# --- Stage 2: Production ---
FROM node:18-alpine AS runner

# Set working directory
WORKDIR /app

# Copy build artifacts
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/package.json package.json
COPY --from=builder /app/node_modules node_modules

# Set environment variables
ENV NODE_ENV=production
ENV NEWS_API_KEY=$NEWS_API_KEY
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV GUARDIAN_API_KEY=$GUARDIAN_API_KEY

# Expose port and run
EXPOSE 3000
CMD ["npm", "start"]
