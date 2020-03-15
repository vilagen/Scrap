FROM node:12.4
EXPOSE 8888

WORKDIR /usr/src/scrap-api

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]