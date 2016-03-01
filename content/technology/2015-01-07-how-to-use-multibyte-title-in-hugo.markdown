---
date: 2015-01-07T23:56:32+09:00
slug: "how-to-use-multibyte-title-in-hugo"
title: "Hugoでマルチバイトのタイトルをうまいこと使う"
tags: ["golang", "hugo"]
---

[Hugo](http://gohugo.io/)でちょっと困ったことが起きた。
僕は[Octopress](http://octopress.org/)から移行してきたからなおさらなんだけど、記事のタイトルがURLにされてしまう。

あ、僕は`config.yaml`に

``` yaml
permalinks:
  post: /blog/:year/:month/:day/:title/
```

を設定してたからっていうのもある。

そうするとマルチバイト文字を使うとパーセントエンコードが走って結構悲惨なことになってしまった。
というか僕の環境だとリンクがきちんと飛べなかったんだけど、これはパッチが入って今はもう直ってるらしい。

Octopressは記事のファイル名がURLになってたから、ファイル名さえ英語なら問題なかったんだよね。
なので今回やった対処法をメモっておきます。

## URLの構成と対応策

HugoはURL構造も比較的柔軟に変えられるように作られている。

[Hugo - Permalinks](http://gohugo.io/extras/permalinks/)

この記載を見ると、個々の記事に`slug`を指定することも出来るらしい。

``` yaml
---
tags: ["hugo", "golang"]
date: 2015-01-07T23:56:32+09:00
slug: "how-to-use-multibyte-title-in-hugo"
title: "Hugoでマルチバイトのタイトルをスマートに使う方法"
---
```

OctopressとURL構造が変わらないようにするには、`config.yaml`をこうすればよい。
個々の記事に`slug`を記述する必要があるけどね・・・。

``` yaml
permalinks:
  post: /blog/:year/:month/:day/:slug/
```

