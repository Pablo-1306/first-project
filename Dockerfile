FROM node:22.8.0-alpine3.20

RUN addgroup -g 1001 bookshelf && adduser -D -u 1001 -G bookshelf bookshelf

WORKDIR /app

COPY --chown=bookshelf .next/standalone ./
COPY --chown=bookshelf .next/static ./.next/static
COPY --chown=bookshelf public ./public

ENV NODE_ENV=production
ENV PORT=3000

USER bookshelf

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl --fail http://${ip -o -4 addr list | grep eth0 | awk '{print $4}'}

CMD ["node", "server.js"]