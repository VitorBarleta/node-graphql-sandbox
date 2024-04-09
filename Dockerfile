FROM node:lts as base
EXPOSE 5000

WORKDIR /app

RUN node --version
RUN npm --version
COPY package.json .
COPY yarn.lock .
RUN yarn

FROM base as build
WORKDIR /app
COPY . .
RUN yarn build

FROM base as final
WORKDIR /app/publish
COPY --from=build /app/dist .
COPY --from=build /app/db /app/publish/db
CMD node index.js& \
yarn json-server /app/publish/db/db.json "$@"