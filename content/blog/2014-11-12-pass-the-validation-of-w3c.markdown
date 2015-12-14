---
slug: "pass-the-validation-of-w3c"
title: "OctopressをW3Cのバリデーションにパスさせる"
date: 2014-11-12
tags: ["html", "octopress"]
---

ふと思い立って[Markup Validation Service](http://validator.w3.org/)をやってみたら13個もエラーが出たので対応してみるよ。

<!-- more -->

    Error Line 50, Column 32: Element hgroup not allowed as child of element header in this context. (Suppressing further errors from this subtree.)
      <header role="banner"><hgroup>
    Content model for element header:
    Flow content, but with no header, footer, or main element descendants.

`hgroup`は`header`タグの中に入れちゃダメだよ。

次のも関連してる。

    Error Line 50, Column 32: The hgroup element is obsolete. To mark up subheadings, consider either just putting the subheading into a p element after the h1-h6 element containing the main heading, or else putting the subheading directly within the h1-h6 element containing the main heading, but separated from the main heading by punctuation and/or within, for example, a span class="subheading" element with differentiated styling. To group headings and subheadings, alternative titles, or taglines, consider using the header or div elements.
      <header role="banner"><hgroup>

`hgorup`タグは非推奨だよ。

よし、消そう。

    Error Line 57, Column 72: Bad value subscribe-rss for attribute rel on element a: The string subscribe-rss is not a registered keyword.
    …><a href="/atom.xml" rel="subscribe-rss" title="subscribe via RSS">RSS</a></li>
    Syntax of list of link-type keywords:
    A whitespace-separated list of link types, with no duplicate keywords in the list. Each link type must be listed as allowed on <a> and <area> in the HTML specification, or must be listed as allowed on <a> and <area> on the Microformats wiki, or must be an absolute URL. You can register link types on the Microformats wiki yourself.

`subscribe-rss`は`rel`に入れていいkeywordじゃないよ。

     Line 64, Column 81: Attribute results not allowed on element input at this point.
    …  <input class="search" type="text" name="q" results="0" placeholder="Search"/>
    Attributes for element input:
    Global attributes
    accept when type is file
    alt when type is image
    autocomplete when type is text, search, url, tel, e-mail, password, datetime, date, month, week, time, datetime-local, number, range, or color
    autofocus
    checked when type is checkbox or radio
    dirname when type is text or search
    disabled
    form
    formaction when type is submit or image
    formenctype when type is submit or image
    formmethod when type is submit or image
    formnovalidate when type is submit or image
    formtarget when type is submit or image
    height when type is image
    list when type is text, search, url, tel, e-mail, datetime, date, month, week, time, datetime-local, number, range, or color
    max when type is datetime, date, month, week, time, datetime-local, number, or range
    maxlength when type is text, search, url, tel, e-mail, or password
    min when type is datetime, date, month, week, time, datetime-local, number, or range
    multiple when type is email or file
    name
    pattern when type is text, search, url, tel, e-mail, or password
    placeholder when type is text, search, url, tel, e-mail, password, or number
    readonly when type is text, search, url, tel, e-mail, password, datetime, date, month, week, time, datetime-local, or number
    required when type is text, search, url, tel, e-mail, password, datetime, date, month, week, time, datetime-local, number, checkbox, radio, or file
    size when type is text, search, url, tel, e-mail, or password
    src when type is image
    step when type is datetime, date, month, week, time, datetime-local, number, or range
    type
    value when type is not file or image
    width when type is image

`input`タグに`results`っていう属性は入れちゃだめだよ。

    Error Line 110, Column 66: Bad value full-article for attribute rel on element a: The string full-article is not a registered keyword.
    … <a rel="full-article" href="/blog/2014/11/09/learn-docker/">Read on &rarr;</a>
    Syntax of list of link-type keywords:
    A whitespace-separated list of link types, with no duplicate keywords in the list. Each link type must be listed as allowed on <a> and <area> in the HTML specification, or must be listed as allowed on <a> and <area> on the Microformats wiki, or must be an absolute URL. You can register link types on the Microformats wiki yourself.

`full-article`は`rel`に入れていいkeywordじゃないよ。

    Line 332, Column 100: An img element must have an alt attribute, except under certain conditions. For details, consult guidance on providing text alternatives for images.
    …3/verify.png"><img src="/images/2014-10-23/verify.png" title="verify" ></a></p>

`img`タグは`alt`属性をつけなきゃだめだよ。

これが計7個。

    Warning Line 511, Column 6: Consider using the h1 element as a top-level heading only (all h1 elements are treated as top-level headings by many screen readers and other tools).
      <h1>About Me</h1>

`h1`はトップレベルだけで使ってよ。

これが計8個。

     Line 513, Column 18: Element img is missing required attribute src.
      <img id="photo">
    Attributes for element img:
    Global attributes
    alt
    src
    crossorigin
    usemap
    ismap
    width
    height

`img`タグに`src`属性がないよ。(Ajaxで書いてたせい。)

    Error Line 612, Column 7: Element style not allowed as child of element aside in this context. (Suppressing further errors from this subtree.)
    <style>
    Contexts in which element style may be used:
    If the scoped attribute is absent: where metadata content is expected.
    If the scoped attribute is absent: in a noscript element that is a child of a head element.
    If the scoped attribute is present: where flow content is expected, but before any other flow content other than inter-element whitespace and style elements, and not as the child of an element whose content model is transparent.
    Content model for element aside:
    Flow content, but with no main element descendants.

`aside`タグの中で`style`書いちゃだめだよ。


てことで、

[<img src="/images/2014-11-12/green.png" class="image" alt="green">](/images/2014-11-12/green.png)

オールグリーン！

警告はもうだるいからいいや
