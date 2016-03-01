---
date: 2016-03-01T14:08:26+09:00
slug: "text-rendering-optimizelegibility-and-google-fonts"
tags: ["css", "font", "web-fonts", "google-fonts"]
title: "text-rendering: optimizelegibility;を指定するとWebフォントの読み込みがおかしくなる"
---

よくやるこれ。

``` css
body {
  text-rendering: optimizelegibility;
}
```

ちょうどブログのデザインを変えてたら、何故か毎回リロードしないとGoogle Fontsから読ませてるOpen Sansが効かなくなって困った。
はじめはキャッシュとかChromeの不調かなんかかと思ってたんだけど、AndroidのChromeでも再現するし何かがおかしい。

上記のプロパティを外したら直ったので、これが原因なのかもしれない。

## text-rendering？

文字列の描画についてのプロパティ。
かなりぼんやりした曖昧な情報がネットに溢れてるので、結局なんなのよと言いたくなった人は多いと思う。

* [CSSの［text-rendering: optimizeLegibility;］は指定しないほうが無難かも。 - ONZE](http://on-ze.com/archives/609)
* [text-rendering: optimizeLegibility · terkel.jp](http://terkel.jp/archives/2012/09/text-rendering-optimizelegibility/)
* [text-renderingって何？！ | Webサイト制作ならプロフェッサ（東京都/品川区）](http://www.pro-s.co.jp/engineerblog/design/post_5246.html)

僕はそういうとき、MDNを信用して参考にさせてもらってます。

[text-rendering - CSS | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/text-rendering)

Summaryにはこうある。

> The text-rendering CSS property provides information to the rendering engine about what to optimize for when rendering text.
>
> The browser makes trade-offs among speed, legibility, and geometric precision.

**`text-rendering`はテキストを何に最適化して表示するかの情報をレンダリングエンジンに提示する。**
この値によって、ブラウザの処理はレンダリング速度や可読性、配置精度のいずれかのトレードオフとなる。

## つまり何に使うの？

この3つのどれを求めるのよってのを伝える属性なわけですね。

* 描画速度
* 読みやすさ
* 配置の正確さ

`geometric precision`はちょっと訳せなかったけど、文字の配置精度とかそういう意味だと解釈しました。

そして注釈。

> The text-rendering property is an SVG property that is not defined in any CSS standard. However, Gecko and WebKit browsers let you apply this property to HTML and XML content on Windows, Mac OS X and Linux.

`text-rendering`はSVGのための属性でCSSの標準実装じゃないんだけど、WebKitとかGeckoだと使えますよと。

何も考えずに指定するのはNGな気がしますね。

