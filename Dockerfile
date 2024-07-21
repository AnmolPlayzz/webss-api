FROM ubuntu:latest
RUN apt-get update
RUN apt-get install git -y
RUN apt-get install nodejs npm -y
RUN apt-get install -y libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libnss3 lsb-release xdg-utils wget libgbm-dev
RUN apt-get upgrade
RUN apt update
RUN apt upgrade
RUN apt install -y libasound2t64
RUN echo "git clone running"
RUN git clone https://github.com/AnmolPlayzz/webss-api
RUN cd ./webss-api
ENV PORT=0
ENV API_BLOCKING=1
ENV API_KEY=placeholder
WORKDIR '/webss-api'
RUN npm install
CMD npm start