FROM node:7.7.1-alpine

RUN mkdir -p /usr/local/ui \
&& apk update \
&& apk upgrade \
&& apk add -q vim \
&& apk add -q nano;

WORKDIR /usr/local/ui

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn

COPY . .
RUN yarn run build

EXPOSE 3000
ENTRYPOINT ["npm", "start"]
