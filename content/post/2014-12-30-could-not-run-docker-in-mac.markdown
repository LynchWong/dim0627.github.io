---
slug: "could-not-run-docker-in-mac"
title: "boot2dockerでCannot connect to the Docker daemon"
eyecatch: "docker.png"
date: 2014-12-30
comments: true
tags: ["docker", "boot2docker"]
---

これまでは普通に手で作ったVMのUbuntu上でDockerを触ってたんだけど、なんかあれだしboot2dockerに移行しようかと。

いろいろやってみようとしたら導入から結構躓いた。

## boot2dockerの導入

[Installing Docker on Mac OS X](https://docs.docker.com/installation/mac/)に沿って導入してみる。

あ、本体はインストーラじゃなくて`brew install boot2docker`で導入してます。

``` sh
b2d$ boot2docker init
2014/12/29 22:59:08 Downloading boot2docker ISO image...
2014/12/29 22:59:09 Latest release is v1.4.1
2014/12/29 23:00:17 Success: downloaded https://github.com/boot2docker/boot2docker/releases/download/v1.4.1/boot2docker.iso
	to /Users/DaisukeTsuji/.boot2docker/boot2docker.iso
Generating public/private rsa key pair.
Your identification has been saved in /Users/DaisukeTsuji/.ssh/id_boot2docker.
Your public key has been saved in /Users/DaisukeTsuji/.ssh/id_boot2docker.pub.
The key fingerprint is:
36:99:81:cf:0b:bd:77:3b:30:9d:66:70:ad:90:ac:35 DaisukeTsuji@DaisukeTsujis-MacBook-Air.local
The key's randomart image is:
+--[ RSA 2048]----+
|                 |
|       .         |
|      . .. . .   |
|       + +E . .  |
|      . So * o   |
|       o.+o *    |
|        o .=.    |
|         . ...   |
|            ..   |
+-----------------+
2014/12/29 23:00:17 Creating VM boot2docker-vm...
2014/12/29 23:00:17 Apply interim patch to VM boot2docker-vm (https://www.virtualbox.org/ticket/12748)
2014/12/29 23:00:17 Setting NIC #1 to use NAT network...
2014/12/29 23:00:17 Port forwarding [ssh] tcp://127.0.0.1:2022 --> :22
2014/12/29 23:00:17 Port forwarding [docker] tcp://127.0.0.1:2375 --> :2375
2014/12/29 23:00:18 Setting NIC #2 to use host-only network "vboxnet1"...
2014/12/29 23:00:18 Setting VM storage...
2014/12/29 23:00:28 Done. Type `boot2docker up` to start the VM.
b2d$ boot2docker status
poweroff
```

あとは`start`すれば使えるのかなと思ったらエラー。

``` sh
b2d$  boot2docker start
2014/12/30 20:56:21 Waiting for VM to be started...
.......
2014/12/30 20:56:43 Started.
2014/12/30 20:56:43 To connect the Docker client to the Docker daemon, please set:
2014/12/30 20:56:43     export DOCKER_HOST=tcp://192.168.59.103:2375
b2d$ docker run hello-world
2014/12/30 20:51:16 Post http:///var/run/docker.sock/v1.13/containers/create: dial unix /var/run/docker.sock: no such file or directory
```

環境変数`$DOCKER_HOST`に`tcp://192.168.59.103:2357`が設定されてなきゃいけなかったっぽい。

これによってboot2dockerで起動したVM中のdockerと接続してるのかな。

と思ったら、

``` sh
b2d$ export DOCKER_HOST=tcp://192.168.59.103:2375
b2d$ docker run hello-world
2014/12/30 20:58:41 Cannot connect to the Docker daemon. Is 'docker -d' running on this host?
```

環境変数を設定してみるもまたエラー。

デーモンと接続できない。

1時間ほど詰まりましたが最悪な原因でした。

``` sh
b2d$ brew update
b2d$ brew upgrade docker
b2d$ brew upgrade boot2docker
b2d$ boot2docker delete
b2d$ boot2docker init
b2d$ boot2docker up
b2d$ docker version
Client version: 1.4.1
Client API version: 1.16
Go version (client): go1.4
Git commit (client): 5bc2ff8
OS/Arch (client): darwin/amd64
Server version: 1.4.1
Server API version: 1.16
Go version (server): go1.3.3
Git commit (server): 5bc2ff8
b2d$ docker run hello-world
Unable to find image 'hello-world:latest' locally
hello-world:latest: The image you are pulling has been verified
511136ea3c5a: Pull complete
7fa0dcdc88de: Pull complete
ef872312fe1b: Pull complete
Status: Downloaded newer image for hello-world:latest
Hello from Docker.
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (Assuming it was not already locally available.)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

For more examples and ideas, visit:
 http://docs.docker.com/userguide/
```

パッケージが古かった・・・。

## 参考にさせて頂きました

[Cannot connect to the Docker daemon · Issue #80 · boot2docker/osx-installer](https://github.com/boot2docker/osx-installer/issues/80)

[How to Use Docker on OS X: The Missing Guide | Viget](http://viget.com/extend/how-to-use-docker-on-os-x-the-missing-guide)

[Dockerについて調べてみたのでめもめも - Qiita](http://qiita.com/uchihara/items/d1b1885866949b63f7dc)

[docker API を使ってみる - ようへいの日々精進 XP](http://inokara.hateblo.jp/entry/2013/09/30/234806)

[OS X をサポートした Docker 0.8 を試す - Qiita](http://qiita.com/kanekoa/items/cf3cabb23da69c609002)

