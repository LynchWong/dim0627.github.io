---
tags: ["golang", "hugo"]
comments: true
date: 2015-01-07T23:56:32+09:00
eyecatch: "design2.jpg"
slug: "how-to-use-multibyte-title-in-hugo"
title: "Hugoでマルチバイトのタイトルをスマートに使う方法"
---

[Hugo](http://gohugo.io/)でちょっと困ったこと。

オレは[Octopress](http://octopress.org/)から移行してきたからなおさらなんだけど、記事のタイトルがURLにされてしまう。

あ、オレは`config.yaml`に

``` yaml
permalinks:
  post: /blog/:year/:month/:day/:title/
```

を設定してるからなんだけど。

そうすると日本語とかのマルチバイト文字を使うとパーセントエンコードが走って結構悲惨なことになる。

というかオレの環境だとリンクがきちんと飛べなかった・・・。

Octopressは記事のファイル名がURLになってたから、ファイル名さえ英語なら問題なかったんだよね。

なので今回やった対処法をメモっとく。

## URLの構成と対応策

実は移行の時にちょっと手を加えたりしてたんだけど、あんまり綺麗な方法じゃなかったので納得が行ってなかった。

そんな時に公式を読んでたら、[Content Organization](http://gohugo.io/content/organization/)の項にこんな図が。

[<img src="/images/2015-01-07/permalink.png" class="image" alt="permalink">](/images/2015-01-07/permalink.png)

どうやらオレが困ってたURLのタイトル部は`slug`と呼ばれる部分らしい。

ならこんな風に記事内で毎回指定してしまえば綺麗に話が済むのではないか？

``` markdown
---
tags: ["hugo", "golang"]
comments: true
date: 2015-01-07T23:56:32+09:00
eyecatch: "hugo.png"
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
