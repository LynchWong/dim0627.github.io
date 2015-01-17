---
slug: "make-new-theme-flatten"
title: "Octopressのテーマを作ってみる"
eyecatch: "octopress.png"
date: 2014-09-21
comments: true
tags: [ruby, octopress, design]
---

元のやつもすっごいかっこよくてよかったんだけど、さすがに他の人とかぶっちゃうのはやだよね。

でもオレはデザイナーじゃないから、あんまりがっつりやるのもやだよね。

てことで元のclassicテーマをパクって作ろう。

Octopressから移行してしまったので、スクリーンショットだけ載せとく。

[<img src="/images/2014-09-21/flatten.png" class="image" alt="flatten">](/images/2014-09-21/flatten.png)

## テーマの変え方

そもそも変え方すら知らない。

てことで調べた。

どうやらここにテーマ単位のディレクトリが配置されるらしい。

``` sh
octopress git:(source)$ ls .themes
classic
```

で、`rake install[theme name]`でインストール。

## テーマの構成

作るにも、テーマの定義に何が必要かがわからぬ。

classicの中を見てみよう。

``` sh
octopress git:(source)$ ls .themes/classic
sass   source
```

んん、シンプル。

察するに`sass`がスタイル系で`source`がテンプレート系なのかな？

別にページレイアウトを変えたいとか、そんなたいそうなことは考えてないので、sass内をいじるだけでよさそう。

sass内はどうなってるのかな？

``` sh
octopress git:(source)$ ls .themes/classic/sass
_base.scss     _partials.scss base           custom         partials       plugins        screen.scss

octopress git:(source)$ ls .themes/classic/sass/custom
_colors.scss _fonts.scss  _layout.scss _styles.scss
```

で、`.themes/classic/sass/custom/_styles.scss`がオーバーライド用のファイルなわけだな。

``` css
// This File is imported last, and will override other styles in the cascade
// Add styles here to make changes without digging in too much
```

本当はsassで書きたいけど今その技術は持ち合わせてないし、ちょっと今やるのも面倒なので普通にCSSを書こう・・・。

ということで出来ました。

[flatten](https://github.com/dim0627/flatten)

gravatarの件が入っちゃってるから、これは後で分離しなきゃなあ。
