---
date: 2015-01-25T00:58:15+09:00
slug: "make-repl-using-the-paizaio"
tags: ["heroku", "paizaio", "clojure"]
title: "paiza.IOのAPIを使ってreplを作る"
---

[paiza](http://paiza.jp/)が面白いAPIを公開してたから、そのうち使ってみたいと思ってたんだよね。

[ブラウザでプログラミング・実行ができる「オンライン実行環境」| paiza.IO](https://paiza.io/)

ちょっとSlackAPIで使ってみたいからこの機会に軽くだけ触ってみる。

## 何が出来る？

たくさんの言語のREPLが使える！すごい！

ただ、コンパイル言語はそんな気軽に使える感じではないみたい。

例えばJavaで言えば、`System.out.println("Hello");`だけじゃなくてクラス定義から含めなきゃいけないみたいに。

## どうやって使う？

どうやら[Swagger](http://swagger.io/)っていうOSSを使ってるみたい。

paiza.IO上でのデモも使える。

[Swagger UI](http://api.paiza.io/docs/swagger/#!/runners/)

なんか動かないなと思ったら`https`で`http`のリソースを参照してたみたいで、ブロックされてた。

    Mixed Content: The page at 'https://api.paiza.io/docs/swagger/#!/runners/' was loaded over HTTPS, but requested an insecure XMLHttpRequest endpoint 'http://api.paiza.io/docs/swagger-docs/runners.json?api_key=guest'. This request has been blocked; the content must be served over HTTPS.

評価パターンは3つあるみたい。

### runners/create

コードの実行が出来る。

レスポンスに`id`と`status`が返ってきて、この`id`を使って実行結果とかを見る。

### runners/get_status

実行結果を見ることが出来る。

`completed`とかそういうレベル。

### runners/get_details

実行結果として出力された値とかを見ることが出来る。

`runners/create`で実行して`runners/get_details`で結果を見る感じ。

## Clojureから叩こう

使い方はわかったしURL叩けば済む話だしさっさと作っちゃう。

HTTPアクセスはJavaのクラスを使おうかなと思ったけど、[dakrone/clj-http](https://github.com/dakrone/clj-http)っていうすごく優秀！なライブラリがあったのでこれを使います。

まず`runners/create`を実行するところ。

``` clojure
(defn repl [language source]
  (let [run-id (-> (httpc/post "http://api.paiza.io/runners/create"
                               {:form-params {:source_code source
                                              :language language
                                              :api_key "guest"}
                                :as :json})
                   :body
                   :id)]
    (get-res run-id)))
```

`get-res`は後述。`get_details`を実行するための関数。

`api_key`ってこれでいいのだろうか。

とりあえず動いてはいる！

実行結果の取得はこんな感じ。

``` clojure
(defn get-res [run-id]
  (let [res (httpc/get (str "http://api.paiza.io/runners/get_details?id=" run-id "&api_key=guest")
                           {:as :json})]
    (if (= (-> res :body :status) "running")
      (do (Thread/sleep 100) (recur run-id))
      (-> res :body :stdout))))
```

`runners/create`を実行した直後は`status`が`running`なので、結果が取得できなかった。

なのでスリープかけながら`running`から外れるまで回す苦しい感じに・・・。

