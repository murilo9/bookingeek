FROM node:20-alpine

RUN mkdir /home/node/bookingeek-app
WORKDIR /home/node/bookingeek-app

COPY . .

RUN corepack enable pnpm
RUN pnpm install

EXPOSE 5173

CMD ["pnpm", "run", "dev", "--host", "0.0.0.0"]