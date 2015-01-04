---
title: "clojure-on-docker-and-aws-beanstalk"
titleja: "ClojureのWebアプリをDocker + Beanstalkで動かす"
eyecatch: "aws.png"
date: 2014-12-31
comments: true
categories: ["clojure", "docker", "aws", "beanstalk"]
---

たぶんこういうのはドキュメント読んでもわからないので、とにかく一通りの流れを実践してみる。

## Imageの取得

面倒なので[Docker Hub](https://hub.docker.com/account/signup/)からClojureが動く環境を持ってくる。

オフィシャルリポジトリとやらがあったので、それを使います。

Leiningenとか一式が入ってるみたい。

[clojure](https://registry.hub.docker.com/_/clojure/)

## ローカルでの動作確認

とりあえず世界に挨拶が出来るくらいのWebアプリを作っちゃおう。

アプリ自体は重要じゃないので、とりあえずインタラクティブシェル上でちゃちゃっと作っちゃう。

``` sh
b2d$  docker run -i -t clojure /bin/bash
root@e322a11f087d:/home# lein new compojure aws_webapp
Retrieving compojure/lein-template/0.4.1/lein-template-0.4.1.pom from clojars
Retrieving compojure/lein-template/0.4.1/lein-template-0.4.1.jar from clojars
root@e322a11f087d:/home# ls
aws_webapp
root@e322a11f087d:/home# cd aws_webapp/
root@e322a11f087d:/home/aws_webapp# ls
README.md  project.clj	resources  src	test
```

と思ったらcompojureテンプレート自体がすでにHello Worldを実装してた・・・。

そのままサーバ起動しちゃうとこんな感じでブラウザの自動起動のとこでエラーしちゃうので、`lein ring server-headless`で起動する。

``` sh
root@e322a11f087d:/home/aws_webapp# lein ring server
2015-01-01 05:41:35.432:INFO:oejs.Server:jetty-7.6.8.v20121106
2015-01-01 05:41:35.486:INFO:oejs.AbstractConnector:Started SelectChannelConnector@0.0.0.0:3000
Started server on port 3000
Exception in thread "main" java.lang.InternalError: Can't connect to X11 window server using 'localhost:0.0' as the value of the DISPLAY variable., compiling:(/tmp/form-init3570254627486988046.clj:1:72)
```

あとはデーモンとして起動しちゃえばローカルでの確認が出来る。

``` sh
b2d$  docker run -d -t -p 3000:3000 clojure:aws /bin/bash -c "cd /home/aws_webapp; lein ring server-headless"
e9981a71589918791d52888a0cb503bea133611395be58574047cd498c9e6f76
b2d$  docker ps
CONTAINER ID        IMAGE               COMMAND                CREATED             STATUS              PORTS                    NAMES
e9981a715899        clojure:aws         "/bin/bash -c 'cd /h   4 seconds ago       Up 3 seconds        0.0.0.0:3000->3000/tcp   backstabbing_colden
```

起動しているのはboot2dockerの仮想マシン上なので、

``` sh
b2d$  boot2docker ip
192.168.59.103
```

このIPの3000ポートに向けてアクセスすれば、

[<img src="/images/2015-01-01/webapp.png" class="image" alt="webapp">](/images/2015-01-01/webapp.png)

見れます。

ringのサーバは起動が遅いので`docker logs [names]`で確認しながらやるとよい。

## Elastic Beanstalkで動かす

大事なことに気づいたんだけど、BeanstalkはDockerfileとか必要なファイル一式をまとめたzipをアップするらしい。

そもそもソースもイメージに入れちゃうっていうのは考えとしておかしかったね。

なのでwarを`ADD`で置くのが理想的なのかな。

今回は面倒なので、clojureでWebサーバを立ち上げられる`http-kit`というライブラリを使ってやってみます。

ちょうどBeanstalk用のDockerfileとかも用意してくれる[mrmcc3/beanstalk-docker-app](https://github.com/mrmcc3/beanstalk-docker-app)というテンプレートがあったので、これを使わせてもらうことに。

### mrmcc3/beanstalk-docker-appでWebアプリを構築する

何はともあれ`new`して作り直し。

``` sh
temp$ lein new beanstalk-docker-app superapp
Generating clojure app for AWS Beanstalk and docker
```

こんな感じで作られる。

jarとかは`lein uberjar`で作らなきゃダメかも。

``` sh
.
|-- Dockerfile
|-- Dockerrun.aws.json
|-- project.clj
|-- src
|   `-- superapp
|       `-- main.clj
`-- target
    |-- classes
    |   |-- META-INF
    |   |-- clojure
    |   |-- org
    |   `-- superapp
    |-- production.jar
    |-- stale
    |   `-- extract-native.dependencies
    |-- superapp-0.1.0.jar
    `-- superapp-0.1.0.zip
```

Dockerfileはこんな。

``` docker
# Dockerfile for clojure apps on AWS Elastic Beanstalk
# v0.0.1

FROM dockerfile/java
MAINTAINER Michael McClintock, mrmcc3@gmail.com
ADD target/production.jar /root/
EXPOSE 8080
CMD ["java", "-jar", "/root/production.jar"]

# SUPPORT JVM OPTS ?
```

### 動作確認

ローカルでの動作確認はこんな感じ。

``` sh
superapp$ java -jar target/production.jar
13:33:07.705 [main] INFO  superapp.main - starting superapp
13:33:07.710 [main] INFO  superapp.main - serving status message
```

[<img src="/images/2015-01-01/beanstalkDockerApp.png" class="image" alt="beanstalkDockerApp">](/images/2015-01-01/beanstalkDockerApp.png)

### デプロイ

`lein zip`でBeanstalk用のzipが`target`配下に作成されるので、それをアップロード。

`Dockerrun.aws.json`でポートの指定とかやってるんだけど、こいつもzipに入れてしまうとtimeoutしてしまった。

まあそれでも動くんだけどちょっと気持ち悪いので除外。

ポートの指定やらはDockerfileでやってるので問題なく動きます。

デプロイはこんな感じで成功。

[<img src="/images/2015-01-01/deploy.png" class="image" alt="deploy">](/images/2015-01-01/deploy.png)

しかしデプロイは結構時間かかるなー。

Javaの起動とかライブラリのダウンロードで食ってるのかな・・・。

## 参考にさせて頂きました

[Dockerを勉強するための、Docker解説記事のまとめ](http://wslash.com/?p=5584)

[これから始める「DockerでかんたんLAMP環境 for CentOS」](http://knowledge.sakura.ad.jp/tech/1811/)

[CLOJURE WEBSOCKET SERVER ON ELASTIC BEANSTALK](http://nudaygames.squarespace.com/blog/2014/12/13/clojure-websocket-server-on-elastic-beanstalk)

[Dockerfile の書き方「私的」なベストプラクティス（3）〜サービスの起動について〜](http://inokara.hateblo.jp/entry/2013/12/29/215322)

