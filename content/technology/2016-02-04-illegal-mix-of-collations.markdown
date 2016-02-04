---
date: 2016-02-04T17:52:48+09:00
slug: "illegal-mix-of-collations"
tags: ['aws', 'rds', 'mysql']
title: 'Rails+RDSでMysql2::Error: Illegal mix of collations'
---

エラーの全貌はこう。

```
ActionView::Template::Error (Mysql2::Error: Illegal mix of collations (latin1_swedish_ci,IMPLICIT) and (utf8_general_ci,COERCIBLE) for operation 'like': SELECT...
```

`DEFAULT_CHARACTER_SET_NAME`が`latin1`になってしまっているらしく、`like`検索で落ちてしまった。
MySQLの設定を変えなきゃいけないと思い込んでいて、RDSを使っていたからどうしょうもないのかと思って結構焦った。

でもRDSもMySQLの設定は変えられるらしい。そりゃそうか。

[<img src="/images/2016-02-04/params.png" alt="params">](/images/2016-02-04/params.png)

これで直りました。

``` sql
ALTER DATABASE table_name COLLATE = 'utf8_general_ci';
```

## 参考にさせていただきました

[Setting Character Sets and Collations - MariaDB Knowledge Base](https://mariadb.com/kb/en/mariadb/setting-character-sets-and-collations/)

