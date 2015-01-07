---
tags: ["hugo", "golang"]
comments: true
date: 2015-01-07T23:56:32+09:00
eyecatch: "hugo.png"
slug: "how-to-use-multibyte-title-in-hugo"
title: "Hugoでマルチバイトのタイトルをスマートに使う方法"
---

[Hugo](http://gohugo.io/)でちょっと困ったこと。

オレは[Octopress](http://octopress.org/)から以降してきたからなおさらなんだけど、記事のタイトルがURLにされてしまう。

そうすると日本語とかのマルチバイト文字を使うとパーセントエンコードが走って結構悲惨なことになる。

というかオレの環境だとリンクがきちんと飛べなかった・・・。

なので今回やった対処法をメモっとく。

## 現状整理

実は以降の時にちょっと手を加えたりしてたんだけど、あんまり綺麗な方法じゃなかったので納得が行ってなかった。

そんな時に公式を読んでたら、[Content Organization](http://gohugo.io/content/organization/)の項にこんな図が。

[<img src="/images/2015-01-07/permalink.png" class="image" alt="permalink">](/images/2015-01-07/permalink.png)

どうやらオレが困ってたURLのタイトル部はslugと呼ばれる部分らしい。

ならこんな風に記事内のマークダウンで毎回指定してしまえば綺麗に話が済むのではないか？

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

なのでOctopressから以降した人はこの方法も検討するといいかもしれません。

`hugo new`した時に生成されるテンプレートは`archetypes`ディレクトリに配置出来るから、そこでやっておくとよし。

しかし以降時に書き足すのが面倒なんだよなあ。
