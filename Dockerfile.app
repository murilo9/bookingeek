FROM node:20-alpine

RUN mkdir /home/node/bookingeek
WORKDIR /home/node/bookingeek

COPY . .

RUN corepack enable pnpm
RUN pnpm install

EXPOSE 5173

CMD ["pnpm", "run", "dev:app"]