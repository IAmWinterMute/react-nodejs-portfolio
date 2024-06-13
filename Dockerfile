FROM node:20-alpine

#Installing global installations
RUN npm install typescript@5 -g
RUN npm install esbuild -g

#Running npm install
WORKDIR /app/
COPY package.json .
RUN npm install

#Compiling vendor bundle
#RUN browserify -p esmify -r react -r react-router -o ./vendor/vendor_large.js
#RUN terser ./vendor/vendor_large.js --compress -o ./vendor/vendor.js

#Compiling typescript
COPY ./source/ ./source/
COPY tsconfig.json .
RUN tsc

#Bundling the customer app with browserify
#RUN browserify  -x react -x react-router ./build/client/publicSPA/publicSPA.js --compress -o ./publicSPA/publicSPA.js
#RUN browserify  -x react -x react-router ./build/client/birdySPA/birdySPA.js --compress -o ./birdySPA/birdySPA.js
RUN esbuild ./build/client/moreSPA/moreSPA.js --outdir=./moreSPA/ --bundle --minify
RUN esbuild ./build/client/martinSPA/martinSPA.js --outdir=./martinSPA/ --bundle --minify
RUN esbuild ./build/client/birdySPA/birdySPA.js --outdir=./birdySPA/ --bundle --minify

#Compiling resources to run folder
#RUN mkdir -p ./publicSPA/
#RUN mkdir -p ./birdySPA/
RUN cp -r ./build/server ./server
RUN cp -r ./build/sharedLayer ./sharedLayer
RUN cp -r ./source/client/moreSPA/assets ./moreSPA/assets
RUN cp -r ./source/client/martinSPA/assets ./martinSPA/assets
RUN cp -r ./source/client/birdySPA/assets ./birdySPA/assets
RUN cp -r ./source/server/assets ./server/assets
#RUN cp ./build/client/publicSPA/publicSPA.js ./publicSPA/publicSPA.js
#RUN cp ./build/client/birdySPA/birdySPA.js ./birdySPA/birdySPA.js 

#Cleaning folders
#RUN rm -r ./build
#RUN rm -r ./source

#Expose the correct ports 
EXPOSE 3000

#Start the applicationls
CMD ["npm", "start"]

