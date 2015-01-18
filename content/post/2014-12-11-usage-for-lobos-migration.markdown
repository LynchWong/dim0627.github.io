---
slug: "usage-for-lobos-migration"
title: "Lobosを使ってマイグレーションをする"
eyecatch: "clojure.png"
date: 2014-12-11
comments: true
tags: ["clojure", "lobos", "database", "migration", "leiningen"]
---

1年前くらいには、SQLまで隠蔽するORMとか嫌い！テーブルの自動生成やだ！とか言ってたのに、いつの間にかスキーマ操作なんてフレームワークがやるものだよね、って考えになってしまったよ・・・。

というわけでClojureを使ってWeb開発をする際も使いたいので、Lobosというスキーマのマニュピレーション、マイグレーションツールを使ってみます。

## インストール

本体はここ[budu/lobos](https://github.com/budu/lobos)。

`project.clj`に

``` clj
:dependencies [[lobos "1.0.0-beta3"]]
```

を追加して`lein deps`するだけでおーけー。

Leiningenのプラグインとして使える[pupeno/lein-lobos](https://github.com/pupeno/lein-lobos)ってのもあるようだ。

こっちも使う場合は、`ploject.clj`に

``` clj
:plugins [lein-lobos "1.0.0-beta1"]
```

を追加。

全体を載っけるとこんな感じに。

``` clj
(defproject tpc "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :min-lein-version "2.0.0"
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [compojure "1.2.0"]
                 [ring/ring-defaults "0.1.2"]
                 [enlive "1.1.5"]
                 [korma "0.4.0"]
                 [postgresql "9.1-901.jdbc4"]
                 [lobos "1.0.0-beta3"]]
  :plugins [[lein-ring "0.8.13"]
            [lein-haml-sass "0.2.7-SNAPSHOT"]
            [lein-lobos "1.0.0-beta1"]]
  :ring {:handler tpc.core.handler/app}
  :profiles
  {:dev {:dependencies [[javax.servlet/servlet-api "2.5"]
                        [ring-mock "0.1.5"]
                        [org.xerial/sqlite-jdbc "3.6.16"]]}}
  :scss {:src "resources/scss"
         :output-directory "resources/public/css"
         :output-extension "css"})
```

## テーブル定義をしてみる

今回はSQLiteにて実施。

`src`ディレクトリ直下に`lobos`ってディレクトリを作成して、その中にいろいろな設定を突っ込む必要があるらしい。

このディレクトリの名前は変えてもいいみたいだけど面倒になりそうだからこのままで。

まずは接続情報を記載する`src/lobos/config.clj`。

``` clj
(ns lobos.config
  (:use lobos.connectivity))

(def db_dev
     {:classname "org.sqlite.JDBC"
      :subprotocol "sqlite"
      :subname "./dev.sqlite3"})

(open-global db_dev)
```

次にスキーマ操作で使われている(と思われる)ヘルパー、`src/lobos/helpers.clj`を定義。

``` clj
(ns lobos.helpers
  (:refer-clojure :exclude [bigint boolean char double float time])
  (:use (lobos schema)))

(defn surrogate-key [table]
  (integer table :id :auto-inc :primary-key))

(defn timestamps [table]
  (-> table
      (timestamp :updated_on)
      (timestamp :created_on (default (now)))))

(defn refer-to [table ptable]
  (let [cname (-> (->> ptable name butlast (apply str))
                  (str "_id")
                  keyword)]
    (integer table cname [:refer ptable :id :on-delete :set-null])))

(defmacro tbl [name & elements]
  `(-> (table ~name)
       (timestamps)
       ~@(reverse elements)
       (surrogate-key)))
```

で、目的のマイグレーション定義を`src/lobos/migrations.clj`に。

``` clj
(ns lobos.migrations
  (:refer-clojure :exclude [alter drop
                            bigint boolean char double float time])
  (:use (lobos [migration :only [defmigration]] core schema
               config helpers)))

(defmigration add-sites-table
  (up [] (create
          (tbl :sites
            (varchar :name 255)
            (varchar :url 255)
            (varchar :rss 255)
            (varchar :image 255)
            (integer :cat)
            )))
  (down [] (drop (table :sites))))
```

## マイグレーションの実行

ここが結構厄介だった。

というか、出来たといえば出来たんだけど、もっと正しい方法があるような気が・・・。

REPLにて以下を実行。

WARNINGは多分すでに存在するシンボルを置き換えてしまってることの警告だからとりあえず無視。

``` clojure-repl
tpc git:(master)$ lein repl
(use '(lobos connectivity core schema))nREPL server started on port 50092 on host 127.0.0.1 - nrepl://127.0.0.1:50092
REPL-y 0.3.1
Clojure 1.6.0
    Docs: (doc function-name-here)
          (find-doc "part-of-name-here")
  Source: (source function-name-here)
 Javadoc: (javadoc java-object-or-class-here)
    Exit: Control+D or (exit) or (quit)
 Results: Stored in vars *1, *2, *3, an exception in *e

user=> (use '(lobos connectivity core schema))
WARNING: alter already refers to: #'clojure.core/alter in namespace: user, being replaced by: #'lobos.core/alter
WARNING: drop already refers to: #'clojure.core/drop in namespace: user, being replaced by: #'lobos.core/drop
WARNING: boolean already refers to: #'clojure.core/boolean in namespace: user, being replaced by: #'lobos.schema/boolean
WARNING: char already refers to: #'clojure.core/char in namespace: user, being replaced by: #'lobos.schema/char
WARNING: double already refers to: #'clojure.core/double in namespace: user, being replaced by: #'lobos.schema/double
WARNING: bigint already refers to: #'clojure.core/bigint in namespace: user, being replaced by: #'lobos.schema/bigint
WARNING: float already refers to: #'clojure.core/float in namespace: user, being replaced by: #'lobos.schema/float
WARNING: time already refers to: #'clojure.core/time in namespace: user, being replaced by: #'lobos.schema/time
nil
user=> (require 'lobos.migrations)
nil
user=> (migrate)
add-sites-table
nil
user=>
```

確認してみましょう。

``` sh
tpc git:(master)$ sqlite3 dev.sqlite3
SQLite version 3.8.5 2014-08-15 22:37:57
Enter ".help" for usage hints.
sqlite> .tables
lobos_migrations  sites
```

できてる！

まだまだ名前空間とか`require`あたりの理解が甘いなー・・・。
