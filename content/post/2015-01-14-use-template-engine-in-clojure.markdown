---
comments: true
date: 2015-01-14T01:01:39+09:00
eyecatch: "clojure.png"
slug: "use-template-engine-in-clojure"
tags: ["clojure", "enlive", "hiccup"]
title: "Clojureのテンプレートエンジンについて"
---

練習のためにClojureでいくつかのWebアプリを作ってみたんだけど、どの言語でもなんだかんだ手間になるテンプレートの扱いについてまとめてみる。

## [Enlive](https://github.com/cgrand/enlive)

<a href="http://www.amazon.co.jp/gp/product/B007Q4T040/ref=as_li_tf_tl?ie=UTF8&camp=247&creative=1211&creativeASIN=B007Q4T040&linkCode=as2&tag=unresolved-22">Clojure Programming</a><img src="http://ir-jp.amazon-adsystem.com/e/ir?t=unresolved-22&l=as2&o=9&a=B007Q4T040" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important; display:inline;" />を執筆されたChristophe Grand氏のライブラリ。

CSSのセレクタでバインドを行うという、すごく画期的な方法でテンプレート機能を実現させてる。

例えばこんな感じでテンプレートのHTMLがあれば、

``` html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>This is a title placeholder</title>
  </head>
  <body>
  </body>
</html>
```

こうやってバインドできる。

``` clojure
(html/deftemplate main-template "templates/application.html"
  []
  [:head :title] (html/content "Enlive starter kit"))
```

HTMLが素でかけるから、デザイナさんとの協業がすごく捗りそう。

サンプルのHTMLをそのまま使って、Clojure側でサンプルの値を置き換えたりリピートさせたりすれば済んじゃう。

今回は一人で使ったからそういう場面はなかったけど、サーバを起動しなくてもデザインが見れる & 直せるっていうのは便利な場面があるかなあと。

ただ、結構CSSを書いたりしてるほうだけど、バインドの学習コストは意外と高いなと思った。

効率的に手早くバインドさせるには、Enliveを使う想定のHTML構造にする必要がありそうな印象だった。

覚えてしまえばものすごく活躍しそう。

## [Hiccup](https://github.com/weavejester/hiccup)

[Compojure](https://github.com/weavejester/compojure)や[Environ](https://github.com/weavejester/environ)、[Ring](https://github.com/weavejester/lein-ring)などの作者、James Reeves氏のライブラリ。

HTMLを完全にClojureでラップしてるので、ClojureだけでWebアプリを完結させられる。

こんな感じ。

``` clojure
user=> (html [:script])
"<script></script>"
user=> (html [:p])
"<p />"
```

Clojureのコンパイルが走るので、タグの不整合(閉じタグがないとか)が一切起こらないっていうのは魅力だと思う。

欠点を挙げるとすれば、改行なしでHTMLが出力されるからブラウザからソースを見るのが厳しい。ていうか無理。

設定でなんとか出来るんだろうか？

でもChromeの開発者ツールとか使えばフォーマットして表示してくれるし、全然クリティカルな問題じゃない。

もう1点は、例えば広告のスクリプトみたいにコピペで貼り付けたい文字列とかの出力がちょっとめんどう。

Hiccupの世界にただのタグを入れるのは見栄えも悪いし、オレはこんな感じで外だしすることで対応した。

``` clojure
(def partial-ad-big (str "<script async src=""//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js""></script>
<ins class=""adsbygoogle""
     style=""display:inline-block;width:728px;height:90px""
     data-ad-client=""ca-pub-421xxxxxxxxxx76""
     data-ad-slot=""111xxxxxxxx42""></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>"))
```

個人的にはHiccupのほうがさくっと理解できてさくっと書けたかな。

ループ処理もClojureがかければそのまま書けちゃうし。

ClojureとHTMLの親和性はすごく高いと思っていて、Hiccupはそれを最大限に活用することが出来てるなあという感じ。

ある言語を他の言語でラップするのって再学習が必要だし非効率で嫌いだったんだけど、HiccupはHTMLの冗長さが減るし、学習する価値のあるライブラリだと思った。

ゆくゆくはどっちもしっかり使えるようになりたい。
