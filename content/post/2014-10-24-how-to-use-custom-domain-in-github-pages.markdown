---
title: "how-to-use-custom-domain-in-github-pages"
titleja: "GitHub Pagesでカスタムドメインを使う"
eyecatch: "github.png"
date: 2014-10-24
comments: true
categories: [github, dns]
---

昨日はGAEで今日はGithubかよって感じだけど、こっちは結構詰まったのでメモしたい。

## 事の発端

このOctopressのblogをカスタムドメインにしてから、`rake gen_deploy`するとGithubからこんなメールが来るようになりました。

>[dim0627.github.io] Page build warning

>The page build completed successfully, but returned the following warning:
>GitHub Pages recently underwent some improvements (https://github.com/blog/1715-faster-more-awesome-github-pages) to make your site faster and more awesome, but we've noticed that unresolved.dimspace.xyz isn't properly configured to take advantage of these new features. While your site will continue to work just fine, updating your domain's configuration offers some additional speed and performance benefits. Instructions on updating your site's IP address can be found at https://help.github.com/articles/setting-up-a-custom-domain-with-github-pages, and of course, you can always get in touch with a human at support@github.com. For the more technical minded folks who want to skip the help docs: your site's DNS records are pointed to a deprecated IP address.

>For information on troubleshooting Jekyll see:
>  https://help.github.com/articles/using-jekyll-with-pages#troubleshooting

>If you have any questions please contact us at https://github.com/contact.

英語かよ後で読もう、と思ってもデプロイするたびにメールが来るのは結構うざい。

ので、しっかり読んでみると、**デプロイは出来たんだけど、もっと速く動作させる方法があるからそっちにしない？**って話らしい。

[Faster, More Awesome GitHub Pages](https://github.com/blog/1715-faster-more-awesome-github-pages)を参考にすると、以下の手順を踏めばいいとのこと。

### username.github.ioみたいなデフォルトURLの人

何もしないでOK

### www.example.comみたいなサブドメインの人

DNSプロバイダ側にCNAMEレコードを作って、username.github.ioに向ければOK


### example.comみたいにルートドメインの人

DNSプロバイダ側にAレコードを作って、207.97.227.245か204.232.175.78を向ければOK

ちなみにこの3つめは少し厄介らしく、そもそもDNSプロバイダ側でALIASとやらが設定出来ないとだめなんだとか？

こういう系は知識が浅くてだめだなあ。

## これで何が起こるの？

CDNからの配信になるから速いんだとか。

あとDenial of service attackとかいう攻撃の対策になるらしい。

あ、DOS攻撃のことか。略さずに書かれるとわからんもんだね。

