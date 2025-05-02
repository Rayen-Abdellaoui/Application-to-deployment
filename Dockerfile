FROM mongo:latest
COPY ./dump /dump
CMD mongorestore /dump