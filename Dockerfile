# syntax=docker/dockerfile:1

FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
# Disable git hooks in Docker/CI installs
ENV HUSKY=0
# Some platforms set NODE_ENV=production during image builds, which makes npm
# omit devDependencies by default. Tailwind/PostCSS are build-time deps, so we
# force-enable dev dependency installation for the build stages.
ENV NODE_ENV=development
ENV NPM_CONFIG_PRODUCTION=false
RUN npm ci

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

# Next.js standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

USER nextjs
EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]
