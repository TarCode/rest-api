FROM node:boron
MAINTAINER Tarcode <tarcode33@gmail.com>

RUN mkdir -p /api
COPY . /api
WORKDIR /api
RUN npm install --production

ENV PORT 3000
EXPOSE  $PORT

CMD ["npm", "start"]