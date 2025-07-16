FROM ghost:alpine

# This will be set by the GitHub action to the folder containing this component.
ARG FOLDER=/app

COPY . /app
WORKDIR ${FOLDER}

ENV NODE_ENV=production

USER 1000:1000