---
comments: true
date: 2015-02-14T19:30:22+09:00
eyecatch: "apigility.png"
slug: "make-task-manager-by-using-apigility"
tags: ["javascript", "reactjs", "php", "apigility"]
title: "Apigility + React.jsでタスク管理ツールを作ってみる"
---

これに行ってきました。

[Zend 社技術者による最近の PHP 関連の取り組みご紹介 - Zendイベント管理 | Doorkeeper](http://zendevent.doorkeeper.jp/events/19917)

英語辛かった。

PHP7やらZ Rayやらまあ気になるものはそれなりにあったんだけど、

その中でも触ってみようかなと思えるくらい興味を持てたApigilityを触ってみようと思います。

ついでなので使ってみたかったReact.jsも導入してみる。

## [Apigility](https://apigility.org/)？

API構築に特化したフレームワークらしい。

プレゼンテーションレイヤを完全に分離したアーキテクチャでの利用を想定しているんだと思う。

何が強いかって、DBさえ用意してしまえば後はGUIから操作するだけでAPIが作れてしまう。

DBも多分メジャーどころは大抵使える(と思う)し、APIもRPCはもちろん、RESTfulな設計にもバッチリ対応してるらしい。

今回は勉強も兼ねて、簡単なタスク管理ツールを作ってみます。

## インストール

このコマンドをべしっとやるだけで、カレントディレクトリにapigilityのディレクトリが切られる & サーバまで起動する。

```
curl -sS https://apigility.org/install | php
```

サーバを再度起動する場合は`php -S localhost:8888 -t public public/index.php`とかやればOK。

画面を開くとこんな感じのが出てくる。

[<img src="/images/2015-02-14/apigility_top.png" class="image" alt="apigility_top">](/images/2015-02-14/apigility_top.png)

ロゴがかわいいね。

ここからAPIの追加やデータベース接続の設定やらが出来ます。

## データベースの準備

適当なものなので、SQLiteでやっちゃう。

テーブルはこんな感じで、名前と完了/未完了が持てるだけにしよう。

``` sql
create table tasks(id integer primary key, name varchar(20), finished integer);
```

## Apigilityからデータベースにつなぐ

`Settings`の`Database Adapteres`から定義を追加出来る。

[<img src="/images/2015-02-14/database.png" class="image" alt="database">](/images/2015-02-14/database.png)

今回はこんな感じで設定。

[<img src="/images/2015-02-14/def_database.png" class="image" alt="def_database">](/images/2015-02-14/def_database.png)

## APIを追加する

`APIs`の`Create New API`からAPIを追加する。

今回はTasksという名前で作成した。

[<img src="/images/2015-02-14/create_api.png" class="image" alt="create_api">](/images/2015-02-14/create_api.png)

粒度がわかりづらいけど、ここで作ったAPIに対して個々のサービスを追加していく。

大分類みたいなものだと捉えればいいのかな？

## サービスを追加する

さっき作ったTasksAPIに、データベースの`tasks`テーブルとRESTで紐づくサービスを追加する。

サービスはRESTとRPCから選ぶことが出来て、

RPCを選ぶと自動生成されたPHPのコードに自分で処理を書いていく感じになるみたい。

んで指定したURLを叩くとその処理が呼ばれる、って感じ。

今回は単純にテーブルとURLをRESTfulに対応付けられればいいのでRESTにしてます。

というわけで、`REST Service Name`をtasks、`DB-Connected`はさっき作ったアダプタとテーブル名を設定。

[<img src="/images/2015-02-14/create_service.png" class="image" alt="create_service">](/images/2015-02-14/create_service.png)

こんな感じになる。

[<img src="/images/2015-02-14/def_service.png" class="image" alt="def_service">](/images/2015-02-14/def_service.png)

接続できるか試してみよう。

データがないので、まずはPOSTで格納してみる。

[<img src="/images/2015-02-14/post_tasks.png" class="image" alt="post_tasks">](/images/2015-02-14/post_tasks.png)

いけてるっぽい。

取得は？

[<img src="/images/2015-02-14/get_tasks.png" class="image" alt="get_tasks">](/images/2015-02-14/get_tasks.png)

おお！取れる！

もちろんSQLite側にも、

```
sqlite> select * from tasks;
1|task1|false
```

入ってます。

## ビューを作る

サーバサイドがあまりにもサクッと終わっちゃったな・・・。

後は画面側を生のHTMLにして、取得と格納は全部JSに任せます。

つってもここはあんまり説明してもしょうがないのでSSとコードだけ。

そうですめんどくさくなりました。

表示はこんな感じで、

[<img src="/images/2015-02-14/view.png" class="image" alt="view">](/images/2015-02-14/view.png)

こんなHTMLでやりました。

``` html
<!DOCTYPE HTML>
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
<style>
#tasks-wrapper {
  margin: 20px auto;
  max-width: 500px;
}
#tasks {
}
.buttons {
  margin-right: 5px;
}
.buttons>button {
  margin-right: 5px;
}
</style>

<div id="tasks-wrapper">
  <div class="input-group">
    <input type="text" id="task-name" class="form-control" placeholder="Task name">
    <span class="input-group-btn">
      <button id="task-post" class="btn btn-success" type="button">登録</button>
    </span>
  </div>
  <hr>
  <div id="tasks">
  </div>
</div>
<script src="//cdnjs.cloudflare.com/ajax/libs/react/0.12.2/react.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/react/0.12.2/JSXTransformer.js"></script>
<script src="//code.jquery.com/jquery-2.1.3.min.js"></script>
<script src="/app.js" type="text/jsx"></script>
```

JSはこんな。

``` javascript
var Task = React.createClass({
    del: function(e) {
        $.ajax({
            type: "DELETE",
            url: "/tasks/" + this.props.id,
        });
    },
    finish: function(e) {
        $.ajax({
            type: "PUT",
            url: "/tasks/" + this.props.id,
            data: JSON.stringify({finished: 1}),
            headers: {
                "Content-Type": "application/json",
            }
        });
    },
    render: function() {
        return (<li className="list-group-item clearfix">
                    <div className="buttons pull-left">
                        {this.props.finished == "0" ?
                            (<button className="btn btn-primary btn-xs" onClick={this.finish}>完了</button>)
                            : ""}
                        <button className="btn btn-danger btn-xs" onClick={this.del}>削除</button>
                    </div>
                    <span className="badge">{this.props.finished == "0" ? "未完了" : "完了"}</span>
                    {this.props.name}
                </li>);
    }
});

var Tasks = React.createClass({
    getInitialState: function() {
        return {
            tasks: [],
        };
    },
    loadTasks: function() {
        $.get(this.props.source, function(result) {
            if(this.isMounted()) {
                this.setState({
                    tasks: result._embedded.tasks,
                });
            }
        }.bind(this));
    },
    componentDidMount: function() {
        this.loadTasks();
        setInterval(this.loadTasks, 2000);
    },
    render: function() {
        var tasks = this.state.tasks;
        return (<ul className="list-group">
        {
            tasks.map(function(task) {
                return <Task id={task.id} name={task.name} finished={task.finished} />
            }.bind(this)
        )}</ul>);
    }
});

React.render(
    <Tasks source="/tasks" />,
    document.getElementById('tasks')
);

$("#task-post").on("click", function() {
    $.ajax(
        {
            type: "POST",
            url: "/tasks",
            data: JSON.stringify({name: $("#task-name").val(), finished: 0}),
            headers: {
                "Content-Type": "application/json",
            }
        })
});
```

React.js気軽に手出したけど、まじでむずい。

一人で書いてもこんだけぐちゃぐちゃするんだから、複数人でやるときはマジで気をつけないとすごいことになりそう。

## まとめ

Apigility、すごく楽。

React.jsで心折れかけたけどそれはApigilityには関係ないわけで、サーバサイドの実装は本当にさくっと終わりました。

ただ、ドキュメントが致命的なほど少ないよ。

Getting Startedとかはしっかり書かれてるから導入は楽なんだけど、少しでも発展的なものになると何処にも載ってない。

さらにユーザも少ないから情報が拾えなくて、これをプロダクトで使うとなると辛い場面が多いかなと思った。

公式のドキュメントは結構ひどくて、2013年からの開発なのに8割くらい工事中だったりする。

だから実際にこれを使いますか？ってなると、「まあ個人利用では使うかもしれませんね」って答えになってしまうかなあ。

でもやっぱりこの楽さは魅力なので、今後整備されていくことに期待。

React.jsはもう少ししっかり勉強します。
