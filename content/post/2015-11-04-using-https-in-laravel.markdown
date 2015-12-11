---
comments: true
date: 2015-11-04T12:18:07+09:00
eyecatch: "design3.jpg"
slug: "using-https-in-laravel"
tags: ['laravel', 'php', 'https']
title: 'ELB越しのLaravelでHTTPSを使おうとして困った話'
---

## SSL証明書はELBに設置する

何が普通なのか知らないけど、今回立ち上げた構成では

```
CLIENT -> ELB(80 or 443) -> WEB(80)
```

っていう構成にしていました（するつもりだった）。

[【初心者向け】ELBにSSL証明書をインストールする ｜ Developers.IO](http://dev.classmethod.jp/cloud/aws/aws-beginner-elb-ssl/)

## 問題はリリース当日に

リリースしてみたら何やら証明書のエラーが出てる。

```
Your connection to this site is private, but someone on the network might be able to change the look of the page.
```

このページはSSL証明書が効いてるんだけど、ネットワーク上の何かがそうじゃなくしちゃうかもね？

原因は**httpsじゃないURLに飛ばすformタグがページに存在する**せいでした。

開発環境でも僕僕証明書を用意したりしてHTTPSで通信するようにしておくべきでした。

## Laravelのrouteメソッド

URLのレンダリングはLaravelの`route`メソッドを使っています。

これは結構気に入っていて、後でURLを変えたいって時にある程度コストを軽減してくれる（んじゃないか）と思っているから。

[HTTP Routing - Laravel - The PHP Framework For Web Artisans](http://laravel.com/docs/5.1/routing#named-routes)

でも今回はこのメソッドが**HTTPのURLをレンダリングした**せいで問題が起こりました。

## LaravelでHTTPSのURLを取り扱う

LaravelのRoutingはこんな感じなんだけど、

``` php
Route::get('/', ['as' => 'home', function() { return view('home.index'); }]);
```

HTTPSのみを許容することも出来るらしい。

``` php
Route::get('/', ['https', 'as' => 'home', function() { return view('home.index'); }]);
```

こうしておけば`route`メソッドでレンダリングされるURLもHTTPSになる。

## そして問題が起きる

先ほどの通り、LaravelでHTTPSの設定をすると

* HTTPSのみを受け付ける
* `route`メソッドがHTTPSのURLのをレンダリングする

事になります。

今回ELBの奥にあるLaravelが載ったインスタンスはnginxが80ポートを待ち受けています。

なのでHTTPSだけを許容されると困るんですね、443で通信しなきゃいけない。

## 解決策

わがままを言えば**LaravelがHTTPを受け付けて`route`メソッドがHTTPSのURLをレンダリングする**と嬉しい。

けどその方法は見つからず（構成としてナンセンスなんだろう）、ELBとLaravelが載ったインスタンスの両方にSSL証明書を設置することにしました。

というわけでこういう形。

```
CLIENT -> ELB(80 or 443) -> WEB(443)
```

めでたしめでたし。
