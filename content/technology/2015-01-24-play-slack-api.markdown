---
date: 2015-01-25T20:52:46+09:00
slug: "play-slack-api"
tags: ["heroku", "slack"]
title: "SlackAPIで遊ぶ"
---

SlackのAPIはいくつか種類があるらしい。それぞれトリガとかが変わるっぽい。

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
今回は発言のタイミングで発火する[Slash Commands](https://api.slack.com/slash-commands)を使ってみよう。

## スラッシュコマンドの追加

ここから新しくコマンドの追加が出来る。

[https://my.slack.com/services/new/slash-commands](https://my.slack.com/services/new/slash-commands)

{{% img src="/images/2015-01-25/new_command.png" alt="new_command" w="984" h="523" %}}

herokuでさくっとHello World作って試してみようかな。

{{% img src="/images/2015-01-25/command_test.png" alt="command_test" w="391" h="115" %}}

おお、出るじゃん！でも`Only you can see this message`って出てる、僕しか見れないっぽい。

## REPLを作ろう

なんかSlack上でプログラム打つと実行結果が返ってくるみたいなやつ誰かが作ってた気がするんだけど気のせいかもしれない。
まあとりあえず、作ったばっかの[paiza.IO](https://paiza.io/)のAPIを叩くあれを導入してみる。

[paiza.ioのAPIを使ってreplを作る | Unresolved](http://yet.unresolved.xyz/blog/2015/01/25/make-repl-using-the-paizaio/)

スラッシュコマンドAPIは`/command args`って感じにやると、指定したURLに`text`ってパラメータ名で`args`が飛ばされるみたい。
なので`/repl ruby:p "hello"`って感じで実行できるようにしよう。

{{% img src="/images/2015-01-25/slack_repl.png" alt="slack_repl" w="977" h="463" %}}

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

{{% img src="/images/2015-01-25/slack_repl_run.png" alt="slack_repl_run" w="433" h="311" %}}

Javaは少し面倒ですね。

