FROM node:22 as build

WORKDIR /usr/src/app

COPY package*.json .
RUN npm install

COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:22-slim

RUN apt-get update -y && apt-get install -y openssl procps

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/tsconfig*.json ./
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/prisma ./prisma
COPY .env .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]