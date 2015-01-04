---
title: "could-not-force-push-on-git"
titleja: "gitでforce pushが出来ない"
eyecatch: "git.png"
date: 2014-09-27
comments: true
categories: [git]
---

typoを直すために`rebase -i`やらをやってたんだけど、操作してたのがmasterブランチだったのでどうしてもforce pushがしたかった。

一人で使ってたリポジトリだしね。

んだけど、`-f`をつけても

``` sh
To git://example.com/project1.git
 ! [rejected]        master -> master (non-fast-forward)
error: failed to push some refs to 'git://example.com/project1.git'
To prevent ... See the 'Note about
fast-forwards' section of 'git push --help' for details.
```

こんな感じになってしまう・・・。

## 解決
gitリポジトリのconfigを見たらこんな項目が、

``` yml
[receive]
    denyNonFastforwards = true
```

どうやらこいつを`false`にすればよかったらしい。

最初はtrueになってるもんなのかな・・・。
