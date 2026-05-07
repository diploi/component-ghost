FROM ghost:6.36.0-alpine

# This will be set by the GitHub action to the folder containing this component.
ARG FOLDER=/app

COPY --chown=1000:1000 . /app

ENV paths__contentPath=${FOLDER}
ENV NODE_PATH=/var/lib/ghost/current/node_modules

USER 1000:1000
