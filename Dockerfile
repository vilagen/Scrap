FROM node:12.4
EXPOSE 8800

WORKDIR /user/src/scrap-api

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]