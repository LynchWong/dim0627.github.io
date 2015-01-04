---
title: "automatically-compile-the-scss-in-leiningen"
titleja: "LeiningenでSCSSを自動コンパイルする"
eyecatch: "clojure.png"
date: 2014-12-09
comments: true
categories: ["clojure", "leiningen", "sass", "scss"]
---

Clojureを始めて一週間ほどになりまして。

ようやくWebアプリ開発に着手しました。

というわけで開発環境を整えます。

## lein-haml-sassの導入

まったく贅沢な名前してんな！

いえ、[lein-haml-sass](https://github.com/rtircher/lein-haml-sass)は素晴らしいプラグインです。

これを使うとなんとhamlのコンパイルやsass/scssのコンパイルをやってくれます。

ていうか**sassとscssの違い**ってなんだっけ？真面目に考えるとわかんないな。

[CSSコーディングで泣かないためのSassの基礎知識と10の利点 (1/3)](http://www.atmarkit.co.jp/ait/articles/1402/17/news102.html#02)

へえ・・・。

とりあえず導入します。

`project.clj`に

``` clj
(defproject example "1.2.3"
  :plugins [[lein-haml-sass "0.2.7-SNAPSHOT"]])
```

さらに設定も記述。

`resources/sass/`にscssを、`resources/public/css/`にcssを出力する設定。

``` clj
(defproject example-project "1.2.3"
  :haml {:src "resources/haml"
         :output-directory "resources/public/html"
         }

  :sass {:src "resources/sass"
         :output-directory "resources/public/css"
         }

  :scss {:src "resources/scss"
         :output-directory "resources/public/css"
         }
    )
```

ここまではコピペだけど、オレのファイル自体はこんな感じに。

``` clj
(defproject tpc "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :min-lein-version "2.0.0"
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [compojure "1.2.0"]
                 [ring/ring-defaults "0.1.2"]
                 [enlive "1.1.5"]]
  :plugins [[lein-ring "0.8.13"]
            [lein-haml-sass "0.2.7-SNAPSHOT"]]
  :ring {:handler tpc.core.handler/app}
  :profiles
  {:dev {:dependencies [[javax.servlet/servlet-api "2.5"]
                        [ring-mock "0.1.5"]]}}
  :scss {:src "resources/sass"
         :output-directory "resources/public/css"
         :output-extension "css"})
```

## コンパイルする

さっそく`lein sass once`してみるも、何も起きない！

あっ、sassとscssでタスクが違う。

ていうかsassフォルダにscss置くのってなんか違う気がしてきた！あとで名前変えよう。

というわけで、`lein scss once`で無事動きました。

`lein scss auto`で変更監視できるっぽい。
