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

COPY . . # We are doing this on purpose -- see comment below
RUN yarn run build

# These copy steps are done separately because Docker works using layers that can be cached.
# So if our package.json does not change, Docker doesn’t need to install the dependencies on each build saving us a lot of time.
# taken from https://blog.risingstack.com/minimal-docker-containers-for-node-js/

EXPOSE 3000
ENTRYPOINT ["npm", "start"]
