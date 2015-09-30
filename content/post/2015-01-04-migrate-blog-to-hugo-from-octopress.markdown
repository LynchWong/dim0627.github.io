---
tags: ["golang", "octopress", "hugo", "ruby"]
comments: true
date: 2015-01-04
eyecatch: "design1.jpg"
slug: "migrate-blog-to-hugo-from-octopress"
title: "ブログをOctopressからHugoに移行した"
---

[Octopress](http://octopress.org/)でのブログもずいぶん慣れてきたところで[Hugo](http://gohugo.io/)に移行しました。

一晩徹夜して、カスタマイズからGitHub Pagesでの公開までいけたのでいろいろまとめてみる。

## なぜ移行？

ずっとテーマのカスタマイズをしたいと思ってたんだけど、Octopressのテーマの構成がいつまでたっても理解出来なかったのが一番の理由。

テーマというか、テンプレートの構成かな・・・。

Google Adsenseとかも導入したんだけど、そんな些細な修正ですらちょっと辛い感じになってしまってたので、いっそ土台ごと変えることに。

## Hugoに移行するメリット

せっかくだし移行してみてよかったことをまとめてみます。

### とにかくスピーディ

何をするにも動作がめちゃくちゃ速い。

記事数がそんなに多くないからOctopressでも不満はなかったんだけど、今考えればとてつもない遅さだったなあと思う。

Hugoはほんとに一瞬で記事を生成するし、サーバの起動も一瞬なのでライブリロードがいらないくらい。使ってるけど笑

HugoはGolangで出来てるそうで、それが要因なのかはわからないけど、これまで触ってきた開発用サーバの中でも類を見ない速さで作業ができます。

### 構造がシンプル

トップページ、記事一覧、記事個別のページ、って感じで綺麗に区分けがされてる。

テーマがいくつかあるんだけど、どれも必要のないネストとかしてないし、そこからカスタマイズがしやすい。

あと、カテゴリとかタグみたいに、記事間を横断的に集計したい場合もすごく簡単に出来る。

すごく簡単すぎてどうなってるのかわからなくなることがあるけど笑

[Taxonomy Overview](http://gohugo.io/taxonomies/overview/)

### 無駄な物がない

Hugoは`new`で作った時に基礎になるテンプレートがないくらい、標準装備が少ない。

まあそれじゃテスト実行さえ出来ないからどうなんだっていう人もいると思うけど笑

オレは結構0から作りたい方なので、これくらいすっきりさせてくれてたほうが嬉しかった。

## 移行によるデメリット

とはいえ全てがよかったわけではなくて、途中で何度か引き返そうと思う場面もあったので、そこも書いとく。

### 自分でやらなきゃいけないことが多い

やっぱりOctopressはRakeタスクでかなり囲い込みが出来てたなあと思う。

OctopressをGitHub Pagesで公開する場合、masterとsourceブランチが作成されるんだけど、あれは運用面でも非常に楽だったなあと思う。

Hugoはデプロイは一切触れずに、本当に静的な資材の生成しかしないから、その辺は自分でやらなきゃいけない。

だから初めての人には辛いところがあるかも。

あ、あとDISQUSとかもテーマによってはIDを指定するだけで使えたり、自分でタグを埋め込まなきゃ使えなかったりする。

記事のカテゴリ分けとかタグ付けについても自分で設定しなきゃいけない。公式に手順はあるけど。

もちろんSNSのリンクも自分で配置。

### 日本語タイトルが使いづらい

Octopressの時は、記事のMarkdownファイルのファイル名は英語にして、ファイル内のtitleで日本語を設定してました。

Hugoはファイル内のtitleで記事個別ページのURLを生成するから、マルチバイトが入るといろいろ面倒なことになっちゃった。

あと、これまでのSEOをゼロにしたくないからURLは変えたくなくて、やっぱりURLでは英語のタイトルを使いたい。

これはもうどうしょうもなくて、ファイル内に英語タイトルと日本語タイトルを設定出来るようにした。

シェルで一括操作出来るような内容でもないので、ここは手作業。

### テーマが少ない

あるものでなんとかしたい、って人には深刻かと笑

ブログ自体に注力せずに記事を書くことに注力したい、って人はOctopressかHexoかそもそもHatenaとかの方がいいのかもしれない。

## 移行において

記事の移行と、なるべく移行前と移行後でブログを書く作業が変わらないように工夫した点をまとめる。

### 日付フォーマットの変更

Octopressと違ってHugoでは日付のフォーマットを

```
date: "2013-10-27"
```

こんな感じにしなきゃいけないので、先人の知恵を使って置換する。

``` sh
$ find . -type f -exec sed -i "" -e 's/\([0-9]\+-[0-9]\+-[0-9]\+\).*$/"\1"/' {} \;
```

### 画像タグの変更

Octopressではこう書いてたけど

``` markdown
[{% img /images/2015-01-01/beanstalkDockerApp.png 'beanstalkDockerApp' 'beanstalkDockerApp' %}](/images/2015-01-01/beanstalkDockerApp.png)
```

Hugoでは画像タグHTMLベタにするので、

``` sh
$ find . -type f -exec sed -i "" -e 's/{%.*img.*\/images\/\(.*\)\/\(.*\) \(.*\) .* %}/<img src=\"\/images\/\1\/\2" class=\"image\" alt=\"\3\">/g' {} \;
```

と思ったら`alt`がおかしくなったので、

``` sh
$ find . -type f -exec sed -i "" -e 's/alt=\"'\''\(.*\)'\''\"/alt=\"\1\"/g' {} \;
```

sedでシングルクォート置換するのってちょっと面倒なんだね・・・。

## デプロイと記事作成のシェル化

今回もGitHub Pagesで運用するけど、ブランチ構成は前と変わらず`master`と`source`でやりたいので、デプロイはシェルにまとめる。

``` sh
#!/bin/bash

echo -e "\033[0;32mDeploying updates to GitHub...\033[0m"

# Build the project. 
hugo -t flatten

# Add changes to git.
git add -A

# Commit changes.
msg="rebuilding site `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -m "$msg"

# Push source and build repos.
git push origin source
git subtree push --prefix=public origin master
```

記事のファイル名も日付付与を継続したいので、

``` sh
#!/bin/bash

title=`echo $1 | tr "A-Z" "a-z"`
title=`echo $title | tr " " "-"`
title=`echo $title | sed "s/\.//g"`
hugo new post/"`date +%Y-%m-%d`-$title.markdown"
```

こんな感じで。

ひと段落したけどまだまだ細々といじらなきゃだろうなー。

## 参考にさせて頂きました

[Hosting on GitHub Pages](http://gohugo.io/tutorials/github_pages_blog/)

[Migrating to Hugo From Octopress](http://nathanleclaire.com/blog/2014/12/22/migrating-to-hugo-from-octopress/)

