---
date: 2015-03-22T19:47:22+09:00
slug: "using-clojure-plugin-on-the-vim"
tags: ["vim", "clojure"]
title: "VimのClojureプラグイン覚書"
---

VimでClojure書くときのあれこれをいっつも忘れるのでまとめておこうと思う。新しいことを覚えたら随時追記していこうかな。

## 使ってるプラグイン

### [tpope/vim-classpath](https://github.com/tpope/vim-classpath)

クラスパスの設定をやってくれる。何も考えず入れればよい。

### [guns/vim-slamhound](https://github.com/guns/vim-slamhound)

`require`の整理をやってくれる。不要な奴は消してくれるし、ない奴はclasspathから読み込んで追加してくれる。

### [kien/rainbow_parentheses.vim](https://github.com/kien/rainbow_parentheses.vim)

括弧をrainbowな感じにしてくれる。

### [tpope/vim-fireplace](https://github.com/tpope/vim-fireplace)

[My Clojure Toolchain: Vim](http://blog.venanti.us/clojure-vim/)でもキラープラグインと書かれているfireplace。

VimをREPLと接続してあんなことやこんなことが出来る。
このプラグインの機能、よく使う割によく忘れるんだよなあ。

もはやこの記事はこの覚書のために書いたようなもの。

<kbd>K</kbd> : カーソル位置にある関数のドキュメントを表示する。

<kbd>\[d</kbd> : カーソル位置にある関数のソースを表示する。

<kbd>\[\<C-D\></kbd> : カーソル位置にある関数のソースにジャンプする。

<kbd>\<C-W\>f</kbd> : カーソル位置にある関数のソースを横分割して開く。

<kbd>\<C-W\>gf</kbd> : カーソル位置にある関数のソースをタブ分割して開く。

<kbd>\<C-^\></kbd> : ジャンプする前のファイルに戻る。

<kbd>cpp</kbd> : カーソル行をREPLで実行する。

<kbd>cqq</kbd> : カーソル行をVim内のREPLで編集モードで開く。

`:RunTest` : テストを実行する。

`:Require` : 読み込んでる名前空間をリロードする。

### [venantius/vim-eastwood](https://github.com/venantius/vim-eastwood)

Clojure用のLint。

[scrooloose/syntastic](https://github.com/scrooloose/syntastic)と[jonase/eastwood](https://github.com/jonase/eastwood)と[tpope/vim-fireplace](https://github.com/tpope/vim-fireplace)が必要。

### [venantius/vim-cljfmt](https://github.com/venantius/vim-cljfmt)

Clojure用のフォーマッター。
デフォルトで保存時のフォーマットがかかるようになってるので、入れるだけでOKのはず。

## 使ってないプラグイン

### [guns/vim-clojure-static](https://github.com/guns/vim-clojure-static)

シンタックスハイライト、インデントのためのプラグイン。

あと`clojure.core`の名前空間にある補完機能があるらしい。
なんかあってもなくてもあんまり変わらなかった（設定しきれなかった？）ので使うのをやめた。

### [vim-scripts/paredit.vim](https://github.com/vim-scripts/paredit.vim)

括弧の位置をあれこれ出来るやつ、だと思う。
ちょっと脳みそがそんなにたくさんの事を一気に覚えるのは無理だったので、一旦使うのをやめた。

