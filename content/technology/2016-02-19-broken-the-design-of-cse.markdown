---
date: 2016-02-19T12:44:17+09:00
slug: "broken-the-design-of-cse"
tags: ['design', 'cse', 'google custom search engine']
title: 'Googleカスタム検索のデザインが崩れる'
---

[<img src="/images/2016-02-19/cse.png" alt="cse">](/images/2016-02-19/cse.png)

結構ありがちな話らしい。
探せば同様の事象について掲載している記事もあるけど、
HTMLをベタで書くという解決方法なので根本的な解決には思えない。

[HTMLフォームを使用したGoogleカスタム検索のデザイン変更方法 - WordPressの使い方と設定 - Webkaru](http://webkaru.net/wordpress/google-custom-search-design/)

## なぜ崩れるのか

結論から言えばCSSの`box-sizing`の値によって崩れる。
特にBootstrapを使ってるサイトで崩れることが多いんじゃないかと思うけど、
Bootstrapはワイルドカードでこういう設定がされている。

```
* {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
```

`border-box`のほうが扱いやすいことが多いので、この設定に対して文句とかはない。
こうあるべきだと思うし。

## 崩れを直す方法

純粋にカスタム検索のスクリプトを特定のタグで囲んで、そのタグに対してワイルドカードで`box-sizing`の値を指定してしまえばいい。

```
.cse-wrapper {
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
}
```

ベンダプレフィックスは必要なんだっけ？ちょっとわかんないや。


