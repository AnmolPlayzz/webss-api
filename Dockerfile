FROM ubuntu:latest
RUN apt-get update
RUN apt-get install git -y
RUN apt-get install nodejs npm -y
RUN git clone https://github.com/AnmolPlayzz/webss-api
RUN cd ./webss-api
ENV PORT=0
ENV API_BLOCKING=1
ENV API_KEY=placeholder
WORKDIR '/webss-api'
RUN npm install
CMD npm start