---
slug: "make-gravatar-sidebar"
title: "OctopressのサイドバーにGravatarを表示させる"
eyecatch: "octopress.png"
date: 2014-09-20
comments: true
tags: [ruby, gravatar, octopress]
---
## Octopressのサイドバーってどうなってんの？

そもそもOctopressの構成がまだよくわかってないのでそこから勉強しよう。

どうやらデフォルトで準備されてるサイドバーはここに格納されているらしい。

``` sh
octopress git:(source)$ ls source/_includes/asides/
delicious.html    github.html       googleplus.html   pinboard.html     recent_posts.html
```

で、自分で作りたい場合はここに格納するっぽい。

``` sh
octopress git:(source)$ ls source/_includes/custom/asides
about.html   twitter.html
```

って`_config.yml`に書いてあった。

``` yml
# list each of the sidebar modules you want to include, in the order you want them to appear.
# To add custom asides, create files in /source/_includes/custom/asides/ and add them to the list like 'custom/asides/custom_aside_name.html'
default_asides: [custom/asides/about.html, asides/recent_posts.html, custom/asides/twitter.html]
```

## Gravatarの情報って持って来れるの？

ちょっとだけ調べてみたらGravatarの画像だけ持ってくるpluginは用意されてるっぽい。

でもどうせなら自己紹介のところとかも欲しいよね。

で、Gravatarに[開発者向け資料](https://ja.gravatar.com/site/implement/)がありました。

しっかり読んでないけど、[JSONで返せるっぽい](https://ja.gravatar.com/site/implement/profiles/json/)からこれを使えばいいかな。

ハッシュを指定する必要があるみたいなので、公式から取得しとく。

## 作るぞ

なんか最初から`source/_include/custom/asides`に`about.html`ってのがあるし、これにプロフィールを書こうかな。

まず取得したハッシュを`_config.yml`に定義しちゃおう。

``` ruby
# Gravatar
gravatar_hash: 1e092e9f2cda827deb8623be2e846936
```

で、`about.html`からハッシュを参照してJSONを取得しよう。

``` html
<section id="about" style="display: none;">
    <h1>About Me</h1>
    <br />
    <img id="photo">
    <br />
    <div id="displayname"></div>
    <br />
    <div id="aboutme"></div>
    <div id="currentlocation"></div>
    <br />
    <div id="urls"></div>
</section>
<script>
    $(function() {
        var url = "https://ja.gravatar.com/{% raw %}{{ site.gravatar_hash }}{% endraw %}.json?callback=?";
        $.getJSON(url)
            .done(function(data) {
                var entry = data.entry[0];
                $("#photo").attr("src", entry.photos[0].value);
                $("#displayname").html(entry.displayName);
                $("#aboutme").html(entry.aboutMe);
                // $("#currentlocation").html(entry.currentLocation);
                entry.urls.forEach(function(el){
                    $("#urls").append($("<a href='" + el.value + "'>" + el.title + "</a><br />"));
                });

                $("#about").show();
            });
    });
</script>
```

あとはCSSにちょちょいとスタイルをつけるだけ。

独自のスタイルは`.themes/classic/sass/custom/_styles.scss`に書けばいいぽい。

SASSとかも頃合い見て勉強しなきゃいけないかな・・・。

``` css
img#photo {
    display: block;
    margin: auto;
}

div#displayname {
    text-align: center;
    font-weight: bold;
}

div#aboutme {
}

div#currentlocation {
    text-align: center;
}

div#urls {
    text-align: center;
}
```

とりあえず表示出来たからここまででいいや。

ついでに自分用のtheme作っちゃったから、ある程度整備出来たらgithubにあげよっかな。


## 参考にさせて頂きました
[Gravatarのプロフィールを表示するOctopressのサイドバー](http://blog.awairo.net/blog/2013/12/24/octopress-aside-of-getting-profile-from-gravatar/)
