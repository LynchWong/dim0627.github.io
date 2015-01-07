---
slug: "git-on-proxy"
title: "gitのリポジトリ単位にproxyの設定をする"
eyecatch: "git.png"
date: 2014-09-20
comments: true
tags: [git]
---
## 事の発端
会社ではvimを使ってます。

plugin管理には[neobundle.vim](https://github.com/Shougo/neobundle.vim)使ってます。

`.vimrc`は[GitHub](https://github.com/)で管理してます。

neobundle.vimで管理してるpluginは大抵のものがGitHub上で管理されてるから、インストールとかアップデートをするときはneobundle.vimがGitHubまで見に行ってくれるんですね。

ただ、当然社内はproxyを通していて、gitコマンドが通らない！

ていうかそもそも**GitHubから`.vimrc`を落としてくることすら出来ない！いいやzipで落とせ！**

しかしpluginの導入を手でやるのはだるい・・・。

マジで？サクラエディタで頑張るしかない？

いやいやそんなことはない。

## 解決

じゃあこうしようってことで、`~/.gitconfig`をこんな感じにしたのよ。

``` sh
[https]
        proxy = http://proxy.com:8080
```

ひとまず解決したんです。

そしたら次は**社内のgitに繋がらない！！**

マジかよじゃあ`~/.gitconfig`をちょこちょこ変えるのかよだせえよそれと思ったら既に解決してくれてる人がいた。

[Git の http proxy に関するまとめ](http://tanacasino.hatenablog.com/entry/2013/12/21/003750)

めんどくさかったけど、個々のpluginの`config`にだけproxyの記述を追加することで解決。
