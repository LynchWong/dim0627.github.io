---
comments: true
date: 2015-02-05T21:36:25+09:00
eyecatch: "vim.png"
slug: "vim-freezed-in-editting-a-php-file"
tags: ["vim", "php"]
title: "PHPファイルの定数に触るとvimがフリーズする"
---

`neocomplcache`のこの設定が甘かった。

```
let g:neocomplcache_omni_patterns.php = '[^. \t]->\h\w*\|\h\w*::'
```

参考になったのはこの記事。

[vim-jp » Hack #193: neocomplcacheの設定について知る　後編](http://vim-jp.org/vim-users-jp/2011/01/06/Hack-193.html)

>g:neocomplcache_omni_patternsは、neocomplcacheがオムニ補完の関数を呼び出すためのキーワードパターンを設定します。 主な言語にはデフォルトで対応していますが、RubyやPHPなど重いものは無効化されています。 設定例のようにすれば有効化できますが、Vimがフリーズする可能性もあります。自己責任で使用してください。

つまり原因は定数云々じゃなく`self::`がパターンに合致したせいで、補完が走り一気に重たくなったと。

