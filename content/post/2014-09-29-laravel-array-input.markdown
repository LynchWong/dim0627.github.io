---
title: "laravel-array-input"
titleja: "Laravelで配列をリクエストパラメータにする"
eyecatch: "laravel.png"
date: 2014-09-29
comments: true
tags: [php, laravel]
---
テーブルとかに入れた複数のInputを同じ名前にして配列でサーバに飛ばしたい、ってときいつも困る。

Laravelでやろうとしたときにドキュメントが見つけられなかったのでそれっぽくやってみました。

## やりたいこと

こんな感じで同名で複数の値をサーバに渡したいときにどうしたらいいの？っていう話。

``` html
<form method="post" action="xxx">
    <table>
        <tbody>
            <tr>
                <td><input type="text" name="name"></td>
                <td><input type="text" name="age"></td>
            </tr>
            <tr>
                <td><input type="text" name="name"></td>
                <td><input type="text" name="age"></td>
            </tr>
            <tr>
                <td><input type="text" name="name"></td>
                <td><input type="text" name="age"></td>
            </tr>
        </tbody>
    </table>
</form>
```

ちなみにこのままだとDOMの最後尾にあるものだけが展開されるぽい。


## 方法1 name[]にする

まあ大体のFWがこんな感じで展開してくれるんだろうけど、Laravelでも出来ました。

``` html
<form method="post" action="xxx">
    <table>
        <tbody>
            <tr>
                <td><input type="text" name="name[]"></td>
                <td><input type="text" name="age[]"></td>
            </tr>
            <tr>
                <td><input type="text" name="name[]"></td>
                <td><input type="text" name="age[]"></td>
            </tr>
            <tr>
                <td><input type="text" name="name[]"></td>
                <td><input type="text" name="age[]"></td>
            </tr>
        </tbody>
    </table>
</form>
```

## 方法2 name[key]にする

もちろんこれでも出来た。

``` html
<form method="post" action="xxx">
    <table>
        <tbody>
            <tr>
                <td><input type="text" name="name[0]"></td>
                <td><input type="text" name="age[0]"></td>
            </tr>
            <tr>
                <td><input type="text" name="name[1]"></td>
                <td><input type="text" name="age[1]"></td>
            </tr>
            <tr>
                <td><input type="text" name="name[2]"></td>
                <td><input type="text" name="age[2]"></td>
            </tr>
        </tbody>
    </table>
</form>
```

連想配列になるので、keyはユニークであれば連番じゃなくてもよさそう。

ためしてないからわからんけど・・・。

しかし、tableタグにformが入れられなくて困ることが多いんだけど、みんなどうやって解決してんのかなあ。
