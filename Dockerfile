# pull official base image
FROM node:13.12.0-alpine AS builder

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY webpack.config.js ./
COPY . ./


RUN yarn build



# add app


FROM nginx:alpine AS final

COPY --from=builder /app/build/ /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 8080

CMD  ["nginx", "-g", "daemon off;"]