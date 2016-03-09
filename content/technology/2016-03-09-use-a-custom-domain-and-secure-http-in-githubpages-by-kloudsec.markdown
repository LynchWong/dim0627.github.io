---
date: 2016-03-09T12:22:46+09:00
slug: "use-a-custom-domain-and-secure-http-in-githubpages-by-kloudsec"
tags: ["https", "github"]
title: "KloudsecでHTTPSを使ったカスタムドメインのGithubPagesを構築する"
---

[Kloudsec](https://kloudsec.com/github-pages)

> Kloudsec finds and fixes problems on your website automatically
> Super easy to get started: just point your domain to our CDN’s IP address

なんか朝起きたら僕のブログをHTTPS化しないかというメールが来ていて、
何かと思ったらこのKloudsecというサービスがGitHub Pagesに対応したということらしかった。
調べてみたらメールをくれたのはファウンダーの方だった。

おそらくGitHub Pages上にあるサイトをCDNでキャッシュして、ついでにHTTPSにしてくれるというものだと思う。
だからこっちでやることは、GitHub PagesのプロジェクトURLを登録したりDNSの向き先を変えたりするくらい。

せっかくだしやるだけやってみようと思う。

ちなみにこれまでは、CloudFlareを使ってHTTPS化するのが主流だった模様。

* [GitHub Pages Now (Sorta) Supports HTTPS, So Use It](https://konklone.com/post/github-pages-now-sorta-supports-https-so-use-it)
* [GitHub Pagesに設定しているカスタムドメインをHTTPS対応させる - 1000ch.net](https://1000ch.net/posts/2015/github-pages-custom-domain-in-https.html)
* [カスタムドメインの GitHub Pages で HTTPS を使う - Qiita](http://qiita.com/superbrothers/items/95e5723e9bd320094537)

## 対応手順

### Kloudsecのユーザ登録をする

このページの下の方から登録出来る。
GitHub PagesのリポジトリURLを入れることでホスティングしているIPを取得してくれている模様。

[Kloudsec](https://kloudsec.com/github-pages)

### DNSの向き先を変える

GitHub Pagesでカスタムドメインを使ってる人はCNAMEを設定していると思うので、その辺の設定しなおしをする必要がある。

* GitHubに向いているCNAMEレコードを削除
* Kloudsecから指定されたAレコード（対象ドメインとwww付きのもの）を新規登録
* Kloudsecから指定されたTXTレコードを新規登録

## 詰まったところ

### HTTPSにならない

KloudsecはLet's EncryptでHTTPS化しているとのこと。
サイトを登録した直後はHTTPSにならない。というか証明書が取得ペンディングになる。

[Let's Encrypt - Free SSL/TLS Certificates](https://letsencrypt.org/)

これは待ってれば取得完了の旨のメールが届くのでほっとけばよい。

### ダッシュボード上のエラーが消えない

ダッシュボードのトップにこのエラーメッセージが出てどう対応したら良いのかわからなかった。

> One last thing before your website is boosted and secured by Kloudsec

{{% img src="/images/2016-03-09/dashboard.png" alt="dashboard" w="2332" h="1334" %}}

DNSの設定が終わったらあとは勝手に最適化してくれるらしく、それに時間がかかっていたみたい。
つまりこれについても、こっちで出来ることは待つだけ。

## 問題点

### 遅い

純粋に遅い。
GitHubにCNAMEを向けていた時の時間を計測していなかったので比較が出来ないけど、
Kloudsecはスーパーリロードした際に1秒弱かかっている。

{{% img src="/images/2016-03-09/slow.png" alt="slow" w="1124" h="810" %}}

HTMLのレスポンス時点で遅いので、どうしょうもない。

### Page OptimizerがONだとAMPがinvalidになる

KloudsecのPage Optimizerというプラグインはページ速度とかを計るために、ページの末尾にJSを埋め込んでレスポンスを返す。
また、`head`に直接書いたCSSの改行削除等も行っている模様。

僕のブログは昨日記事にしたとおりAMP対応をしているので、JSが埋め込まれるのは非常に困る。

{{% img src="/images/2016-03-09/amp.png" alt="amp" w="1140" h="1612" %}}

これはDashboardからPage OptimizerをOFFにすれば解決出来る。

### 追記

ファウンダーの方からメールを頂きました。対応は迅速かつ丁寧で好印象でした。
レスポンスが遅いのはエッジサーバが日本にないから（ではないか）とのことで、近いうちに置くから待っててくれとのこと。

AMPの件は、将来的にエンドポイントごとにPage OptimizerのON/OFFを切り替えられるようにするかもとのこと。
AMPについてはチーム全体でどうしようか考えてるそうでした。

