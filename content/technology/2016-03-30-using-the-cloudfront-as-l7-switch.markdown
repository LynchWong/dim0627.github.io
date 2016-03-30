---
date: 2016-03-30T10:46:34+09:00
slug: "using-the-cloudfront-as-l7-switch"
tags: ["aws", "cloudfront", "l7-switch"]
title: "CloudFrontをL7スイッチにして特定パスをTumblrに飛ばす"
draft: true
---

ELBだとパスによる振り分けが現状できない（と思う）ので、CloudFrontでなんとかしてみよう。
今回はルートパスをS3の静的ファイル、特定パスをTumblrに飛ばすようにしてみる。

## S3の設定

まずテスト的な静的ファイルをS3に配置する。
このままだとS3に対してHTTPアクセスが出来ないので、静的WebサイトホスティングをOnにしてBucketPolicyを追加する。
{{% img src="/images/2016-03-30/s3-static.png" alt="s3-static" w="1658" h="746" %}}

[例: 静的ウェブサイトをセットアップする - Amazon Simple Storage Service](https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/dev/HostingWebsiteOnS3Setup.html)

``` json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadForGetBucketObjects",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your.bucket.name/*"
    }
  ]
}
```

これでS3へHTTPアクセスが出来るようになった。
次はこのバケットへCloudFront経由でアクセスできるようにする。

## CloudFrontの設定

S3のオリジンとTumblrのオリジンを作って、
{{% img src="/images/2016-03-30/cloudfront-origins.png" alt="cloudfront-origins" w="1402" h="244" %}}
ビヘイビアでパスによる振り分けをしてしまえば完了。
{{% img src="/images/2016-03-30/cloudfront-behaviors.png" alt="cloudfront-behaviors" w="1258" h="246" %}}
CloudFrontってオリジンごとにデフォルトルートオブジェクト指定出来ないのかな。

## Tumblrの設定

このままだとTumblrが持ってるドメイン（****.tumblr.com）がそのまま生きてしまうので、これを何とかする。
そういえば、Tumblrに独自ドメインの設定が見つからない！と思ったら、僕がメールでのverifyを放置してたからだった。
独自ドメイン設定はちゃんとある。

[Namecheap.com Knowledgebase • How do I use my domain with my Tumblr account? (3rd Party Services Setup)](https://www.namecheap.com/support/knowledgebase/article.aspx/9247/2208/how-do-i-use-my-domain-with-my-tumblr-account)

今回の構成はどうしようか悩んだんだけど、Tumblrの持つドメインに来たものはS3に飛ばすようにしてしまおうと思う。
というかそれ以外の方法が思いつかなかった。

Tumblrに独自ドメインを設定すればおそらくCNAMEで転送してくれると思うので、それで飛ばしてしまいましょう。

## 動作確認

以下のパターンで動作が確認できたのでとりあえずここまで。

* 独自ドメインのルートパスアクセス（S3が表示される）
* 独自ドメインの特定パスアクセス（Tumblrが表示される）
* Tumblrのドメインアクセス（独自ドメインのルートパスに転送されてS3が表示される）

オリジンによってキャッシュの設定も出来るしいい感じ。はてなとかでも出来そう。
問題点があるとすれば、aタグとかのURLがルートからのパス（`href="/posts"`）とかになっているテーマは使えないこと。
これは結構由々しき問題かも。でも実運用するときはテーマも作っちゃうだろうしいっか。

でも全体的にバッドノウハウな感じあるし（特にドメイン周り）、自前でサーバ建てて振り分けるのが健全かな。

