---
slug: "learn-git-rm-command"
title: "git管理したくないファイルを除外する"
eyecatch: "git.png"
date: 2014-09-28
comments: true
tags: [git]
---

ローカル環境でちょこちょこ作ってたやつを本番環境に載せたんだけど、それなりに解決してた環境依存が少し残ってて.gitignoreファイルをちゃんと書くことに。

しかし本番でcloneしてきたファイルを**うまいことワーキングには残してインデックスから消すやりかた**がわからない！

というわけで少しくらいまともに勉強してみる。

最初につまづいてたのはこのコマンドを連発してたから。

``` sh
$ git rm filename
```

どうやらこいつはインデックスだけでなくワーキングディレクトリからも消すようだ。

そこでインデックスからだけ消すものはないのかと調べてたらあった。

``` sh
$ git rm --cached filename
```

## 参考にさせて頂きました

[transitive.info - git rm 使い方](http://transitive.info/article/git/command/rm/)
