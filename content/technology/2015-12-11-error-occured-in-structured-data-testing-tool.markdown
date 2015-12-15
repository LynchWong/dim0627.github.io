---
date: 2015-12-11T11:22:28+09:00
slug: "error-occured-in-structured-data-testing-tool"
tags: ['html', 'microdata', 'schema.org', 'structured-data']
title: 'Googleの構造化データの扱いが変わった気がする'
---

このブログも、他の運営してるサイトも、今日になってエラーが発生するようになった。

[Structured Data Testing Tool](https://developers.google.com/structured-data/testing-tool/)

エラーは2種類発生していて、ひとつめがこれ。

[<img src="/images/2015-12-11/error1.png" class="image" alt="error">](/images/2015-12-11/error1.png)

もうひとつがこれ。

[<img src="/images/2015-12-11/error2.png" class="image" alt="error">](/images/2015-12-11/error2.png)

あれ？`author`はもともと必須だっけ？

## 構造化データ？

マイクロデータとかって呼ばれたりもする。

HTMLにもう少し踏み込んだ側面的な意味を持たせるためのもの。

Googleの説明が、どのように使われるかも記載されていてわかりやすい。

[Promote Your Content with Structured Data Markup  |  Structured Data  |  Google Developers](https://developers.google.com/structured-data/)

## エラーの原因

今回はArticleの`image`とか`publisher`もろもろでエラーが発生しました。

これまでは大丈夫だったのになんでだろう。

この記載を見ると、どうやら構造が間違っているらしい。

[Enabling Rich Snippets for Articles  |  Structured Data  |  Google Developers](https://developers.google.com/structured-data/rich-snippets/articles?hl=ja)

### imageプロパティ

これまで僕は、画像要素を次のように記載していたのだけど、

``` html
<meta itemprop="image" content="http://example.com/images/10999.jpg" />
```

こう記載するのが正しいようだ。

``` html
<div itemprop="image" itemscope itemtype="https://schema.org/ImageObject">
  <img src="https://google.com/thumbnail1.jpg"/>
  <meta itemprop="url" content="https://google.com/thumbnail1.jpg">
  <meta itemprop="width" content="800">
  <meta itemprop="height" content="800">
</div>
```

`ImageObject`の子で居なきゃいけないんだね。

さらに`width`と`height`も必須になってる。
前は要らなかったような記憶があるんだけど・・・。

### publisherプロパティ

`publisher`はこう記載されている。

これは運営元の組織を指すのかな。

``` html
<div itemprop="publisher" itemscope itemtype="https://schema.org/Organization">
  <div itemprop="logo" itemscope itemtype="https://schema.org/ImageObject">
    <img src="https://google.com/logo.jpg"/>
    <meta itemprop="url" content="https://google.com/logo.jpg">
    <meta itemprop="width" content="600">
    <meta itemprop="height" content="60">
  </div>
  <meta itemprop="name" content="Google">
</div>
```

### nameプロパティ

何故かこのエラーだけどうやっても消えない。

謎なので分かり次第追記しよう。

**追記**

この記事を書き終えてから再度試してみたら消えました。

Structured Data Testing Tool自体が改修中だったのだろうか。

どちらにせよこの辺はこれからも随時変わっていくポイントだろうから、定期的にチェックと対応をしていかなきゃいけないですね。

