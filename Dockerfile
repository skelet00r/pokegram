FROM node:12-alpine

ENV CHROME_BIN="/usr/bin/chromium-browser" \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"
RUN set -x \
    && apk update \
    && apk upgrade \
    && apk add --no-cache \
    udev \
    ttf-freefont \
    chromium

WORKDIR /usr/pokegram/
COPY package*.json ./
COPY ./src ./src/
RUN npm i
EXPOSE 3000
CMD ["npm", "start"]