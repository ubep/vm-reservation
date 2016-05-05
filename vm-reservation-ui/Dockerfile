FROM node:latest

ADD . /etc/vm-reservation-frontend
WORKDIR /etc/vm-reservation-frontend

RUN \
    apt-get update && \
    apt-get install -y --no-install-recommends nginx && \
    service nginx restart


RUN \
    npm install -g bower && \
    bower --allow-root install && \
    ln -s /etc/vm-reservation-frontend /usr/share/nginx/html/app