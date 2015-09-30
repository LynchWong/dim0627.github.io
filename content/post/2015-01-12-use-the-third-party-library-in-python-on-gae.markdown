---
tags: ["python", "google app engine"]
comments: true
date: 2015-01-12T00:19:33+09:00
eyecatch: "program4.jpg"
title: "Python on GAEで3rdパーティライブラリを使う"
slug: "use-the-third-party-library-in-python-on-gae"
---

ひさびさに[Google App Engine](https://cloud.google.com/appengine/)を使おうとしたらGoogle Cloud Platformだかなんだかでいろいろと変わってて戸惑った。

何かっていうと3rd Partyのライブラリを使うときにどうやるんだっけなっていうこと。

昔は`requirements.txt`でうまいことやってくれなかったけ？違う？

普通にBeautifulSoupとか使った気するんだけど、どうやってたんだろうか・・・。

## 標準で使えるライブラリ

Google App Engine側に導入されてるライブラリがこれ。

[Third-party Libraries in Python 2.7 - Python — Google Cloud Platform](https://cloud.google.com/appengine/docs/python/tools/libraries27)

基本的なやつとかWAFで使うやつしか入ってないみたい。

## 載ってないやつは使えない？

そんなことはない。

[How to include third party Python libraries in Google App Engine? - Stack Overflow](http://stackoverflow.com/questions/14850853/how-to-include-third-party-python-libraries-in-google-app-engine)

でもずいぶん原始的な方法で、libディレクトリを作ってそこに入れなよって見解らしい。

``` sh
default git:(master)$ tree -L 2
.
|-- CONTRIB.md
|-- LICENSE
|-- README.md
|-- app.yaml
|-- cron.yaml
|-- favicon.ico
|-- lib
|   |-- feedparser.egg-info
|   |-- feedparser.py
|   |-- feedparser.pyc
|   |-- feedparsertest.py
|   |-- sgmllib3.py
|   `-- tests
|-- main.py
|-- main.pyc
`-- temp.py
```

パスも追加

``` python
import sys
sys.path.insert(0, 'lib')
```

今回は手動でzip落として入れちゃったけど、`pip install -t lib`で入れてくのが楽かな。

