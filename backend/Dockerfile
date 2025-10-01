FROM node:18-alpine

WORKDIR /app

# Install curl for health checks
RUN apk add --no-cache curl

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S backend -u 1001

COPY package*.json ./
RUN npm ci

COPY . .

# Fix permissions
RUN chown -R backend:nodejs /app
RUN chmod -R 755 /app/node_modules/.bin

# Switch to non-root user
USER backend

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]