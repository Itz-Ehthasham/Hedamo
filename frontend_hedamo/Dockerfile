FROM node:18-alpine as build

WORKDIR /app

# Set proper permissions
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY package*.json ./
RUN npm ci

COPY . .

# Fix permissions for node_modules
RUN chown -R nextjs:nodejs /app
RUN chmod -R 755 /app/node_modules/.bin

# Switch to non-root user
USER nextjs

RUN npm run build

FROM nginx:alpine

# Switch back to root for nginx setup
USER root

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]