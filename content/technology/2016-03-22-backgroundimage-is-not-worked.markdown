---
date: 2016-03-22T13:32:47+09:00
slug: "backgroundimage-is-not-worked"
tags: ["android", "chrome", "cloudflare", "cdn", "css"]
title: "AndroidのChromeでCSSのBackgroundImageが設定されない"
---

Androidのスマホ（Nexus5 Android 6.0.1）からアクセスした時に

``` css
background-image: url(/images/bg.png);
```

とかやってる背景画像が読み込まれないっていう現象に陥った。
PCからだと再現しないから全然原因が掴めなかったんだけど、考えられる原因は以下のものくらいだった。

* AMPの対応をしたせい
* ショートハンドで複数画像を指定したせい
* CloudFlareにしたせい
* Androidのせい

ショートハンドのはこういうこと。

``` css
background: repeat center/auto url(/images/lay.png),
            no-repeat bottom/cover url(/images/bg.png);
```

まず1つ目のAMP対応の件は、AMP対応してないページでも同一の事象が発生していたので違った。
ショートハンドも違う書き方をして改善されなかったので、違う。
というわけでCloudFlareのせい？ちなみにキャッシュクリアは効果がなかった。

調べてみると似たような記事がいくつか見つかった。
やっぱりこれが原因なのかな？

* [Background CSS images not loading in firefox when using a CDN | Firefox サポートフォーラム | Mozilla サポート](https://support.mozilla.org/ja/questions/984143)
* [WordPress › Support » CDN Feature Not Loading CSS Background Images](https://wordpress.org/support/topic/cdn-feature-not-loading-css-background-images)
* [WordPress › Support » Header image not displaying with Cloudflare SSL](https://wordpress.org/support/topic/header-image-not-displaying-with-cloudflare-ssl)

と思ったらiPhoneだと再現しない。Androidのせいなのか？
それとも僕が、Androidに対応してないショートハンドで書いてしまってるのか？

しかし、ショートハンドをやめてみても画像は表示されない。
それも、小さい画像は表示されて大きな画像が表示されない。
ファイルサイズの問題なのだろうか？そうするとやはり、CloudFlareが何かやっている？
まさか相対パスじゃなくて絶対パスじゃなきゃだめ？とも思ったが変えてみても改善されない。
こうなったら違うサーバに配置してCloudFlareを経由せずにアクセスしてみれば・・・、でもダメ。
ってことはCloudFlareも関係ない。

ここまでの対応をまとめてみよう。

* AMPじゃないページで確認
* ショートハンドをやめて確認
* キャッシュをクリアして確認
* 絶対パスに変えて確認
* CloudFlareを経由しないサーバに配置して確認

これらは全部効果なし。

## 画像をリサイズしたら直った

あまりしっくりくる結論じゃないんだけど、
僕の手元で再現する条件は「画像を`background-size: cover;`でアスペクトが違いすぎるblock要素に設定する」でした。

2つのサイトで同様の事象が発生していたんだけど、画像をリサイズしたらこの問題は解決した。
余裕があれば、もう一度上記の条件を整えて再現するかを確認したいと思う。

### 追記

画像サイズを変えて再現しました。
なんでなんだ？

