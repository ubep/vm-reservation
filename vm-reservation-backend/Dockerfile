FROM node:latest

ADD . /etc/vm-reservation-backend
WORKDIR /etc/vm-reservation-backend

RUN \
    npm install && \
    node setup_db.js

EXPOSE 3000 

CMD ["node", "index.js"]