---
slug: "does-not-work-lobos-in-heroku"
title: "Lobosでマイグレーションができない in Heroku"
eyecatch: "clojure.png"
date: 2014-12-21
comments: true
tags: ["heroku", "clojure", "migration", "lobos", "postgresql"]
---

ClojureのWebアプリがとりあえず動くところまで行ったんだけど、Herokuにのせようとしたら詰まった。

## 何が起きたか

今だにHerokuの使い方がようわからんのだけど、

とりあえずローカルから向き先変えるよりもSSHの方がいっかなってことで`heroku run bash`してやってます。

ローカルからだとDBをSSLで接続させないといけないし・・・。

んでマイグレーションしようとしたら、

``` clojure-repl
user=> (migrate)
nil
```

何も出ない。

本当はこんな感じで、

``` clojure-repl
user=> (migrate)
add-sites-table
add-entries-table
nil
```

作成されたり変更されたテーブルが出てくるはず。

## 原因はなんだったのか

`lobos.migrations`が読まれてない（というかリロードされてない）っぽい。

そもそも`migrate`自体はこんな感じで`lobos.migration`の`do-migrations`を呼んでます。

``` clojure
(defcommand migrate [& names]
  (let [names (if (empty? names)
                (mig/pending-migrations db-spec sname)
                names)]
    (mig/do-migrations db-spec sname :up names)))
```

で、`do-migrations`はこんな感じで、`list-migrations-names`の結果を絞って実行してる。

たぶんマイグレーション済みのものは除外とかそんな感じなんじゃないだろうか。

``` clojure
(defn do-migrations [db-spec sname with names & [silent]]
  (let [filter-migs #(only % (list-migrations-names))
        migrations (->> names
                        (map str)
                        filter-migs
                        (when->> (= with :down) reverse)
                        (map symbol)
                        (map (partial ns-resolve *migrations-namespace*))
                        (map var-get))]
    (binding [*record* nil]
      (doseq [migration migrations]
        (let [name (-> migration meta :name)]
          (when-not silent
            (println name))
          (if (= with :up)
            (do
              (up migration)
              (insert-migrations db-spec sname name))
            (do
              (down migration)
              (delete-migrations db-spec sname name))))))))
```

で`list-migrations-names`の定義がこれ、`list-migrations`を呼んでる。

``` clojure
(defn list-migrations-names []
  (map #(-> % meta :name str) (list-migrations)))

(defn list-migrations []
  (if *reload-migrations*
    (when (.exists (migrations-file))
      (swap! migrations (constantly []))
      (use :reload *migrations-namespace*)
      @migrations)
    @migrations))
```

この`list-migrations`が問題のようで、いや、たぶんHeroku側の環境がよくないんだと思うけど、

``` clojure
      (use :reload *migrations-namespace*)
```

この`:reload`が正常に動かなくてマイグレーション対象が取れてない。

だから`list-migrations`を実行した時、1回目はきちんとロードされて、

2回目は`(swap! migrations (constantly []))`で空っぽになったままリロードされてないのが悪かったみたい。

だからこんな風に、2回目の実行からは空になった`migrations`が返ってくる。

``` clojure-repl
user=> (use 'lobos.migration)
WARNING: complement already refers to: #'clojure.core/complement in namespace: user, being replaced by: #'lobos.migration/complement
nil
user=> (list-migrations)
[#<migrations$reify__2390 lobos.migrations$reify__2390@445aed> #<migrations$reify__2392 lobos.migrations$reify__2392@42bfb95d>]
user=> (list-migrations)
[]
user=>
```

## 解決策

もう正直ここまでで一週間弱悩んだから、lobos使うのやめようかなとも思ったけどまあいい勉強だろうし・・・。

暫定にしかならないけど、とりあえずリロードさせないようにしよう。

ソースコードの通り、`*reload-migrations*`が`true`になっている場合にリロードが走るらしい。

だからこんな感じで`false`で上書いてしまおう。

``` clojure-repl
user=> (use 'lobos.migration)
WARNING: complement already refers to: #'clojure.core/complement in namespace: user, being replaced by: #'lobos.migration/complement
nil
user=> (ns lobos.migration)

IllegalStateException defonce already refers to: #'lobos.utils/defonce in namespace: lobos.migration  clojure.lang.Namespace.warnOrFailOnReplace (Namespace.java:88)
user=> (def ^{:dynamic true} *reload-migrations* false)
#'lobos.migration/*reload-migrations*
lobos.migration=> (use 'lobos.core)
WARNING: alter already refers to: #'clojure.core/alter in namespace: lobos.migration, being replaced by: #'lobos.core/alter
WARNING: drop already refers to: #'clojure.core/drop in namespace: lobos.migration, being replaced by: #'lobos.core/drop
nil
lobos.migration=> (migrate)
add-sites-table
add-entries-table
nil
lobos.migration=>
```

これじゃない感がすごいけど、とりあえず通った・・・。

Lobosはもう開発があんまり活発じゃないみたいだなあ。

`lobos.migration`と`lobos.migrations`の命名はちょっといけてないような・・・。
