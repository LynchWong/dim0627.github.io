---
slug: "could-not-force-push-on-git"
title: "gitでforce pushが出来ない"
date: 2014-09-27
tags: ["git"]
---

typoを直すために`rebase -i`やらをやってたんだけど、操作してたのがmasterブランチだったのでどうしてもforce pushがしたかった。
一人で使ってたリポジトリだしね。

だけど`-f`をつけてもrejectされてしまう。

``` sh
To git://example.com/project1.git
 ! [rejected]        master -> master (non-fast-forward)
error: failed to push some refs to 'git://example.com/project1.git'
To prevent ... See the 'Note about
fast-forwards' section of 'git push --help' for details.
```

## denyNonFastforwardsプロパティ

gitリポジトリのconfigを見たらこんな項目がありました。

``` yml
[receive]
    denyNonFastforwards = true
```

どうやらこいつを`false`にすればよかったらしい。

最初はtrueになってるもんなのかな・・・。

