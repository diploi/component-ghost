FROM ghost:alpine

# This will be set by the GitHub action to the folder containing this component.
ARG FOLDER=/app

COPY --chown=1000:1000 . /app

# Copy Diploi storage adapters to the Ghost core
RUN cp ${FOLDER}/adapters/Diploi*Storage.js /var/lib/ghost/versions/$GHOST_VERSION/core/server/adapters/storage/ 2>/dev/null || :

ENV paths__contentPath=${FOLDER}

USER 1000:1000