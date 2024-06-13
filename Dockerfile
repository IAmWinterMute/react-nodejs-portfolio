FROM node:20-alpine

#Installing global installations
RUN npm install typescript@5 -g
RUN npm install esbuild -g

#Running npm install
WORKDIR /app/
COPY package.json .
RUN npm install

#Compiling typescript
COPY ./source/ ./source/
COPY tsconfig.json .
RUN tsc

#Bundling the customer app with browserify
RUN esbuild ./build/client/moreSPA/moreSPA.js --outdir=./moreSPA/ --bundle --minify
RUN esbuild ./build/client/martinSPA/martinSPA.js --outdir=./martinSPA/ --bundle --minify
RUN esbuild ./build/client/birdySPA/birdySPA.js --outdir=./birdySPA/ --bundle --minify

#Compiling resources to run folder
RUN cp -r ./build/server ./server
RUN cp -r ./build/sharedLayer ./sharedLayer
RUN cp -r ./source/client/moreSPA/assets ./moreSPA/assets
RUN cp -r ./source/client/martinSPA/assets ./martinSPA/assets
RUN cp -r ./source/client/birdySPA/assets ./birdySPA/assets
RUN cp -r ./source/server/assets ./server/assets

#Expose the correct ports 
EXPOSE 3000

#Start the applicationls
CMD ["npm", "start"]

