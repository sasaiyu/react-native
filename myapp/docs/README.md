# プロジェクトについて

## 構成

### [React Native](https://reactnative.dev/)

React Native サーバでは [~/Android/platform-tools/adb](https://www.midorimici.com/posts/react-native-wsl) を利用するため、`sdkmanager`をインストールする必要がある。

### [NativeWind](https://www.nativewind.dev/)

React Native のために Tailwind CSS のスタイリング手法を利用できるライブラリ。Web とモバイルアプリの開発でスタイリングを統一できる。

## 起動方法

### 事前設定

Windows で起動した emulator と通信をするため、 WSL2 経由でコンテナからのポートフォワードと FW の解除設定を行う。

```powershell
# WSL2からのルーティング設定
netsh interface portproxy add v4tov4 listenport=5554 listenaddress=0.0.0.0 connectport=5554 connectaddress=127.0.0.1

# Expoからのルーティング設定。WSL2へポートフォワード
netsh interface portproxy add v4tov4 listenport=8081 listenaddress=0.0.0.0 connectport=8081 connectaddress=172.17.189.56
```

### 起動

Windows の adb をホストサーバとして起動する。

```bash
# Windows の adb サーバを0.0.0.0向けに開放
adb kill-server
adb -a -P 5037 nodaemon server start
```

WSL2 の adb をクライアントとして起動する（任意）。

```bash
# WSL2 から Windows の emulator に接続
adb kill-server
export ADB_SERVER_SOCKET=tcp:`ip route show | grep -i default | awk '{ print $3}'`:5037
adb devices

# クライアントで起動したadbの通信をWindowsにポートフォワード
sudo apt install socat
socat TCP-LISTEN:5554,reuseaddr,fork TCP:172.17.176.1:5554

# 別のターミナルを起動
adb -s emulator-5554 emu avd name
```

```bash
# デバッグモードでの起動
EXPO_DEBUG=true npm run android
```

### Appendix

Windows で起動しているサービスを調べて終了する。

```bash
# 5037ポートを利用しているサービスを調べる
netstat -aon | Select-String ":5037"
Get-Process -Id <PID>

# サービスを停止する
Stop-Process -Id <PID> -Force
```

Windows のポートフォワードを設定を削除する。

```powershell
# 結果を確認
netsh interface portproxy show all
# リセット
netsh interface portproxy reset proxy
```

Docker Compose でポートフォワードの設定をしているため、以下の設定は不要

````powershell
#FW設定の設定
New-NetFirewallRule -DisplayName "WSL2 Emulator Inbound" -Direction Inbound -LocalPort 5554 -Protocol TCP -Action Allow
New-NetFirewallRule -DisplayName "WSL2 Emulator Outbound" -Direction Outbound -LocalPort 5554 -Protocol TCP -Action Allow
New-NetFirewallRule -DisplayName "WSL2 Emulator Inbound" -Direction Inbound -LocalPort 8081 -Protocol TCP -Action Allow
New-NetFirewallRule -DisplayName "WSL2 Emulator Outbound" -Direction Outbound -LocalPort 8081 -Protocol TCP -Action Allow
``
Windows の FireWall 設定を削除する。

```powershell
#FW設定の確認
Get-NetFirewallRule -DisplayName "*WSL2*" | % { $r=$_; Get-NetFirewallPortFilter -AssociatedNetFirewallRule $r | Select @{n="RuleName";e={$r.DisplayName}}, Protocol, LocalPort, @{n="Direction";e={$r.Direction}} }
# 削除
Remove-NetFirewallRule -DisplayName "WSL2*"
````

Windows の emulator を削除する。

```powershell
# emulatorのデバイスを確認する
adb devices
# emulatorを指定して削除
adb -s emulator-5554 emu kill
```
