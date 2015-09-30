---
comments: true
date: 2015-09-30T13:44:48+09:00
eyecatch: "laravel.png"
slug: "get-explain-at-laravel"
tags: ['php', 'laravel', 'eloquent-orm', 'database', 'mysql']
title: "[Laravel5.1]発行されたSQLと実行計画を取得する"
---

インデックス設計をするときとか、ORMを通して実際に発行されたSQLとか実行計画がほしい。

## SQLの発行をフックする

ここに書いてあるとおり。

[Database: Getting Started - Laravel - The PHP Framework For Web Artisans](http://laravel.com/docs/5.1/database#listening-for-query-events)

`DB`の`listen`メソッドに`$sql, $bindings, $time`を受け取るClosureを渡せる。

なので`App\Providers\AppServiceProvider`の`boot()`メソッドに、

``` php
    public function boot()
    {
        \DB::listen(function($sql, $bindings, $time) {
            $bindings = implode(', ', $bindings);
            $method = request()->method();
            $url = request()->url();
            \Log::info("Query [{$method}:{$url}] [{$time}s] $sql, [$bindings]");
        });
    }
```

とかやればよい。

## 実行計画も取る

``` php
    public function boot()
    {
        \DB::listen(function($sql, $bindings, $time) {

            if (preg_match("/^select/", $sql)) {
                $explain = \DB::select("explain {$sql}", $bindings);
                \Log::info($explain);
            }

            $bindings = implode(', ', $bindings);
            $method = request()->method();
            $url = request()->url();
            \Log::info("Query [{$method}:{$url}] [{$time}s] $sql, [$bindings]");
        });
    }
```

こう。

updateとかもフックしちゃうと2回発行されたりして面倒なので、selectだけ。

selectに絞らないとしても、explainの取得がさらにフックされて・・・ってなるので、

何かしら絞る必要はあり。

## 本番では取らない

``` php
    public function boot()
    {
        \DB::listen(function($sql, $bindings, $time) {

            if (config('app.env') !== 'production' && preg_match("/^select/", $sql)) {
                $explain = \DB::select("explain {$sql}", $bindings);
                \Log::info($explain);
            }

            $bindings = implode(', ', $bindings);
            $method = request()->method();
            $url = request()->url();
            \Log::info("Query [{$method}:{$url}] [{$time}s] $sql, [$bindings]");
        });
    }
```

こんな感じ。
