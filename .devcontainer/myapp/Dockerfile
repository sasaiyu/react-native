FROM mcr.microsoft.com/devcontainers/typescript-node:22

ARG PKG="openjdk-17-jdk socat"

RUN apt-get update \
    && export DEBIAN_FRONTEND=noninteractive \
    && apt-get upgrade -y \
    && apt-get -y install --no-install-recommends ${PKG} \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

USER node
ARG ANDROID_COMMANDLINE_TOOLS_ARTIFACT=https://dl.google.com/android/repository/commandlinetools-linux-13114758_latest.zip
RUN cd ~/ \
    && wget ${ANDROID_COMMANDLINE_TOOLS_ARTIFACT} \
    && unzip commandlinetools-linux-*_latest.zip -d ~/Android \
    && rm -rf commandlinetools-linux-*_latest.zip \
    && cd ~/Android \
    && mv cmdline-tools latest \
    && mkdir cmdline-tools \
    && mv latest cmdline-tools/ \
    && cd cmdline-tools/latest/bin/ \
    && yes | ./sdkmanager --install "platform-tools" "platforms;android-34" "build-tools;34.0.0" \
    && ./sdkmanager --update
ENV ANDROID_HOME=/home/node/Android
ENV PATH=${PATH}:${ANDROID_HOME}/emulator:${ANDROID_HOME}/tools:${ANDROID_HOME}/tools/bin:${ANDROID_HOME}/platform-tools
