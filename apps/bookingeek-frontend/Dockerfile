FROM node:20-alpine

RUN mkdir /home/node/bookingeek-frontend
WORKDIR /home/node/bookingeek-frontend

COPY . .

RUN corepack enable pnpm
RUN pnpm install

EXPOSE 5173

CMD ["pnpm", "run", "dev", "--host", "0.0.0.0"]