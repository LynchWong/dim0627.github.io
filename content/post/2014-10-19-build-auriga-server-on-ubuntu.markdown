---
title: "build-auriga-server-on-ubuntu"
titleja: "UbuntuにAurigaを構築してみる"
eyecatch: "ubuntu.png"
date: 2014-10-19
comments: true
tags: [auriga, clang, linux, ubuntu]
---

今更だがAurigaの構築をやってみる。

どこもWindows環境での構築方法しか載ってないような印象なんだけどそんなことないのかな。

## ソースのダウンロード

[Auriga Project](http://auriga.moe.hm/Auriga/)からソースを落とす。

言うまでもないけどバージョン番号は最新とかで。

``` sh
$ wget -O auriga.zip http://auriga.moe.hm/Auriga/snapshotmanager.php?num=1221
$ unzip auriga.zip
```

## コンパイル

なんか事前の設定とか必要なんだろうけど何も考えずにコンパイルしてみよう。

``` sh
$ cd Auriga-1221full
$ make
```

で、エラーした。

``` sh
../common/grfio.c:87:20: fatal error: zlib.h: No such file or directory
   #include <zlib.h>
                    ^
compilation terminated.
make[1]: *** [../common/grfio.o] Error 1
make[1]: Leaving directory `/home/daisuketsuji/Downloads/Auriga-1221Full/src/map'
```

zlibがないらしい。

``` sh
$ sudo apt-get install zlib1g
$ sudo apt-get install zlib1g-dev
```

これで通った。

## grfファイルの準備

grfファイルを用意しなきゃいけなかったらしい。

コンパイル前にすることはなかったな。Winならあるのかもね。

とりあえずgrfファイルはクライアント側にあるので、公式の[クライアントダウンロード](http://ragnarokonline.gungho.jp/beginner/download.html)からダウンロード & インストール。

Ubuntuじゃインストール出来ないから、Windowsでインストールして持ってくんのだるかった・・・。

持ってきたら`conf/grf-files.txt`に追記。

Aurigaと同じフォルダに入れたのでこんな感じに。

``` sh
grf: ./data.grf
```

不要な行はコメントアウトで。

## サーバ起動

Linuxの場合起動は`auriga-start`を使うみたい。

解凍直後は実行権限がないので`sudo chmod 744 auriga-start`をしとく必要あり。

で、`./auriga-start start`で起動。

``` sh
chrif: connection to the char server was closed. kick all chars
```

そしてエラー。

ここで一日詰まった。

ログをよく見てみるとこんな感じの出力が。

``` sh
connect login server error : 3
```

プロセスを見てみるとloginサーバが生きててcharサーバが死んでるので、charサーバがloginサーバにつなげずに落ちてるんだろう。

`log/`に出力されるログを見ているとどうやらアカウントの設定が必要らしい。

サーバを一度起動すると、エラーしようがなんだろうが`save/`以下にセーブデータが作成されるので、そいつを編集する。

`save/account.txt`に以下を追記。

``` sh
0 s1 p1 - S 0 0 @
```

ちなみに詰まったのは、ここに追記するフォーマットが全然わからなかったから笑

tsvになってるみたいなので、タブ区切りで追加しないと読み込まれません。

## httpdに接続してみる

サーバが起動してる時は`http://127.0.0.1:6900/`にアカウント登録用の画面が公開される。

はずなのに表示出来ない。

``` sh
parse_login : session #5 292 0x4547
parse_login: unknown packet 0x4547 disconnect session #5
```

結構詰まったんだけど、原因究明の鍵は`src/login/login_httpd.c:L38`の以下行でした。

``` c
#ifndef NO_HTTPD
```

makeの時にhttpdを無効にしちゃってたみたい。

なので`Makefile`の115行目にあるフラグをコメントアウトすればOK。

``` c
# disable httpd
CFLAGS += -DNO_HTTPD
```

というわけで、

[{% img /images/2014-10-19/httpd.png httpd %}](/images/2014-10-19/httpd.png)

出来ました。
