FROM node:alpine AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY /package.json client/yarn.lock client/
WORKDIR /app/client
RUN yarn install --frozen-lockfile