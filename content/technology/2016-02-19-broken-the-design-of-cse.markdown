---
date: 2016-02-19T12:44:17+09:00
slug: "broken-the-design-of-cse"
tags: ['design', 'cse', 'google custom search engine']
title: 'Googleカスタム検索のデザインが崩れる'
---

[<img src="/images/2016-02-19/cse.png" alt="cse">](/images/2016-02-19/cse.png)

## なぜ崩れるのか

結論から言えばCSSの`box-sizing`の値によって崩れる。
特にBootstrapを使ってるサイトで崩れることが多いんじゃないでしょうか。

なぜならBootstrapはワイルドカードでこういう設定がされているから。

```
* {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
```

該当ソースはここでしょうか。Bootstrapの構造がよくわからない。

[bootstrap/scaffolding.less at e38f066d8c203c3e032da0ff23cd2d6098ee2dd6 · twbs/bootstrap](https://github.com/twbs/bootstrap/blob/e38f066d8c203c3e032da0ff23cd2d6098ee2dd6/less/scaffolding.less#L12)

`border-box`のほうが扱いやすいことが多いので、この設定に対して文句とかはないです。
こうあるべきだと思う。

## 崩れを直す方法

というわけで、カスタム検索のスクリプトを特定のタグで囲んで、そのタグに対してワイルドカードで`box-sizing`の値を指定してしまえば直る。

```
.cse-wrapper * {
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
}
```

ワイルドカードは使いたくないよね、でもしょうがない。
ベンダプレフィックスは必要なんだっけ？ちょっとわかんないや。

## この事象について

結構ありがちな話らしい。
探せば同様の事象について掲載している記事もあるけど、
HTMLをベタで書くという解決方法なので、根本的な解決ではないように思う。

[HTMLフォームを使用したGoogleカスタム検索のデザイン変更方法 - WordPressの使い方と設定 - Webkaru](http://webkaru.net/wordpress/google-custom-search-design/)

[超軽量♪Googleカスタム検索はJavaScript外すと改造し放題](http://www.02320.net/google_custom_search_optout_js/)

[googleカスタム検索をHTMLに書き換える | 696graphic [BLOG]](http://blog.696.jp/txt/937/)

GoogleもHTMLベタでやっていいよとは言ってるが、Googleカスタム検索の管理画面から発行できるのはコードだし、
Google自身もこう書いている。

[HTML フォームを使用した検索ボックスの作成 - カスタム検索 ヘルプ](https://support.google.com/customsearch/answer/1351747?hl=ja)

> HTML フォームのコードは利便性のためにのみ提供されています。Google カスタム検索ではこの問題に対するサポートは提供しておりません。すべての無料の検索エンジンに Google ブランドを表示する必要があります。

確かに、JSでのレンダリングだと目に見えて遅延するけどね。

