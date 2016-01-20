---
date: 2016-01-20T16:15:58+09:00
slug: "add-compile-target-of-asset-pipeline-at-rails"
tags: ['ruby-on-rails', 'asset-pipeline', 'ruby']
title: 'Asset Pipelineのコンパイル対象を追加する'
---

デフォルトだと`application.css`とかじゃないですか。
でも例えば管理画面を作ったりとかでごっそりデザインの違うページを作るときに少し困ったんです。

まあ普通はそういう時、モジュールごと完全に分けるべきなのか・・・。疎結合ね・・・。

解決方法はエラーに出てました。

```
ActionView::Template::Error (Asset was not declared to be precompiled in production.
Add `Rails.application.config.assets.precompile += %w( application_target.css )` to `config/initializers/assets.rb` and restart your server):
```

`config/initializers/assets.rb`に追記すればいい。

``` ruby
Rails.application.config.assets.precompile += %w( application_target.css )
```

Rails覚えらんないよー

