FROM node:12-alpine
COPY . /nfs-automation
WORKDIR /nfs-automation
RUN npm install
ENTRYPOINT [ "./entrypoint.sh" ]
