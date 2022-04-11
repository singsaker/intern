# pull official base image
FROM node:17.3.0

# Create the directory on the node image 
RUN mkdir -p /app

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package*.json /app
RUN yarn install

# add app
COPY . /app

EXPOSE 3000

# start app
CMD ["yarn", "dev"]