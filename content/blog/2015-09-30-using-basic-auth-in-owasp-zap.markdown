---
date: 2015-09-30T16:24:53+09:00
slug: "using-basic-auth-in-owasp-zap"
tags: ['security', 'owasp-zap']
title: "OWASP ZAPでBASIC認証を突破する"
---

調べても意外と見つからない。

要はリクエストヘッダに認証情報をくっつけられればいいんだけどその方法がわからない。

## リクエストヘッダに情報を差し込む

Stand AloneのScriptを作ってこんな感じでヘッダを差し込めるらしい

``` javascript
 org.parosproxy.paros.network.HttpSender.addListener(
   new org.zaproxy.zap.network.HttpSenderListener {
     getListenerOrder: function() {
       return 1;
     },

     onHttpRequestSend: function(msg, initiator) {
       msg.getRequestHeader().setHeader(
         "Authorization", "Basic ZHJwaGxxxxxxBob3Rv");
     },

     onHttpResponseReceive: function(msg, initiator) {
     }
 });
```

## 参考にさせて頂きました

[OWASP ZAP で送信されるリクエストに自動で独自ヘッダを追加する方法 - Web Application Security Memo](http://www.pupha.net/archives/2654/)
