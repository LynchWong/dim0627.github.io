---
comments: true
date: 2015-01-15T21:12:52+09:00
eyecatch: "clojure.png"
slug: "challenged-to-online-hackathon-of-paiza"
tags: ["paiza", "clojure", "hackathon"]
title: "Clojureで新卒の女の子を射止めた話"
---

何やらプログラムの問題を解くと可愛い女の子とハネムーンにいけるとかいう企画を[paiza](http://paiza.jp/)が開催していたらしい。

[マンガ版「エンジニアでも恋がしたい！」〜転職初日にぶつかった女の子が同僚だった件〜｜paizaオンラインハッカソン4 Lite](https://paiza.jp/poh/enkoi)

会社の子からすすめられたのをずっと放置してたんだけど実際やってみたらなかなか面白かった。

ちなみに実際に手に入るのはハネムーンじゃなくてねるねるねるねかラズパイだったらしい。

ねるねるねるね・・・。

## Problem 1

>在庫計算プログラムを作成してください。改行区切りで N 個の商品の各在庫数 S が入力されるので、その合計を出力して下さい。 
>解答次第でこの後のストーリーが変わります！！

**入力される値**

>入力は標準入力にて以下のフォーマットで与えられます。 
>N
>S_1
>S_2
>・
>・
>S_N

**条件**

>すべてのテストケースにおいて、以下の条件をみたします。 
>1 ≦ N ≦ 100
>0 ≦ S_i ≦ 100

**期待する出力**

>全ての商品の在庫数を足した数を出力してください。最後は改行し、余計な文字、空行を含んではいけません。

ふむふむ。

ちなみにpaizaで使えるClojureのREPLはベータ版とのことで、変な挙動をするかも〜とのこと。

入力の受け方はこんな感じ。

``` clojure
(def in (line-seq (java.io.BufferedReader. *in*)))
```

オレの回答はこんな感じ。

``` clojure
(def in (line-seq (java.io.BufferedReader. *in*)))
(defn p1 [] (reduce + (map #(Integer/parseInt %) (rest in))))
(print (p1))
```

普通に`reduce`で回しただけ。

## Problem 2

>改行区切りで N 個の各商品の在庫数 S が入力されるので、その合計を出力して下さい。

**入力される値**

>入力は以下のフォーマットで与えられる。 
>N 
>T_1 S_1 P_1 
>T_2 S_2 P_2 
>・ 
>・ 
>・ 
>T_N S_N P_N

**条件**

>すべてのテストケースにおいて、以下の条件をみたします。 
>1 ≦ N ≦ 100 
>1 ≦ T_i ≦ 100 
>0 ≦ S_i ≦ 100 
>1 ≦ P_i ≦ 10,000 

**期待する出力**

>在庫数を最低限必要な在庫数を満たすために必要な金額の合計を出力してください。 
>最後は改行し、余計な文字、空行を含んではいけません。

問題文をよく読まずに解いて何度かミスりました。

``` clojure
(def in (line-seq (java.io.BufferedReader. *in*)))
(defn p2 []
  (let [in (map #(.split % " ") (rest in))]
    (loop [l in res 0]
              (if (empty? l) res
                (let [[t s p] (map #(Integer/parseInt %) (first l))]
                  (recur (rest l) (+ res (if (> t s) (* (- t s) p) 0))))))))
(print (p2))
```

単純に`if`で条件かけながら再帰させた。

## Problem 3

>区間合計点数の最大値を出力するプログラムを作成して、ゲームを完成させてください。

**入力される値**

>入力は以下のフォーマットで与えられる。 
>t n 
>m_1 
>m_2 
>m_3 
>... 
>m_n 

**条件**

>すべてのテストケースにおいて、以下の条件をみたします。 
>1 ≦ t ≦ n ≦ 300,000 
>0 ≦ m_i ≦ 10,000

**期待する出力**

>区間合計点数の最大値を出力せよ。 
>最後は改行し、余計な文字、空行を含んではならない。

これはタイムアウトで何度も苦しんだ。

`partition-all`で分割したものを`map` & `reduce`で合算して`apply` & `max`っていう何も考えなさすぎるロジックにしたのが悪いんだけど・・・。

通ったのはこれ。

``` clojure
(def in (line-seq (java.io.BufferedReader. *in*)))
(defn p3 []
  (let [[len c] (map #(Integer/parseInt %) (.split (first in) " "))
        smr (reductions + (map #(Integer/parseInt %) (rest in)))]
    (if (= len c) (last smr)
      (loop [l smr sfxl (drop len l) res 0]
        (if (empty? sfxl) res
          (recur (rest l) (rest sfxl) (max (- (first sfxl) (first l)) res)))))))
(print (p3))
```

無理だなーって[Clojure - cheatsheet](http://clojure.org/cheatsheet)見ながらぐだぐだしてたら`reductions`でなんとかなりそうな事に気づいた。

最初にどっと重い処理になるんじゃないかなと思って不安もあったけど、そんなことないのかな。無事通ったので良かったです。

計算結果だしちゃえばあとは再帰させながら区間合計を算出 & 最大値を抽出でなんとか。

## やってみて

Clojureを始めてからずっと感じてる事だけど、アルゴリズムを考える力が弱いなあと思う。

Webだとそれで乗り切れる部分が多かったんだろうけど、こういった問題を解いて地力をつけることも大切だなあと感じた。

多分Clojureの界隈で有名な方々が組む答えはまた違うんだろうなあ。

ぜひそういうのも見てみたいけど、調べてみたらあんまり解いてる人とか公開してる人がいない感じだった。

ちなみにラズパイとかは期間が過ぎてるのでもらえません。

