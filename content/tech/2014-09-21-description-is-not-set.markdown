---
slug: "description-is-not-set"
title: "_config.ymlに書いたdescriptionが設定されない"
date: 2014-09-21
tags: [ruby, octopress]
---
認識が間違ってるのか、_config.ymlに書いたdescriptionがサイトに反映されない・・・。

`source/_includes/head.html`のコードを見てみるとこんな感じ。

``` html
{% raw %}
  {% capture description %}{% if page.description %}{{ page.description }}{% else %}{{ content | raw_content }}{% endif %}{% endcapture %}
  <meta name="description" content="{{ description | strip_html | condense_spaces | truncate:150 }}">
  {% if page.keywords %}<meta name="keywords" content="{{ page.keywords }}">{% endif %}
{% endraw %}
```

page.descriptionしか見てない？

同じことで悩んでる人いないのかな・・・と思ったら居た。

[Make the Magic Happen](http://sweetme.at/2013/08/06/how-to-set-your-octopress-description-and-keyword-meta-tags/)

やっぱり同じ認識のようだ。

elseifってこう書くんだね。

``` html
{% raw %}
  {% capture description %}{% if page.description %}{{ page.description }}{% elsif site.description %}{{ site.description }}{% else %}{{ content | raw_content }}{% endif %}{% endcapture %}
  <meta name="description" content="{{ description | strip_html | condense_spaces | truncate:150 }}">
  {% if page.keywords %}<meta name="keywords" content="{{ page.keywords }}">{% endif %}
{% endraw %}
```

worked!

