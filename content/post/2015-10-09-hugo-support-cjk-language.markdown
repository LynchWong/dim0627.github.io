---
comments: true
date: 2015-10-09T22:15:51+09:00
eyecatch: "book3.jpg"
slug: "hugo-support-cjk-language"
tags: ["hugo", "golang"]
title: "HugoのSummaryが日本語に対応した"
---

会社のMacにも[Hugo](https://gohugo.io/)をセットアップしてあるんだけど、テーマの編集とかの続きを家でやろうとしたら`.Summary`が異なる挙動をしてることに気づいた。

どうやらHugoのバージョンによって、日本語の解釈がうまくいったりいかなかったりするみたい。

ソースを読んでたらどうやら日本語のサポートもされてるようだ。

[hugo/page.go at 823334875d396bdc15770c335c2029a01a7ef2ce · spf13/hugo](https://github.com/spf13/hugo/blob/823334875d396bdc15770c335c2029a01a7ef2ce/hugolib/page.go)

随分追ってみたんだけど`Metadata`が何を返すのかよくわからず、コミットを見てたらCJKうんたらが追加されたのは最近っぽいことがわかった。

[WordCount and Summary support CJK Language · spf13/hugo@8233348](https://github.com/spf13/hugo/commit/823334875d396bdc15770c335c2029a01a7ef2ce?diff=split)

PRのコメントを読んでみると、configになんか書けばなんとかなりそうな雰囲気。

でもなんで会社のMacは期待した挙動をしてるんだ？

Goのバージョンが新しいから？

今のHugoなら`config.yaml`にこう書けば日本語もきちんと処理をするようになってた。

``` yaml
HasCJKLanguage: true
```

これできちんと70文字？70word？でSummaryが生成されるようになる。

静的サイトジェネレータも実行環境によって挙動が変わることがあると少し面倒だなあ。

Golangは他人の書いたソースが読みやすくて良い。

書くのはあんまりすきじゃないけど。

**追記**

Search Consoleから被リンクを辿ってたら以下の記事にたどり着いた。

[2015 11 05 - log](http://deprode.net/log/logs/2015-11-05/)

上記ブログのauthor様が仰るとおり、僕のHugoの環境はStableじゃなくてDevです。

`<meta name="generator" content="Hugo 0.15-DEV" />`

僕のブログのせいで戸惑わせてしまい、大変失礼しました。

