---
slug: "about-sqlserver-clusteredindex-and-nonclustered-index"
title: "クラスタ化インデックスとかカバリングインデックスについてどうせ忘れるからまとめる"
date: 2014-10-23
tags: ["sql server", "database"]
---

SQL Serverを使ってて、曖昧にしかわからないところがあったので少し調べてみた。

## クラスタ化 / 非クラスタ化インデックスの違い

MySQLにも同じ話があったんだね。まず参考にしたのはMSDN。

[クラスター化インデックスと非クラスター化インデックスの概念](http://msdn.microsoft.com/ja-jp/library/ms190457.aspx)

まさにぴったりのタイトルじゃんと思ったんだけどいまいちよくわからない。
いや、わかったっちゃわかったんだけど、だからどうなるとか、だからどうする、っていうところが掴めなかった。

### ここでわかったこと

クラスタ化インデックスは、

* 1テーブルに1つしか作れない。
* これがあると指定されたインデックスの値によってソートされた構造体が出来る。(テーブルの構造ごとそうなる？)
* クラスタ化インデックスが設定されていないテーブルはヒープと呼ばれる未ソートの状態になる。

非クラスタ化インデックスは、

* テーブルとは別に構造を持つ。
* 実データじゃなく、実データへのポインタを持つ。

次に参考にさせてもらったのがこっち。

[SQL Serverのインデックス構造（前編） (1/2)](http://www.atmarkit.co.jp/ait/articles/0501/18/news097.html)

ここは非常にわかりやすかった

B-Treeのイメージも、SQL Server上での実装が具体的にイメージ出来たし、
非クラスタ化インデックスじゃ結局ランダムI/Oが発生するんだね、ってこともわかった。

[RDBMSで使われるB木を学ぼう](http://www.atmarkit.co.jp/fcoding/articles/delphi/05/delphi05a.html)

### ここでわかったこと

* B-Treeなのでリーフノードのレベルが全部同じになる。
* クラスタ化インデックスを利用したクエリの場合、リーフノードに実データがあるのでランダムI/Oが発生しない。
* 非クラスタ化インデックスを利用したクエリの場合、リーフノードにはポインタしかないので、ランダムI/Oが発生する。

こっちのページはよくわかんなかった。

[SQL Serverの大きな特徴、クラスタ化インデックスを押さえよう！](http://enterprisezine.jp/iti/detail/3357)

## カバリングインデックス

マルチカラムインデックスと混同するよね。これは結構わかりやすく書いてくれている記事があった。

[MySQLのインデックスを学ぶ (1)](http://d.hatena.ne.jp/a666666/20100920/1284992435)

> クエリが必要とするカラムがすべてインデックスに含まれている場合、インデックスだけを読めば良いのでとても速い、というもの。

[SQL インデックスを最適化する方法](http://msdn.microsoft.com/ja-jp/library/ff650692.aspx)

> カバーリング インデックスは、WHERE 句およびクエリ列選択の形態をとるすべての列を含む、非クラスタ化インデックスです。

誤った認識があればご指摘ください。

<a rel="nofollow" href="http://www.amazon.co.jp/gp/product/4873115892/ref=as_li_qf_sp_asin_tl?ie=UTF8&camp=247&creative=1211&creativeASIN=4873115892&linkCode=as2&tag=unresolved-22">SQLアンチパターン</a><img src="http://ir-jp.amazon-adsystem.com/e/ir?t=unresolved-22&l=as2&o=9&a=4873115892" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;display: none;" />

<a rel="nofollow" href="http://www.amazon.co.jp/gp/product/4798115169/ref=as_li_qf_sp_asin_tl?ie=UTF8&camp=247&creative=1211&creativeASIN=4798115169&linkCode=as2&tag=unresolved-22">達人に学ぶ SQL徹底指南書 (CodeZine BOOKS)</a><img src="http://ir-jp.amazon-adsystem.com/e/ir?t=unresolved-22&l=as2&o=9&a=4798115169" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;display: none;" />

