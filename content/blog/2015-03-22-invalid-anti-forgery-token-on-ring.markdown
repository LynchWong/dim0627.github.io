---
date: 2015-03-22T19:23:27+09:00
slug: "invalid-anti-forgery-token-on-ring"
tags: ["security", "clojure", "ring"]
title: "[Clojure]ringのCSRFトークンを生成する"
---

ClojureのWebアプリは大抵ringでルーティングとかやると思うんだけど、

デフォルトだとPOSTリクエストした時にCSRFトークンチェックが入るようになってると思う。

で、そのトークンの作成の仕方を毎回調べてるのでメモっときたい。

チェックの処理は`site-defaults`の、

``` clojure
(def app
  (wrap-defaults app-routes site-defaults))
```

`:security`のところで設定出来る。

``` clojure
(def site-defaults
  "A default configuration for a browser-accessible website, based on current
  best practice."
  {:params    {:urlencoded true
               :multipart  true
               :nested     true
               :keywordize true}
   :cookies   true
   :session   {:flash true
               :cookie-attrs {:http-only true}}
   :security  {:anti-forgery   true
               :xss-protection {:enable? true, :mode :block}
               :frame-options  :sameorigin
               :content-type-options :nosniff}
   :static    {:resources "public"}
   :responses {:not-modified-responses true
               :absolute-redirects     true
               :content-types          true}})
```

これを`false`にしちゃえばもちろんCSRFのチェックはされなくなるんだけど、まあ普通はするべきだよね。

トークンの生成の仕方はこう。


``` clojure
(ns sample.handler
  (:require [ring.util.anti-forgery :refer :all]))
(anti-forgery-field)
```

`ring.util.anti-forgery`の中身はこんな感じ。

``` clojure
(ns ring.util.anti-forgery
  "Utility functions for inserting anti-forgery tokens into HTML forms."
  (:use [hiccup core form]
        ring.middleware.anti-forgery))

(defn anti-forgery-field
  "Create a hidden field with the session anti-forgery token as its value.
  This ensures that the form it's inside won't be stopped by the anti-forgery
  middleware."
  []
  (html (hidden-field "__anti-forgery-token" *anti-forgery-token*)))
```

