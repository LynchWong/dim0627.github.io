---
title: "how-to-use-custom-domain-in-google-app-engine"
titleja: "Google app engineでカスタムドメインを使う"
eyecatch: "gae.png"
date: 2014-10-23
comments: true
tags: ["google app engine", "dns"]
---

簡単に終わるだろうと思ってたらそれなりに手順があったのでメモ。

## Googleによるドメインの確認

ドメインを持っていない人は先に取得しちゃってね。

ちなみにオレはGMOさん([お名前.com](http://www.onamae.com/))で取得しました。

ていうことで以下の手順にそってやっていきます。

[Using a Custom Domain - Google App Engine Google Cloud Platform](https://cloud.google.com/appengine/docs/domain)

作業は[Developers Console](https://console.developers.google.com/)から行います。

はじめにGoogleが、使いたいドメインが君のものか確認したいとのことなので、verifyへ。

[<img src="/images/2014-10-23/verify.png" class="image" alt="verify">](/images/2014-10-23/verify.png)

そうするとこんな画面になるので、

[<img src="/images/2014-10-23/input_domain.png" class="image" alt="input_domain">](/images/2014-10-23/input_domain.png)

ここに表示されてるテキストを、ドメインを発行した会社さんのほうからTXTレコードとして追加すればOK。

なんかこの画面、すごい頻度でChromeがエラー吐きまくったけど、クリックしなければ大丈夫だったのでなんとかしのぎました。

TXTレコードの追加は、お名前.comであれば[ドメインNavi](http://www.onamae.com/navi/domain.html)から

* ドメイン設定
* DNS関連機能の設定
* DNSレコード設定を利用する

でここに入力すればOK。

[<img src="/images/2014-10-23/input_txt.png" class="image" alt="input_txt">](/images/2014-10-23/input_txt.png)

TYPEはTXTにしてVALUEにさっきのテキストを入力。

場所にもよるけど少し待てば反映されるので、それまでGoogle側の画面で確認ボタンを何度か押してみる。

反映されてたら確認が通るはず。

## ドメインの選択

確認が出来たらサブドメインとしてプレフィックスを付けるのかを決める。

[<img src="/images/2014-10-23/step2.png" class="image" alt="step2">](/images/2014-10-23/step2.png)

これによって最後のステップが変わるけど、オレは確認の時点でサブドメインとして設定したので、Google側では特に付加せずやってます。

## AレコードとAAAAレコードの追加

最後はまたDNSレコードの追加。

ここに記載された一覧をそれぞれのType、Dataに応じてTXTレコードのときと同じように追加すればOK。

[<img src="/images/2014-10-23/step3.png" class="image" alt="step3">](/images/2014-10-23/step3.png)

あとは待ってればそのうち反映されるはず。
