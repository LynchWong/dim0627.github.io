---
date: 2015-01-07T23:56:32+09:00
slug: "how-to-use-multibyte-title-in-hugo"
title: "Hugoでマルチバイトのタイトルをうまいこと使う"
tags: ["golang", "hugo"]
---

[Hugo](http://gohugo.io/)でちょっと困ったこと。

僕は[Octopress](http://octopress.org/)から移行してきたからなおさらなんだけど、記事のタイトルがURLにされてしまう。

あ、僕は`config.yaml`に

``` yaml
permalinks:
  post: /blog/:year/:month/:day/:title/
```

を設定してるからなんだけど。

そうすると日本語とかのマルチバイト文字を使うとパーセントエンコードが走って結構悲惨なことになる。
というか僕の環境だとリンクがきちんと飛べなかった・・・。

Octopressは記事のファイル名がURLになってたから、ファイル名さえ英語なら問題なかったんだよね。

なので今回やった対処法をメモっとく。

## URLの構成と対応策

Hugoはリンク構造も結構柔軟に変えられるっぽい。

なのでこんな風に記事内で毎回指定してしまえば綺麗に話が済む。

``` markdown
---
tags: ["hugo", "golang"]
date: 2015-01-07T23:56:32+09:00
slug: "how-to-use-multibyte-title-in-hugo"
title: "Hugoでマルチバイトのタイトルをスマートに使う方法"
---
```

`config.yaml`はこんな感じ。

``` yaml
permalinks:
  post: /blog/:year/:month/:day/:slug/
```

なのでOctopressから移行した人はこの方法も検討するといいかもしれないですね。

`hugo new`した時に生成されるテンプレートは`archetypes`ディレクトリに配置出来るから、そこでやっておくとよし。

