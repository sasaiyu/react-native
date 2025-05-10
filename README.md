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

## [プロジェクトの起動](./myapp/docs/README.md)

Expo で 起動したアプリケーションを[ADB](https://developer.android.com/tools/adb?hl=ja)で [Android Studio](https://developer.android.com/studio?hl=ja) の emulator から起動する 。Android 仮想デバイス（AVD）は[コンテナ環境で起動できない](https://twosixtech.com/blog/integrating-docker-and-adb/)ため、Windows 上で ADB サーバ と emulator を起動して、以下のコマンドを実行することで emulator と通信させる。

```bash
# adb サーバの起動
adb kill-server
adb -a -P 5037 nodaemon server start
```

正常に動作しない場合は、android stadio を起動して、wipe data をするか、adb で emulator を削除する。ADB クライアントの起動方法は[別紙を参照](./myapp/docs/README.md)。
