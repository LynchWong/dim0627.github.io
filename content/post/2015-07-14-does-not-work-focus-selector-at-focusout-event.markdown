---
comments: true
date: 2015-07-14T00:05:16+09:00
eyecatch: "jquery.jpg"
slug: "does-not-work-focus-selector-at-focusout-event"
tags: ["javascript"]
title: "focusoutイベントでfocus中の要素が取得できない"
---

何を血迷ったかサジェストを自作しようとしてしまってつらい目にあった話。

## フォーカスアウトしたらサジェストを消したい

入力欄もしくはサジェストからフォーカスアウトした時はサジェストを消したいじゃん。

でもフォーカスアウトした先にフォーカスしたものが入力欄もしくはサジェストだったらそれは消したくないじゃん。

だからこんなコードを書いた。

``` html
<input type="text" id="search-text">
<div id="suggest-list">
  <a href="#">suggest</a>
  <a href="#">suggest</a>
  <a href="#">suggest</a>
</div>

<script>
$("#search-text").on("focusout", function() {
  if ($("#suggest-list").find(":focus").length !== 0) {
    console.log("Not hide!");
    return;
  }
  console.log("hide!");
});
</script>
```

実際はこの処理を入力だけじゃなくアンカーにも適用したんだけど面倒だから省略。

しかしこれだと`if`の中には入らずサジェストの非表示処理が通ってしまう・・・。

## フォーカス処理は一度ブラウザに返してあげる

どうやらJavaScriptの処理が進んでる間はフォーカス処理が行われないらしい。

なので**一度ブラウザに処理が返るような処理**を挟んでやる必要がある。

こんなかんじに。

``` javascript
$("#search-text").on("focusout", function() {
  setTimeout(function() {
    if ($("#suggest-list").find(":focus").length !== 0) {
      console.log("Not hide!");
      return;
    }
    console.log("hide!");
  }, 0);
});
```

`setTimeout`はJavaScriptの処理を通した後に、ブラウザ側からまた呼び出されるとのこと。

## 参考にさせていただきました。

[JavaScript - setTimeout(...,0)などの使いドコロ - Qiita](http://qiita.com/jkr_2255/items/17693ab77beea71a871c)

