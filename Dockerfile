FROM oven/bun:1.2-slim AS base

# This will be set by the GitHub action to the folder containing this component.
ARG FOLDER=/app

# Install dependencies into temp directory
# This will cache them and speed up future builds
FROM base AS install

COPY . /app
WORKDIR ${FOLDER}

RUN mkdir -p /temp/dev
RUN cp -t /temp/dev/ package.json bun.lock
RUN mkdir -p /temp/prod
RUN cp -t /temp/prod/ package.json bun.lock

RUN cd /temp/dev && bun install --frozen-lockfile
# Install with --production (exclude devDependencies)
RUN cd /temp/prod && bun install --frozen-lockfile --production

# Copy node_modules from temp directory
FROM base AS prerelease
COPY . /app
WORKDIR ${FOLDER}
COPY --from=install /temp/dev/node_modules node_modules

ENV NODE_ENV=production
RUN bun run build

# Copy production dependencies and source code into final image
FROM base AS release
COPY --from=prerelease --chown=1000:1000 /app /app
COPY --from=install --chown=1000:1000 /temp/prod/node_modules node_modules
WORKDIR ${FOLDER}

ENV NODE_ENV=production

USER 1000:1000

EXPOSE 3000/tcp
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

ENTRYPOINT ["bun", "start"]
