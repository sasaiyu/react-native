# React-Native Sample

React Native の開発環境をコンテナで構築する。

## [DevContainer](https://code.visualstudio.com/docs/devcontainers/containers)

### [images](https://hub.docker.com/r/microsoft/devcontainers-typescript-node)

イメージ含まれるパッケージ

- Node.js
- Typescript
- eslint
- zsh
- git

### [features](https://containers.dev/features)

DevContainer にインストールさせるパッケージ

- [Jest](https://github.com/devcontainers-extra/features/tree/main/src/jest)

## [ADB](https://developer.android.com/tools/adb?hl=ja)

Android 仮想デバイス（AVD）は[コンテナ環境で起動できない](http://blog.flect.co.jp/cloud/2017/04/androiddocker-c3b5.html)ため、WSL2 上で AVD を起動して接続する。WSL2 上で[以下のコマンド](https://twosixtech.com/blog/integrating-docker-and-adb/)を実行して emulator を起動させる。

```bash
# adb クライアントの起動
adb kill-server
export ANDROID_ADB_SERVER_PORT=5038
adb -a -P 5038 nodaemon server start &> /dev/null &


# emulator の起動
emulator -avd Pixel_5 -ports 5554,5555
```

正常に動作しない場合は、android stadio を起動して、wipe data をするか、adb で emulator を削除する。

```bash
# android stadio の起動
/usr/local/android-studio/bin/studio.sh

# adb で emulator を削除
adb -s emulator-5554 emu kill
```

React Native サーバでは [~/Android/platform-tools/adb](https://www.midorimici.com/posts/react-native-wsl) を利用するため、`sdkmanager`をインストールする必要がある。

## React Native

### [NativeWind](https://www.nativewind.dev/)

React Native のために Tailwind CSS のスタイリング手法を利用できるライブラリ。Web とモバイルアプリの開発でスタイリングを統一できる。
