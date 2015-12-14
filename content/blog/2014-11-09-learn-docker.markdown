---
slug: "learn-docker"
title: "Docker事始め"
date: 2014-11-09
tags: [docker]
---

ちょっとやりたいことがあって、[Docker](http://www.docker.com/)を使ってみることに。

ドキュメントは[Dockerizing Applications: A "Hello world"](https://docs.docker.com/userguide/dockerizing/)から一通り読んだんだけど、

触りながらやってもちょっと覚えるのが大変そうだからまとめてみる。

<!-- more -->

## 何が出来る？何に使う？

[Vagrant](https://www.vagrantup.com/)みたいに仮想環境をバンバン立ち上げることが出来るって認識は合ってそう。

しかしコンテナ型だから速いとかGolangで出来てるとか、各所は難しい話ばっかで**何が出来て何に使う**ってのがいまいち見えてこないんだな。

特に僕みたいに、知識はないけどやってみたい人はそれじゃ理解が進まない！

ちなみに僕の場合、Vagrantはアプリケーション単位に環境を作っています。

開発するときは、ホストで書く->ゲストで動かす、って感じに動作環境として使ってるんだけど、

その点DockerはWebサーバとかDBサーバとか、そういう単位に仮想環境を作ってそれらを連携させたりするのが容易らしい。

さらに、環境まるごとバージョン管理ができるんだとか。

作っては捨てる環境ってだけじゃなくて、本番環境みたいに継続維持しなきゃいけない環境とかにも使えるんじゃないのかなあ、っていう印象。

ただ、こんな記事がある通り、

[[翻訳] Dockerについてよくある勘違い](http://techracho.bpsinc.jp/hachi8833/2014_06_16/17982)

本番で動かすなら結構な知識が必要だから安易にやるのはちょっとね、ってのが製作陣の考えのよう。

僕は個人的な環境で使いたいだけだから、特に問題はないね。

## どんな感じに使う？

ドキュメント通りに理解を進めていこう。

例えば、こんな感じでコンテナを起動した上でechoコマンドを実行したり、

``` sh
$ sudo docker run ubuntu:14.04 /bin/echo 'Hello world'
```

こんな感じでインタラクティブモードでの起動が出来たりする。

``` sh
$ sudo docker run -t -i ubuntu:14.04 /bin/bash
root@af8bae53bdd3:/#
```

デーモンとして起動したり、

``` sh
$ sudo docker run -d ubuntu:14.04 /bin/sh -c "while true; do echo hello world; sleep 1; done"
1e5535038e285177d5214659a068137486f96ee5c2e85a4ac52dc83f2ebe4147
```

起動してるデーモンを1つのプロセスとして確認できたりする。

``` sh
$ sudo docker ps
CONTAINER ID  IMAGE         COMMAND               CREATED        STATUS       PORTS NAMES
1e5535038e28  ubuntu:14.04  /bin/sh -c 'while tr  2 minutes ago  Up 1 minute        insane_babbage
```

`CONTAINER_ID`と`NAMES`はコンテナを起動するたびに変わる。

`NAMES`は自分で決めることも出来るとか？

デーモンとして起動したコンテナの出力を見るにはこんな感じ。

``` sh
$ sudo docker logs insane_babbage
hello world
hello world
hello world
. . .
```

止める時はこう。

``` sh
$ sudo docker stop insane_babbage
insane_babbage
```

## Webアプリを動かす

`-d`オプションでデーモンとして常駐するみたいだけど、`-P`でゲストとホスト間のポート転送もやってくれるらしい。

``` sh
$ sudo docker run -d -P training/webapp python app.py
```

ポートを指定する場合は`-p`オプションを使う。

``` sh
$ sudo docker run -d -p 5000:5000 training/webapp python app.py
```

`tail -f`みたいなログ監視をしたい時、

``` sh
$ sudo docker logs -f nostalgic_morse
* Running on http://0.0.0.0:5000/
10.0.2.2 - - [23/May/2014 20:16:31] "GET / HTTP/1.1" 200 -
10.0.2.2 - - [23/May/2014 20:16:31] "GET /favicon.ico HTTP/1.1" 404 -
```

コンテナ内のプロセス確認、

``` sh
$ sudo docker top nostalgic_morse
PID                 USER                COMMAND
854                 root                python app.py
```

いろんな情報の表示、

``` sh
$ sudo docker inspect nostalgic_morse
[{
    "ID": "bc533791f3f500b280a9626688bc79e342e3ea0d528efe3a86a51ecb28ea20",
    "Created": "2014-05-26T05:52:40.808952951Z",
    "Path": "python",
    "Args": [
       "app.py"
    ],
    "Config": {
       "Hostname": "bc533791f3f5",
       "Domainname": "",
       "User": "",
. . .
```

一度作ったコンテナはすぐに再開出来る。

``` sh
$ sudo docker start nostalgic_morse
nostalgic_morse
```

作ったコンテナの確認はこんな感じ。

``` sh
$ sudo docker ps -a
```

この書き方わからなくて結構困った。

## 独自のイメージを作る

利用目的に沿ったコンテナを作ってみる。

まずはベースになるイメージを探す。

``` sh
$ sudo docker search sinatra
NAME                                   DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
training/sinatra                       Sinatra training image                          0                    [OK]
marceldegraaf/sinatra                  Sinatra test app                                0
mattwarren/docker-sinatra-demo                                                         0                    [OK]
luisbebop/docker-sinatra-hello-world                                                   0                    [OK]
bmorearty/handson-sinatra              handson-ruby + Sinatra for Hands on with D...   0
subwiz/sinatra                                                                         0
bmorearty/sinatra                                                                      0
. . .
```

持ってくる。

``` sh
$ sudo docker pull training/sinatra
```

インタラクティブモードで色々設定してもいいけど、Dockerfileに設定をまとめてしまった方がいいみたい。

``` sh
$ mkdir sinatra
$ cd sinatra
$ touch Dockerfile
```

``` ruby
# This is a FROM ubuntu:14.04
MAINTAINER Kate Smith <ksmith@example.com>
RUN apt-get update && apt-get install -y ruby ruby-dev
RUN gem install sinatra
```

反映はこう。

``` sh
$ sudo docker build -t="ouruser/sinatra:v2" .
```

変更をイメージとして確定するときは、こんな感じ。

``` sh
$ sudo docker commit -m="Added json gem" -a="Kate Smith" 0b2616b0e5a8 ouruser/sinatra:v2
4f177bd27a9ff0f6dc2a830403925b5360bfe0b93d476f7fc3231110e7f71b1c
```

## ちょっとまとめる

やっぱりぽいぽい捨てたり、開発者間で同一の環境を作る、というよりかはある程度ロールを明確にした環境を作るのに向いてるのかなあ。

稼働させる環境を作りながら途中でコミット出来たりするのはかなり安心できそう。

ちょうど今回やりたかったことに合致しそうなので、もう少し進めてみよう。
