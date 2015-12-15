---
date: 2015-02-28T06:34:59+09:00
slug: "name-space-form-reconstructs-for-clojure"
tags: ["vim", "clojure"]
title: "Slamhoundを使ってClojureのrequireを自動生成する"
---

ちょっとVimとClojureの環境を整備したくて、こんなのを読んでました。

[My Clojure Toolchain: Vim](http://blog.venanti.us/clojure-vim/)

そもそも`~/.lein/profiles.clj`の存在を知らなくって、ちょっと色々書いてみることに。

[leiningen/PROFILES.md at master · technomancy/leiningen](https://github.com/technomancy/leiningen/blob/master/doc/PROFILES.md)

サンプルはこんな感じ。

``` clojure
{:user {:plugins [[lein-pprint "1.1.1"]]
        :dependencies [[slamhound "1.3.1"]]}}
```

`lein-pprint`は対象のLeiningenプロジェクトの情報を表示してくれるインスペクタみたいなもの。

いつ使うのだろうか。

`slamhound`はClojureの`require`を自動生成してくれるもの。

今回はこれを導入してみる。

## Slamhound + Vim

Clojureのnsが書きづらいとは思わないけど、まあ面倒なのは確かなわけで自動生成してくれるならそれの方がいい。

SlamhoundはLeiningenから呼び出すことが出来て、こんな感じのclojureプログラムがあったとしたら、

``` clojure
(ns my.namespace
  "I have a doc string.")

(defn -main [& args]
  (pprint args)
  (io/copy (ByteArrayInputStream. (.getBytes "hello"))
           (first args)))
```

こうやると

```
$ lein slamhound src/my/namespace.clj
```

nsのとこがこうなる。

``` clojure
(ns my.namespace
  "I have a doc string."
  (:require [clojure.java.io :as io]
            [clojure.pprint :refer [pprint]])
  (:import (java.io ByteArrayInputStream)))
```

これをVimから呼び出せるようにしたい。

### Slamhoundの導入

[technomancy/slamhound](https://github.com/technomancy/slamhound)

`[slamhound "1.5.5"]`を`~/.lein/profiles.clj`の`:dependencies`に追加するだけ。

replを起動したりなんかすればLeiningenがダウンロードしてくれる。

### Vimプラグインの導入

[guns/vim-slamhound](https://github.com/guns/vim-slamhound)

NeoBundleを使っているのでこんな感じ。

```
NeoBundle 'guns/vim-slamhound'
```

`NeoBundleInstall`とかすればインストールされる。

### 使い方

Vim上で`:Slamhound`すればnsが自動生成される。

`use`で呼び出してたものも`require`に書きなおしてくれたりする。

しかしClojure周りの物って何もかも遅い感じあるけどなんとかなんないのかな・・・。

