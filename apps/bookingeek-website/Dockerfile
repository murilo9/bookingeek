FROM node:20-alpine

RUN mkdir /home/node/bookingeek-website
WORKDIR /home/node/bookingeek-website

COPY . .

RUN corepack enable pnpm
RUN pnpm install

EXPOSE 3000

CMD ["pnpm", "run", "dev"]