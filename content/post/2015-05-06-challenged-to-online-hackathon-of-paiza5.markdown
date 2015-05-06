---
comments: true
date: 2015-05-06T09:54:46+09:00
eyecatch: "clojure.png"
slug: "challenged-to-online-hackathon-of-paiza5"
tags: ["clojure", "paiza", "hackathon"]
title: "例によってpaiza online hackathon5をClojureで解いてみた"
---

まずい更新することがない。

とりあえずPOHネタでこの場をしのごう。

[マンガ版「俺の許嫁と幼なじみが修羅場すぎる」｜paizaオンラインハッカソン5](https://paiza.jp/poh/enshura?locale=ja)

今回はパフォーマンスとかの問題はなく、ただただロジックが面倒くさいものばっかでした。

## Problem 1

``` clojure
(def in (line-seq (java.io.BufferedReader. *in*)))

(def p1 (->> in
             first
             (take-nth 2)
             clojure.string/join))

(println p1)
```

そもそもこれシーケンスで取らなければ`first`とかつけなくてよかったんじゃないかなあ。

そんな方法あるかわかんないけど。

## Problem 2

``` clojure
(def in (map
         #(Integer/parseInt %)
         (line-seq (java.io.BufferedReader. *in*))))

(defn take-padding [coll pad]
  (->> coll
       (partition-all pad)
       (map first)))

(def p2
  (let [l (rest in)]
    (map #(apply + %)
         (for [i (range 7)]
           (take-padding (drop i l) 7)))))

(print (clojure.string/join "\n" p2))
```

結構強引にシーケンス操作を書いたけど、もっと楽にやれる関数が用意されてる気する。

## Problem 3 RENA

``` clojure
(def in (for [e (map #(.split % " ") (line-seq (java.io.BufferedReader. *in*)))]
          (map #(Integer/parseInt %) e)))

(defn point-to-range [coll]
  (for [v (map #(partition 2 %) coll)]
    (let [[s e] v]
      (for [x (range (- (first s) 1) (first e))
            y (range (- (second s) 1) (second e))]
        [x y]))))

(def p3r
  (let [[w dc rc] (first in)
        d (take dc (rest in))
        r (->> (point-to-range (take-last rc in))
               (apply concat)
               distinct)]
    (for [e r]
      (nth (nth d (second e)) (first e)))))

(print (apply + p3r))
```

エクセル的なやつ。

めんどくさかった。

## Problem 3 MINAMI

``` clojure
(def in (line-seq (java.io.BufferedReader. *in*)))

(defn h2v [coll n]
  (for [c (range n)]
    (map #(nth % c) coll)))

(defn compl [n coll]
  (concat (take (- n (count coll)) (repeat 0)) coll))

(def p3m
  (let [tc (for [e (map #(.split % " ") in)]
             (map #(Integer/parseInt %) e))
        [x y] (-> tc first)
        coll (rest tc)]
    (h2v (->> (h2v coll x)
              (map (fn [c] (filter #(not= 2 %) c)))
              (map #(compl y %))) y)))

(print (clojure.string/join "\n"
                            (map #(clojure.string/join " " %) p3m)))
```

爆弾のやつ。

めんどくさかった。
