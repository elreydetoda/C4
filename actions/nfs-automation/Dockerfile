FROM node:12-alpine
COPY . /nfs-automation
WORKDIR /nfs-automation
RUN npm install
RUN ls
ENTRYPOINT [ "/nfs-automation/entrypoint.sh" ]
