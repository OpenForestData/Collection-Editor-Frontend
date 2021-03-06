FROM node:12-alpine as build
WORKDIR /app
COPY ./package.json /app/
RUN npm install
COPY . /app

RUN npm run build:prod


FROM nginx:1.19-alpine as publish

RUN apk add --no-cache jq moreutils

COPY --from=build /app/dist/collection-editor-frontend/browser /usr/share/nginx/html
COPY docker/entrypoint.sh /

COPY docker/default.conf /etc/nginx/conf.d/default.conf
COPY docker/mime.types /etc/nginx/mime.types

RUN chmod +x entrypoint.sh

CMD sh -c "/entrypoint.sh && \
    nginx -g 'daemon off;'"
