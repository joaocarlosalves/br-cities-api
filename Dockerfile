FROM node:18 AS builder
WORKDIR /app
COPY package*.json tsconfig.json ./
COPY src ./src
RUN npm install 
RUN npm run db
RUN npm run build

# Etapa final
FROM node:18-slim
WORKDIR /app
COPY package*.json ./
COPY --from=builder /app/dist ./dist
RUN npm install --only=production
RUN npm run db
RUN npm run build
EXPOSE 4000
CMD ["npm", "run", "dev"]
