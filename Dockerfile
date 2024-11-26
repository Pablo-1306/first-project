FROM node:22.8.0-alpine3.20 

RUN addgroup -g 1001 atemporal && adduser -D -u 1001 -G atemporal atemporal

WORKDIR /app

COPY --chown=atemporal .next/standalone ./
COPY --chown=atemporal .next/static ./.next/static
COPY --chown=atemporal public ./public

ENV NODE_ENV=production
ENV PORT=3000

USER atemporal

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl --fail http://${ip -o -4 addr list | grep eth0 | awk '{print $4}'}

CMD ["node", "server.js"]