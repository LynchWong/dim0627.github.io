---
comments: true
date: 2015-01-22T15:37:14+09:00
eyecatch: "vagrant.png"
slug: "install-postgresql-on-centos"
tags: ["linux", "postgresql", "centos"]
title: "Vagrant + CentOS + PostgreSQLを最速で構築"
---

herokuにのっけるアプリを作るとき、ローカルではSQLite使ってたんだけどもう色々つらい。

なんか整数で定義したカラムに文字列入るし！

なんかオートインクリメントの設定の仕方がPostgreSQLと違うし！

つらい。

なのでもう、さっとPostgreSQLだけ入った仮想環境を作ってホスト側から繋げるようにしたい。

## Vagrantfileの設定

もう面倒なのはいやなのでCentOSとIPの設定だけやるよ。

``` ruby
# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "chef/centos-6.5"
  config.vm.network "private_network", ip: "192.168.33.10"
end
```

## PostgreSQLの導入

```
[vagrant@localhost ~]$ sudo yum install postgresql
[vagrant@localhost ~]$ sudo yum install postgresql-server
[vagrant@localhost ~]$ sudo yum install postgresql-contrib
```

さくっと入るやん！

## どうやって繋ぐのかな

もうほんとPostgreSQLの使い方がわかんない、MySQLばっか触ってたからわかんない。

そもそもサービス名はなによ。

```
[vagrant@localhost ~]$ service postgresql
Usage: /etc/init.d/postgresql {start|stop|status|restart|condrestart|try-restart|reload|force-reload|initdb}
[vagrant@localhost ~]$ service postgresql status
postmaster is stopped
[vagrant@localhost ~]$ sudo service postgresql start

/var/lib/pgsql/data is missing. Use "service postgresql initdb" to initialize the cluster first.
                                                           [FAILED]
```

`postgresql`か、でもなんか起動しないね。

なんか`initdb`とやらで初期化をしなきゃいけないらしい。

```
[vagrant@localhost ~]$ sudo -u postgres /usr/bin/initdb -D /var/lib/pgsql/data
could not change directory to "/home/vagrant"
The files belonging to this database system will be owned by user "postgres".
This user must also own the server process.

The database cluster will be initialized with locale en_US.UTF-8.
The default database encoding has accordingly been set to UTF8.
The default text search configuration will be set to "english".

fixing permissions on existing directory /var/lib/pgsql/data ... ok
creating subdirectories ... ok
selecting default max_connections ... 100
selecting default shared_buffers ... 32MB
creating configuration files ... ok
creating template1 database in /var/lib/pgsql/data/base/1 ... ok
initializing pg_authid ... ok
initializing dependencies ... ok
creating system views ... ok
loading system objects' descriptions ... ok
creating conversions ... ok
creating dictionaries ... ok
setting privileges on built-in objects ... ok
creating information schema ... ok
vacuuming database template1 ... ok
copying template1 to template0 ... ok
copying template1 to postgres ... ok

WARNING: enabling "trust" authentication for local connections
You can change this by editing pg_hba.conf or using the -A option the
next time you run initdb.

Success. You can now start the database server using:

    /usr/bin/postgres -D /var/lib/pgsql/data
or
    /usr/bin/pg_ctl -D /var/lib/pgsql/data -l logfile start
```

んん？`/usr/bin/postgres -D /var/lib/pgsql/data`で起動出来るの？

でも`service`でやるよ！

```
[vagrant@localhost ~]$ sudo service postgresql start
Starting postgresql service:                               [  OK  ]
```

出来るやん！

ゲスト内で繋がるかな。

```
[vagrant@localhost ~]$ psql -U postgres
psql (8.4.20)
Type "help" for help.

postgres=# \q
```

出来るやん！

ホスト側からいけるかな。

```
~/Develop/clj_rss$ psql -h 192.168.33.10 -U postgres
psql: could not connect to server: Connection refused
	Is the server running on host "192.168.33.10" and accepting
	TCP/IP connections on port 5432?
```

いけないね。

## 接続の設定

`/var/lib/pgsql/data/postgresql.conf`のコメントアウトを外したり`*`にしたりこんな感じに。

```
listen_addresses = '*'          # what IP address(es) to listen on;
                                        # comma-separated list of addresses;
                                        # defaults to 'localhost', '*' = all
                                        # (change requires restart)
port = 5432                             # (change requires restart)
```

`/var/lib/pgsql/data/pg_hba.conf`にこれを追加する感じに。

```
host    all         all         0.0.0.0/0             trust
```

いけるかな？

```
~/Develop/clj_rss$ psql -h 192.168.33.10 -U postgres                                                                                               (master✱)
psql (9.3.5, server 8.4.20)
Type "help" for help.

postgres=# \q
```

いけた！

## 参考にさせて頂きました

[Vagrant で Windows に Postgres on CentOS 環境を構築 - 弘法にも筆の誤り](http://iwa4.hatenablog.com/entry/2014/05/30/190000)

[PostgreSQLへの接続 - PostgreSQLへの接続と切断 - PostgreSQLの使い方](http://www.dbonline.jp/postgresql/connect/index2.html)

