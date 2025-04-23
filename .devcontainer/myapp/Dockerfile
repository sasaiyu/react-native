FROM mcr.microsoft.com/devcontainers/typescript-node:22

# ARG PKG=""

RUN apt-get update \
    && export DEBIAN_FRONTEND=noninteractive \
    && apt-get upgrade -y \
    # && apt-get -y install --no-install-recommends ${PKG} \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
