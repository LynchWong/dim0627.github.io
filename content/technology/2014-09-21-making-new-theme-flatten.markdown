---
slug: "making-new-theme-flatten"
title: "Octopressのテーマを作ってみる"
date: 2014-09-21
tags: ["ruby", "octopress", "design"]
---

元のやつもすっごいかっこよくてよかったんだけど、さすがに他の人とかぶっちゃうのはやだよね。
でも僕はデザイナーじゃないから、あんまりがっつりやるのもやだよね。
てことで元のclassicテーマをパクって作ろう。

Octopressから移行してしまったので、スクリーンショットだけ載せとく。

[<img src="/images/2014-09-21/flatten.png" alt="flatten">](/images/2014-09-21/flatten.png)

## テーマの変え方

そもそも変え方もよく知らないんだけど、どうやらここにテーマ単位のディレクトリが配置されるらしい。

``` sh
octopress git:(source)$ ls .themes
classic
```

で、`rake install[theme name]`でインストール。

## テーマの構成

作るにも、テーマの定義に何が必要かがわからない。
classicの中を見てみよう。

``` sh
octopress git:(source)$ ls .themes/classic
sass   source
```

察するに`sass`がスタイル系で`source`がテンプレート系なのかな。
別にページレイアウトを変えたいとか、そんなたいそうなことは考えてないので、sass内をいじるだけでよさそう。

ということで出来ました。

[flatten](https://github.com/dim0627/flatten)

gravatarの件が入っちゃってるから、これは後で分離しなきゃなあ。

