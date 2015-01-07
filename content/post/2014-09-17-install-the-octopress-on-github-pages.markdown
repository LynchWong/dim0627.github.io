---
slug: "install-the-octopress-on-github-pages"
title: "GitHub PagesにOctopressをのっけてみる"
eyecatch: "octopress.png"
date: 2014-09-17
comments: true
tags: [gitHub, octopress, jekyll]
---
[WordPress.com](https://ja.wordpress.com/)を使ってたんだけど、お金払わないと融通がきかないぽいので移行することに。

[Markdown](http://ja.wikipedia.org/wiki/Markdown)が使ってみたかったのと、カッコいいデザインが多そうな[Hatena](http://hatenablog.com/)かなーと思ってたんだけど、[GitHub Pages](https://pages.github.com/)が面白そうなのでとりあえずノリでこっちにしてみるよ。

<!-- more -->

## Github Pages？

[GitHub Pages](https://pages.github.com/)は[GitHub](https://github.com/)に`[ユーザ名].github.io`って名前のリポジトリを作るだけで、pushしたページを外部公開出来るサービス。

そこでよく使われるBlogフレームワーク(?)が[Octopress](http://octopress.org/)らしい。

どうやらOctopressは[Jekyll](http://jekyllrb.com/)という静的ページジェネレータをさらに活用するためのものとのことで、

このJekyll(読みはジキル？)はMarkdownとかで書いたテキストファイルを静的ページに変換したりしてくれるものみたい。

## Octopressをインストールする

[Octopress Setup](http://octopress.org/docs/setup/)が非常に良く書かれているのと、Octopress自体が見通しよく作られているので特に躓くことなく導入出来ました。

Octopressは記事を書くPCに導入して丸ごとGitHubにpushしてしまう仕組みらしく、まずは個人のPCに導入が必要。

``` sh
$ git clone git://github.com/imathis/octopress.git octopress
$ cd octopress
$ gem install bundler
$ rbenv rehash
$ bundle install
$ rake install
```

で、次にデプロイする。

[Deploying](http://octopress.org/docs/deploying/)を見る限り、GitHub Pagesだけじゃなく、HerokuやRsyncでの利用も出来るっぽい。

なんかVPSとかでも運用してる人がいるっぽいね。

前述した通り今回はGitHub Pagesを利用することにしました。

最初に`[ユーザ名].github.io`って名前のリポジトリを作っておく必要があるよ。
``` sh
$ rake setup_github_pages
```

リポジトリのURLとかが聞かれるので、表示された説明の通り入力。

pushしとく必要もあるっぽい。

``` sh
$ rake generate
$ rake deploy
$ git add .
$ git commit -m 'your message'
$ git push origin source
```

`rake deploy`で乗っかるのは記事とかその辺のファイルだけなのかな？

> In a few seconds you should get an email from Github telling you that your commit has been received and will be published on your site.

待ってりゃ公開されるぜとのことで、ちょっと待ったら公開されました。

## 記事を書く

記事は`rake new_post["title"]`で行けるらしい。

でもオレは`alias rake="noglob rake"`しとかなきゃダメだった。

[Octopressで記事が作れない(zsh)](http://ackintosh.github.io/blog/2013/02/02/cant-create-post/)

どうやらzshを使ってる人は同様の事象になるっぽい？

`rake new_post["title"]`で`source/_posts'に記事が作成されるのでそれを編集。

Markdown用にエディタ入れようかな。

記事を書いたら`rake generate`で記事が見れる状態のファイルに変換される。

`rake watch`しとくとファイルの変更を監視して常時generateしてくれる。

`rake preview`でWEBrickが立ち上がってローカルで確認出来る。

必要なものはすべて揃ってて便利。
