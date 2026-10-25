# منصة لجنة المسؤولية المجتمعية - خادم Node يخدّم الموقع ويحفظ البيانات المشتركة
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production PORT=10000
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --no-audit --no-fund
COPY server.js index.html sw.js manifest.webmanifest ./
COPY css ./css
COPY js ./js
COPY lib ./lib
COPY db ./db
COPY migrations ./migrations
COPY assets ./assets
EXPOSE 10000
CMD ["node", "server.js"]
