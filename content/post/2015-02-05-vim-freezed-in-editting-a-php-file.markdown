---
comments: true
date: 2015-02-05T21:36:25+09:00
eyecatch: "vim.png"
slug: "vim-freezed-in-editting-a-php-file"
tags: ["vim", "php"]
title: "PHPファイルの定数に触るとvimがフリーズする"
---

意外と日が開いたね。

最近はPHPを書いてます。つってもほんと最近からだけど。

そんな最中、さあ書くぞーって時にvimがフリーズしたことがありました。

vimが止まったのは人生初の経験だったので焦りました。

もうほんと困った！

## 原因

ほとんどコピペで作った`.vimrc`のせいで何が悪いのかがわからない・・・。

ていうか未だに書き方がようわからない・・・。

というわけで**とりあえず色々消してみて軽くなるパターンを探す**方法で行くしかなかった。

原始的最強。

結論を言いますと`neocomplcache`の設定が甘かったです。

この設定が原因でした。

```
let g:neocomplcache_omni_patterns.php = '[^. \t]->\h\w*\|\h\w*::'
```

Shougoさんのプラグインを適当に使ってたオレが悪かったんです。

実はこの件に関してはShougoさん本人がまとめててくださってました。

[vim-jp » Hack #193: neocomplcacheの設定について知る　後編](http://vim-jp.org/vim-users-jp/2011/01/06/Hack-193.html)

>g:neocomplcache_omni_patternsは、neocomplcacheがオムニ補完の関数を呼び出すためのキーワードパターンを設定します。 主な言語にはデフォルトで対応していますが、RubyやPHPなど重いものは無効化されています。 設定例のようにすれば有効化できますが、Vimがフリーズする可能性もあります。自己責任で使用してください。

いいタイミングだし、0から書き直すかな・・・。

そしてHappy Vim Lifeを...
