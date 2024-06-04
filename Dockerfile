FROM node:20.13.1-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS deps
RUN pnpm install --prod --frozen-lockfile

FROM base AS build
RUN pnpm install --frozen-lockfile
RUN pnpm build

FROM base
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
RUN pnpm install --global serve
EXPOSE 80
CMD ["serve", "-l", "80", "-s", "dist"]


