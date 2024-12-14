FROM node:20-alpine

RUN mkdir /home/node/bookingeek-api
WORKDIR /home/node/bookingeek-api

COPY . .

RUN corepack enable pnpm
RUN pnpm install

EXPOSE 3000

CMD ["pnpm", "run", "start:dev"]