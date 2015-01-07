---
slug: "move-sidebar-at-under-the-article"
title: "Octopressのサイドバーを下部に移動する"
eyecatch: "octopress.png"
date: 2014-10-22
comments: true
tags: [octopress]
---

デフォルトのテーマだとサイドバーの表示/非表示の切り替えが出来て、非表示にするとサイドバーは記事の下に落っこちるんだけど、

常時この状態にした方がかっこいいんでないか？ということで移動させてみることに。

サイドバーの非表示時に何が起きているかというと、bodyタグにclassが追加されてます。

具体的な処理は`/javascripts/octopress.js`に書いてあるよ。

``` javascript
$('.toggle-sidebar').bind('click', function(e) {
  e.preventDefault();
  if ($('body').hasClass('collapse-sidebar')) {
    $('body').removeClass('collapse-sidebar');
  } else {
    $('body').addClass('collapse-sidebar');
  }
});
```

bodyタグが`collapse-sidebar`クラスに属していれば、サイドバーは勝手に下に落っこちる訳だ。

bodyを描画するテンプレートは`_layouts/default.html`で、こんな記載がある。

長ったらしいので少し見やすく改行してあります。

```
<body
{% if page.body_id %}
    id="{{ page.body_id }}"
{% endif %}

{% if page.sidebar == false %}
    class="no-sidebar"
{% endif %}

{% if page.sidebar == 'collapse' or site.sidebar == 'collapse' %}
    class="collapse-sidebar sidebar-footer"
{% endif %}
>
```

sidebarが`collapse`の場合にclassが追加されるようになってるね。

`sidebar-footer`クラスもレイアウトに必要なものらしい。

というわけでテンプレートを直に変えるのではなくて、`_config.yml`に以下を追加すれば対応出来そうだ。

``` yml
sidebar: "collapse"
```

トグルボタンのスペースが空いてしまうので、`custom/_style.css`に以下も追加。

``` css
.collapse-sidebar #content {
    margin-right: 0;
}
```

大体思い通りになったかな。

別の部分の問題だろうけど、トップページと記事ページで、少しレイアウトが崩れるのが気になる・・・。
