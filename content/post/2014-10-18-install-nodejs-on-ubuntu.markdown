---
title: "install-nodejs-on-ubuntu"
titleja: "Ubuntuにnode.jsをインストールする"
eyecatch: "nodejs.png"
date: 2014-10-18
comments: true
categories: [node.js]
---

そろそろ新しいことをやらねばなと思うので、node.jsに手を出してみるよ。

node.jsはmake & make installを推奨しているとのことなので、とりあえずソースを持ってくる。

``` sh
$ wget http://nodejs.org/dist/v0.10.32/node-v0.10.32.tar.gz
$ tar zxvf node-v0.10.32.tar.gz
$ make
```

そしてエラー

``` sh
flock: g++: No such file or directory

make[1]: * [/home/daisuketsuji/Develop/node/out/Release/openssl-cli] Error 69

make[1]: Leaving directory `/home/daisuketsuji/Develop/node/out'

make: * [node] Error 2
```

g++がない。

[build-essential](http://packages.ubuntu.com/lucid/build-essential)を使えばいいらしい。

``` sh
$ sudo apt-get install -y build-essential
$ make
$ make install
```

またエラー

``` sh
installing /usr/local/bin/node
Traceback (most recent call last):
  File "tools/install.py", line 191, in <module>
    run(sys.argv[:])
  File "tools/install.py", line 186, in run
    if cmd == 'install': return files(install)
  File "tools/install.py", line 130, in files
    action(['out/Release/node'], 'bin/node')
  File "tools/install.py", line 79, in install
    def install(paths, dst): map(lambda path: try_copy(path, dst), paths)
  File "tools/install.py", line 79, in <lambda>
    def install(paths, dst): map(lambda path: try_copy(path, dst), paths)
  File "tools/install.py", line 70, in try_copy
    try_unlink(target_path) # prevent ETXTBSY errors
  File "tools/install.py", line 33, in try_unlink
    os.unlink(path)
OSError: [Errno 13] Permission denied: '/usr/local/bin/node'
make: *** [install] Error 1
```

ああ・・・。

``` sh
$ sudo make install
```

行けたっぽいのでインタラクティブシェルを起動してみる。

``` sh
daisuketsuji@daisuketsuji-VirtualBox:~/Develop/node-v0.10.32$ node
> console.log("hello world")
hello world
```

worked!

## そもそもnode.jsって？

色んなところでこう書いてある。

> JavaScriptを用いたNon-blocking I/O環境
>
> 「イベントループモデルで、ノンブロッキングI/Oを使用している」

これらについては以下の記事を参考にさせてもらいました。

[node.js とは何か - I am Bad at Math](http://d.hatena.ne.jp/badatmath/20101020/1287587240)

[node.jsの仕組み（ノンブロッキングI/Oとかスレッドとか） - 元リア充エンジニアのメモ](http://satoshun00.hatenadiary.com/entry/2012/08/02/172936)

nginxが流行ってるのは知ってたし、メモリを食わないっていうのも聞いてはいたけど、そういう背景があったんですね。


