FROM node:18

WORKDIR /app

COPY . .

RUN npm install fastify @fastify/jwt fastify-bcrypt @fastify/cookie better-sqlite3

EXPOSE 3001

CMD ["npm", "run", "start"]
