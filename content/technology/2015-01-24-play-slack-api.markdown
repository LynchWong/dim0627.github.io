---
date: 2015-01-25T20:52:46+09:00
slug: "play-slack-api"
tags: ["heroku", "slack"]
title: "SlackAPIで遊ぶ"
---

最近
<a href="http://www.amazon.co.jp/gp/product/4797328355/ref=as_li_qf_sp_asin_tl?ie=UTF8&camp=247&creative=1211&creativeASIN=4797328355&linkCode=as2&tag=unresolved-22">ふつうのLinuxプログラミング</a><img src="http://ir-jp.amazon-adsystem.com/e/ir?t=unresolved-22&l=as2&o=9&a=4797328355" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important; display:inline;width:0;" />を読んでます。知りたいことが書かれてて楽しい！

でもずっと本読むのは飽きるよね。なのでSlackのAPIとか触ってみる。

## SlackAPIの種類

SlackのAPIはいくつか種類があるんだね、トリガになるパターンが違うのかな？

2015年01月24日時点でのAPIをまとめてみる。

### [Slack Web API](https://api.slack.com/web)

指定したチャンネルの履歴とかユーザの一覧とか、Slackの情報を取得出来る。

Web APIなので、URLベースでの取得。

### [Real Time Messaging API](https://api.slack.com/rtm)

Web Socketベースのリアルタイムチャット機能を提供する？

bot userがどうのこうのっていうのがよくわからない。

### [Slackbot Remote Control](https://api.slack.com/slackbot)

SlackBotに喋らせたり出来る。ちょうかわいい。

### [Incoming Webhooks](https://api.slack.com/incoming-webhooks)

指定したチャンネルに投稿出来る。

### [Outgoing Webhooks](https://api.slack.com/outgoing-webhooks)

指定した単語に応じて指定したURLを叩ける。

### [Slash Commands](https://api.slack.com/slash-commands)

指定したスラッシュで始まる単語に応じてURLを叩けて、レスポンスがそのまま投稿される。

今回は発言のタイミングで発火する[Slash Commands](https://api.slack.com/slash-commands)を使ってみようかな！

## スラッシュコマンドの追加

ここから新しくコマンドの追加が出来る。

[https://my.slack.com/services/new/slash-commands](https://my.slack.com/services/new/slash-commands)

[<img src="/images/2015-01-25/new_command.png" alt="new_command">](/images/2015-01-25/new_command.png)

herokuでさくっとHello World作って試してみようかな。

[<img src="/images/2015-01-25/command_test.png" alt="command_test">](/images/2015-01-25/command_test.png)

おお、出るじゃん！でも`Only you can see this message`って出てる、僕しか見れないんだね。

## REPLを作ろう

なんかSlack上でプログラム打つと実行結果が返ってくるみたいなやつ誰かが作ってたよね？
あれ調べても出ないんだけどなんでなんだろう。

まあとりあえず、作ったばっかの[paiza.IO](https://paiza.io/)のAPIを叩くあれを導入してみる。

[paiza.ioのAPIを使ってreplを作る | Unresolved](http://yet.unresolved.xyz/blog/2015/01/25/make-repl-using-the-paizaio/)

スラッシュコマンドAPIは`/command args`って感じにやると、指定したURLに`text`ってパラメータ名で`args`が飛ばされるみたい。

なので`/repl ruby:p "hello"`って感じで実行できるようにしようかな。

[<img src="/images/2015-01-25/slack_repl.png" alt="slack_repl">](/images/2015-01-25/slack_repl.png)

別にURL出してもいいんだけど・・・。

`compojure`のルーティングはこんな。

``` clojure
(defroutes app-routes
  (GET "/" [text]
       (if (empty? text) "Invalid input."
         (let [[language source] (seq (.split text ":"))]
           (str "[" language "] " source "\r\n-> " (repl language source))))))
```

## 実行してみる

さっき書いた通り、`/repl ruby:p "hello"`でいけるかな。

[<img src="/images/2015-01-25/slack_repl_run.png" alt="slack_repl_run">](/images/2015-01-25/slack_repl_run.png)

Javaは少し面倒だね。

