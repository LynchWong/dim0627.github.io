---
date: 2016-01-08T10:57:35+09:00
slug: "deploying-flask-app-to-sakura-vps"
tags: ["python", "flask", "nginx", "wsgi", "centos", "sakura-vps"]
title: "[Python]Flaskアプリをnginx + wsgiでさくらVPSにデプロイする"
---

CentOS6.5、Python2.7でやります。

CentOS6.5にプリインストールされているPythonは2.6だと思うのですが、Python2.7の導入方法は書きません。
多分いろいろな環境で動いたり動かなかったりしちゃうと思うので。

僕はこの記事を参考にしました。非常に簡単かつ完璧に書かれてて助かりました。こんな記事が書けるようになりたい。

[CentOS に Python2.7, Python3.3を入れたメモ - Qiita](http://qiita.com/a_yasui/items/5f453297855791ed648d)

## uWSGIをインストールする

まあ当然WSGIを使います。PythonをWebアプリとして動かす際のサーバ間仕様ですね。

WSGIで使えるコンテナはWikiを見る限り幾つかあるようです。

[Web Server Gateway Interface - Wikipedia](https://ja.wikipedia.org/wiki/Web_Server_Gateway_Interface)

> WSGIアプリケーションコンテナの例としては、uWSGI, Gunicorn, Apacheモジュール (mod_wsgi, mod_pythonなど), Microsoft IIS（isapi-wsgi, PyISAPIe, ASPゲートウェイを使用）などがある。

今回はuWSGIを使います。

### uWSGI？

公式より引用。

[The uWSGI project — uWSGI 2.0 documentation](https://uwsgi-docs.readthedocs.org/en/latest/)

> The uWSGI project aims at developing a full stack for building hosting services.
> 
> Application servers (for various programming languages and protocols), proxies, process managers and monitors are all implemented using a common api and a common configuration style.

アプリケーションサーバですね。

今回はnginxの向こうにuwsgiを置いてサービスを動作させます。

### インストール

``` sh
pip install uwsgi
```

なんて簡単！

### パラメータオプションでの起動

uWSGIはコマンドから起動設定も含めた起動が出来ます。

例えば、

``` sh
uwsgi --socket 0.0.0.0:8000 --protocol=http -w wsgi_app
```

これで8000ポートで`wsgi_app`がhttp全公開になります。
nginxと連携させる前に、一度このタイミングでアクセス出来るかを見とくと良いですね。

`-w`オプションはわかりづらいのですが、`main.py`にアプリの起動が記述されてる場合は`main`を指定するみたいですね。

パラメータは公式のこのページが参考になりそうです。

[uWSGI Options — uWSGI 2.0 documentation](http://uwsgi-docs.readthedocs.org/en/latest/Options.html)

ちょっとしたロジックも書ける様子。

[Configuration logic — uWSGI 2.0 documentation](http://uwsgi-docs.readthedocs.org/en/latest/ConfigLogic.html)

### iniファイルでの起動

パラメータをたくさんつけるとコマンドが長くなってしまうので`ini`に落とし込みました。
`xml`とかその他の形式でも行けるみたいです。

``` ini
[uwsgi]
chdir = /path/to/src
module = wsgi
socket = /path/to/app.sock
touch-reload = /path/to/reload.trigger
logto = /var/log/uwsgi.log
max-requests = 1000
chmod-socket = 666

uid = www-user
gid = www-group
```

起動は`uwsgi --ini wsgi.ini`みたいな感じ。
ここでも一度アクセスできるかを確認するといいですね。

chdirはカレントディレクトリの指定です。
これがないとコマンドでは動くのにupstartから起動したら動かない、なんてことになったり。

socketについてはこの記事が詳しいです。

[Python - ちゃんと運用するときのuWSGI設定メモ - Qiita](http://qiita.com/yasunori/items/64606e63b36b396cf695#etcnginxconfdsample_nginxconf)

プロダクションで使うならその他細かな設定が必要かと思います。

### upstartから起動させる

別に手で起動しても問題ないと思うのですが、多分ナンセンスなので。

`/etc/init/app.conf`を作って、

``` conf
description "uWSGI"
start on runlevel [2345]
stop on runlevel [06]
respawn

env UWSGI=/path/to/uwsgi
exec $UWSGI --ini /path/to/wsgi.ini
```

`sudo start app`で起動出来ます。この起動の仕方は初めて知りました。

[How To Serve Flask Applications with uWSGI and Nginx on Ubuntu 14.04 | DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-serve-flask-applications-with-uwsgi-and-nginx-on-ubuntu-14-04)

[Linux - upstartでデーモン化してみる - Qiita](http://qiita.com/kuni-nakaji/items/f3426bf69be947c594c4)

## nginxとの連携

インストールは省きます。

``` conf
server {
    listen       80;
    server_name  localhost;
    charset      utf-8;

    location / {
        try_files $uri @uwsgi;
    }

    location @uwsgi {
        include uwsgi_params;
        uwsgi_pass unix:/path/to/app.sock;
    }
}
```

uWSGIが起動して`app.sock`が配備されてる状態であればこれでアクセス出来るはず。

## 参考にさせていただきました

[Python - ちゃんと運用するときのuWSGI設定メモ - Qiita](http://qiita.com/yasunori/items/64606e63b36b396cf695#etcnginxconfdsample_nginxconf)

[How To Serve Flask Applications with uWSGI and Nginx on Ubuntu 14.04 | DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-serve-flask-applications-with-uwsgi-and-nginx-on-ubuntu-14-04)

[Flask + uWSGI + Nginx でハローワールドするまで @ さくらのVPS (CentOS 6.6) - Qiita](http://qiita.com/morinokami/items/e0efb2ae2aa04a1b148b)

[uWSGI で Django を使う方法 — Django 1.4 documentation](http://docs.djangoproject.jp/en/latest/howto/deployment/wsgi/uwsgi.html)

