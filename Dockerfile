FROM ghost:alpine

# This will be set by the GitHub action to the folder containing this component.
ARG FOLDER=/app

COPY --chown=1000:1000 . /app

ENV NODE_ENV=production
ENV paths__contentPath=${FOLDER}

USER 1000:1000