---
tags: ["golang", "hugo"]
date: 2015-01-07T23:56:32+09:00
slug: "how-to-use-multibyte-title-in-hugo"
title: "Hugoでマルチバイトのタイトルをスマートに使う方法"
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

実は移行の時にちょっと手を加えたりしてたんだけど、あんまり綺麗な方法じゃなかったので納得が行ってなかった。

そんな時に公式を読んでたら、[Content Organization](http://gohugo.io/content/organization/)の項にこんな図が。

[<img src="/images/2015-01-07/permalink.png" class="image" alt="permalink">](/images/2015-01-07/permalink.png)

どうやら僕が困ってたURLのタイトル部は`slug`と呼ばれる部分らしい。

ならこんな風に記事内で毎回指定してしまえば綺麗に話が済むのではないか？

``` markdown
---
tags: ["hugo", "golang"]
date: 2015-01-07T23:56:32+09:00
slug: "how-to-use-multibyte-title-in-hugo"
title: "Hugoでマルチバイトのタイトルをスマートに使う方法"
---
```

と思ったらうまくいった。

`config.yaml`はこんな感じ。

``` yaml
permalinks:
  post: /blog/:year/:month/:day/:slug/
```

なのでOctopressから移行した人はこの方法も検討するといいかもしれません。

`hugo new`した時に生成されるテンプレートは`archetypes`ディレクトリに配置出来るから、そこでやっておくとよし。

しかし移行時に書き足すのが面倒なんだよなあ。
