---
date: 2016-03-02T09:55:16+09:00
slug: "i-misunderstood-vertical-rhythm"
tags: ["design", "vertical-rhythm"]
title: "やはり僕のバーティカルリズムは間違っている"
---

まずこれを見ていただきたい。

{{% img src="/images/2016-03-02/invalid.png" alt="invalid" w="1140" h="724" %}}

2016年3月現在の僕のブログのデザイン。
`line-height`を意識しているのでブロック自体はバーティカルリズムから外れていない。

が、文章のベースラインが思いっきりずれてしまっている。
前から薄々気付いてはいたけど、やはり僕のバーティカルリズムは間違っていた。

## ベースラインを揃えたバーティカルリズムの実装

以下の記事が本当に参考になった。素晴らしい記事だと思う。

[擬似要素を利用したベースライン・グリッド · terkel.jp](http://terkel.jp/archives/2014/11/baseline-grid-pseudo-elements/)

詳細はリンク先を見ていただきたい。もはや尊敬してしまうくらいの内容だったので、転載のようなことはしたくない。

上記記事によれば、ベースラインを揃えるために`before`、`after`擬似要素を使ってブロックを押し広げることで実装すればいいとのこと。
この記事に指導いただいて再実装してみよう。

{{% img src="/images/2016-03-02/valid.png" alt="valid" w="1130" h="784" %}}

わかりやすさのために擬似要素に背景色をつけている。
縦のグリッドが揃っていないことはスルーしてほしい。
なかなかコストの高い実装になったが、ベースラインを綺麗に揃えることが出来た。

しかし、高さの予測できないコンテンツが入り込むと現状崩れてしまう。例えば、画像とか。
これについては未解決。

## グリッドを表示するChrome Extension

この改修をするにあたって以下のChrome Extensionを利用した。

[The Grids - Chrome ウェブストア](https://chrome.google.com/webstore/detail/the-grids/jgfgflhpelebngbkojdfjjekjnkgdcag)

探すのが面倒で導入してなかったが、これを機に使ってみたら想像以上に便利だった。

## 参考にさせていただきました

* [擬似要素を利用したベースライン・グリッド · terkel.jp](http://terkel.jp/archives/2014/11/baseline-grid-pseudo-elements/)
* [terkel.jp/demo/baseline-grid.html](http://terkel.jp/demo/baseline-grid.html)

