---
date: 2016-02-04T18:00:44+09:00
slug: "libmysqlclient16-not-found"
tags: ['mysql']
title: 'MySQL5.6+ruby-mysql2でlibmysqlclient_16 not found'
---

せっかくなのでMySQLを5.5から5.6にして使おうとしたらエラーした。
MySQL5.6のインストールはこの記事が非常に分かりやすかった。

[【シンプル】CentOS6にMySQL5.6をyumで簡単にインストールする手順 | 田舎に住みたいエンジニアの日記](http://blog.ybbo.net/2014/01/22/%E3%80%90%E3%82%B7%E3%83%B3%E3%83%97%E3%83%AB%E3%80%91centos6%E3%81%ABmysql5-6%E3%82%92yum%E3%81%A7%E7%B0%A1%E5%8D%98%E3%81%AB%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB%E3%81%99%E3%82%8B/)

ところがRails側で`ruby-mysql2`と接合させようとするとライブラリ参照でエラー。

```
LoadError: /usr/lib64/mysql/libmysqlclient.so.18: version `libmysqlclient_16' not found (required by /var/www/pj/shared/bundle/ruby/2.2.0/extensions/x86_64-linux/2.2.0-static/mysql2-0.3.18/mysql2/mysql2.so) - /var/www/pj/shared/bundle/ruby/2.2.0/extensions/x86_64-linux/2.2.0-static/mysql2-0.3.18/mysql2/mysql2.so
```

困ります。
どうやら`ruby-mysql2`を入れるタイミングで問題があったり、そもそもMySQL5.6のライブラリ側にバグがあるっていう話もあった。

[MySQL5.6 だと ruby-mysql2 が入ったふりをする - まいんだーのはてなブログ](http://myfinder.hatenablog.com/entry/2013/04/22/150219)

[awsでcapistrano動かす作業ログ - Qiita](http://qiita.com/pollseed/items/b7d187dbbd64b29820d4)

MySQLを入れたり消したりしてたら直ったので原因も対策も不明。謎。もうやめてね。


