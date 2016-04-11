---
date: 2016-04-11T11:37:39+09:00
slug: "using-the-customized-bootstrap-in-rails"
tags: ["rails", "bootstrap"]
title: "Railsでbootstrap-sassの必要な物だけを使う"
---

簡単にいうとGridシステムだけが使いたい。
他のものは全部いらない。

Bootstrapをgemで入れるのはなんか気持ち悪くて好きじゃないんだけど、今回はしょうがないので使いました。

``` gemfile
gem 'bootstrap-sass', '~> 3.3', '>= 3.3.6'
```

これで`application.css`からBootstrapを読み込むことが出来る。

``` css
@import "bootstrap-sprockets";
@import "bootstrap";
```

でもBootstrapの全部は要らない。Grid以外なにもいらない。

## bootstrap-sassはどのディレクトリにインストールされるのか

これまじでわからん。どこに入るの？
知ってる人が居たら教えてほしい。

### 追記

普通に`GEM_PATH`に入ってた。

## 必要な物だけをimportする

bootstrap-sassがどこに入ってるかわからないけど、
`@import "bootstrap"`で読み込めるってことはコンポーネントをベタ書きしてしまえば行けるはず。
とはいえコンポーネント間でも依存しているので、Gridシステムだけが欲しくても依存してるコンポーネントを書く必要がある。

``` css
@import "bootstrap-sprockets";
@import "bootstrap/variables";
@import "bootstrap/mixins";
@import "bootstrap/grid";
```

ひとまずやりたいことは出来たけどなんか気持ち悪いなあ。
というかBootstrap含めて、出来る限り依存は減らしたい・・・。

