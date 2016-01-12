---
date: 2016-01-12T12:04:51+09:00
slug: "pip-install-lxml-was-killed-by-oom-killer"
tags: ['python', 'pip', 'oom-killer']
title: 'さくらVPSでpip install lxmlがOOM Killerに殺される'
---

Python2.7 + BeautifulSoup + lxmlの環境でスクレイピングをしようとしたらlxmlがインストールできなかった。

```
Installing collected packages: lxml
  Running setup.py install for lxml
    Complete output from command /opt/local/bin/python2.7 -c "import setuptools, tokenize;__file__='/tmp/pip-build-9nMFdz/lxml/setup.py';exec(compile(getattr(tokenize, 'open', open)(__file__).read()
.replace('\r\n', '\n'), __file__, 'exec'))" install --record /tmp/pip-8cwa10-record/install-record.txt --single-version-externally-managed --compile:
    /opt/local/lib/python2.7/distutils/dist.py:267: UserWarning: Unknown distribution option: 'bugtrack_url'
      warnings.warn(msg)
    Building lxml version 3.4.4.
    Building without Cython.
    Using build configuration of libxslt 1.1.26
    Building against libxml2/libxslt in the following directory: /usr/lib64
    running install
    running build
    running build_py
    copying src/lxml/includes/lxml-version.h -> build/lib.linux-x86_64-2.7/lxml/includes
    running build_ext
    building 'lxml.etree' extension
    gcc -pthread -fno-strict-aliasing -g -O2 -DNDEBUG -g -fwrapv -O3 -Wall -Wstrict-prototypes -fPIC -I/usr/include/libxml2 -I/tmp/pip-build-9nMFdz/lxml/src/lxml/includes -I/opt/local/include/python
2.7 -c src/lxml/lxml.etree.c -o build/temp.linux-x86_64-2.7/src/lxml/lxml.etree.o -w
    gcc: Internal error: Killed (program cc1)
    Please submit a full bug report.
    See <http://bugzilla.redhat.com/bugzilla> for instructions.
    error: command 'gcc' failed with exit status 1

    ----------------------------------------
Command "/opt/local/bin/python2.7 -c "import setuptools, tokenize;__file__='/tmp/pip-build-9nMFdz/lxml/setup.py';exec(compile(getattr(tokenize, 'open', open)(__file__).read().replace('\r\n', '\n'),
__file__, 'exec'))" install --record /tmp/pip-8cwa10-record/install-record.txt --single-version-externally-managed --compile" failed with error code 1 in /tmp/pip-build-9nMFdz/lxml
```

どうやら`gcc: Internal error: Killed (program cc1)`はOOM Killerにkillされたってことらしい？

この記事も参考になりそうだったけど解決には至らなかった。

[さくらインターネット「さくらのレンタルサーバ」にSubversionをインストールする。 - ScissorHands](http://scissorhands.jpn.org/2011/11/post-260.html)

## swapファイルで対応する

StackOverFlowでswapファイルでやるしかないよみたいな意見が散見されたので、この記事を参考にしました。

[Resolving build errors with python lxml on low memory machines | Wordspeak](https://www.wordspeak.org/posts/resolving-build-errors-with-python-lxml.html)

```
$ sudo dd if=/dev/zero of=/swapfile bs=1024 count=500000
$ sudo mkswap /swapfile
$ sudo swapon /swapfile
```

でswapファイルを作成してインストールを実行したら出来ました。

終わったら削除。

``` shell
$ sudo swapoff /swapfile
$ sudo rm /swapfi
```

## 参考にさせていただきました

[さくらインターネット「さくらのレンタルサーバ」にSubversionをインストールする。 - ScissorHands](http://scissorhands.jpn.org/2011/11/post-260.html)

[Resolving build errors with python lxml on low memory machines | Wordspeak](https://www.wordspeak.org/posts/resolving-build-errors-with-python-lxml.html)

