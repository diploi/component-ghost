# This will be set by the GitHub action to the folder containing this component.
ARG FOLDER=/app

FROM ghost:alpine

COPY --chown=1000:1000 . /app
COPY --chown=1000:1000 ./adapters/DiploiFilesStorage.j[s] /var/lib/ghost/versions/$GHOST_VERSION/core/server/adapters/storage/
COPY --chown=1000:1000 ./adapters/DiploiImagesStorage.j[s] /var/lib/ghost/versions/$GHOST_VERSION/core/server/adapters/storage/
COPY --chown=1000:1000 ./adapters/DiploiMediaStorage.j[s] /var/lib/ghost/versions/$GHOST_VERSION/core/server/adapters/storage/

ENV NODE_ENV=production
ENV paths__contentPath=${FOLDER}

USER 1000:1000