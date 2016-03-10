---
date: 2016-03-08T15:25:13+09:00
slug: "accelerated-mobile-pages"
tags: ["amp", "google"]
title: "AMP対応をした"
---

巷で話題のAMP対応をしました。
僕のブログはこの規模なので、別ページとして作るのではなく純粋にページ自体を作り変えました。

## AMP？

[Accelerated Mobile Pages Project](https://www.ampproject.org/)

> For many, reading on the mobile web is a slow, clunky and frustrating experience - but it doesn’t have to be that way. The Accelerated Mobile Pages (AMP) Project is an open source initiative that embodies the vision that publishers can create mobile optimized content once and have it load instantly everywhere.

モバイル用に爆速な感じのページを作ろうぜってやつですね。
そのためにHTMLをゴリゴリ書き換えなければいけないです。

いろいろなサイトを見てると、AMP対応のために別ページを用意して`rel`を張るパターンが多いようでした。

[Make Your Page Discoverable](https://www.ampproject.org/docs/guides/discovery.html#linking-pages-with-ltlinkgt)

``` html
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
```

## 始め方

ドキュメントはかなり整理されているので、特に詰まることなく実装は出来ると思います。

このページにある通り、必須の項目を`head`タグ内に入れたりするだけで始められます。

[Create Your AMP HTML Page](https://www.ampproject.org/docs/get_started/create/basic_markup.html)

``` html
<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <title>Hello, AMPs</title>
    <link rel="canonical" href="http://example.ampproject.org/article-metadata.html" />
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "headline": "Open-source framework for publishing content",
        "datePublished": "2015-10-07T12:02:41Z",
        "image": [
          "logo.jpg"
        ]
      }
    </script>
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    <h1>Welcome to the mobile web</h1>
  </body>
</html>
```

`<html>`に`amp`もしくは「⚡」を入れることでAMP対応を明示するようです。
せっかくなので、このブログは絵文字で対応しました。

## HTML上の制約

基本的にAMPは機能拡張ではなく制限なので、既存のHTMLの置き換えや削除で対応出来ます。

### 画像の差し込み

まず最初に説明されているのは画像の表示について。

``` html
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
```

AMP用のタグが用意されているので、それに置き換える必要があります。
`layout`などの属性も用意されているので、少しだけ融通は効くようです。`width`と`height`は必須のようでした。きついですね。

[Include Iframes and Media#include-an-image](https://www.ampproject.org/docs/guides/amp_replacements.html#include-an-image)

サイズを指定しなくても横幅に応じて良きに計らってほしいのですが、僕はその記述をドキュメントから見つけられませんでした。

### スタイルシート

スタイルシートは`<head>`内にベタで置くことになっているようです。

``` html
<style amp-custom>
  /* any custom style goes here */
  body {
    background-color: white;
  }
  amp-img {
    background-color: gray;
    border: 1px solid black;
  }
</style>
```

この`<style amp-custom>`タグは1ページに1個までとの制約があったり、`:not()`など、禁止されている機能もあるようです。

[How to Style Your Pages#disallowed-styles](https://www.ampproject.org/docs/guides/responsive/style_pages.html#disallowed-styles)

外部スタイルシートは原則**フォント読み込み**のみ可、とのことです。Google Fontsなどですね。

BootstrapやSkeletonなどのCSSフレームワークはどうしたらいいんだろうと思ったのですが、
そもそもAMPの目的を考えると、CSSフレームワークが必要なほどのデザインを施すこと自体が間違っているのかもしれません。

僕は今回の対応で3rdパーティ系のライブラリはすべて撤去しました。（`.container`とグリッドシステムくらいしか使っていなかったので、そもそも不要でした。）

### JavaScript

原則禁止のようです。
Google Analytics等は専用の記述が用意されていました。こういった例外的な扱いが他にもいくつかあるようです。

[Adding Analytics to your AMP pages  |  Analytics for AMP Pages  |  Google Developers](https://developers.google.com/analytics/devguides/collection/amp-analytics/)

このブログではコードハイライトのために[highlight.js](https://highlightjs.org/)を使っていたのですが、それもこの対応で外しました。

## バリデーション

当該ページのURL末尾に`#development=1`をつけてChromeでアクセスすれば、Chrome DevTools consoleにバリデーション結果が表示されるようになっています。

[Validate AMP Pages](https://www.ampproject.org/docs/guides/validate.html)

個々のエラーメッセージに応じた対応方法なども記載されているので、やはりドキュメントは充実していますね。

## 終わりに

JS禁止などを見てもわかるように、やはりAMPはAMP用のページを別で作るのが理想的な気がします。
会社で運営しているサイトも対応をしたいのですが、あまりコストの低い作業でもないので一旦保留にしています。

Google Search Console等でもAMP対応の状況が表示されるようになっているので、おそらくAMPはこのまま普及していくのではないかと思っています。

仕様も今後変わっていくと思うので、その辺も追う元気があれば対応していきたいと思います。

