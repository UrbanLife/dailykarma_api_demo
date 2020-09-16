FROM node:14 as build

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package-lock.json package.json ./
RUN npm install --silent
COPY ./ ./

RUN npm run prod

#---------- [ NginX STAGE ] ----------
FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf
COPY docker/nginx.conf /etc/nginx/conf.d
VOLUME /var/log/nginx/log

WORKDIR /app
COPY --from=build /app/dist ./
