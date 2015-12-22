---
slug: "git-on-proxy"
title: "gitのリポジトリ単位にproxyの設定をする"
date: 2014-09-20
tags: ["git"]
---

会社でもvimを使っててて、plugin管理は[neobundle.vim](https://github.com/Shougo/neobundle.vim)を使ってるんだけど、[GitHub](https://github.com/)で管理してる`.vimrc`を落としてくるときにちょっと手間取った。

まあ簡単に言うと社内から外に出るときはproxyを通るから、gitがうまいこと動いてくれなかったんですね。

## .gitconfigでなんとかなる

じゃあこうしようってことで、`~/.gitconfig`をこんな感じにしたんですよ。

``` sh
[https]
        proxy = http://proxy.com:8080
```

ひとまず解決したんだけど、そしたら社内のgitが使えなくなった。

向き先によって切り替える方法は以下の記事にしっかりまとまってました。

[Git の http proxy に関するまとめ](http://tanacasino.hatenablog.com/entry/2013/12/21/003750)

