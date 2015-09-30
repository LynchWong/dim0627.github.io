---
slug: "learn-git-rm-command"
title: "gitで管理したくないファイルをインデックスから除外する"
eyecatch: "program2.jpg"
date: 2014-09-28
comments: true
tags: [git]
---

ローカル環境でちょこちょこ作ってたやつを本番環境に載せたんだけど、それなりに解決してた環境依存が少し残ってて.gitignoreファイルをちゃんと書くことに。

しかし本番でcloneしてきたファイルを**ワーキングには残してインデックスから消す**方法がわからない。

これだとインデックスからじゃなくワーキングツリーからも消えてしまう。

``` sh
$ git rm filename
```

からこうする。

``` sh
$ git rm --cached filename
```

## 参考にさせて頂きました

[transitive.info - git rm 使い方](http://transitive.info/article/git/command/rm/)
