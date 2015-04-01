---
comments: true
date: 2015-04-01T22:42:40+09:00
eyecatch: "linux.png"
slug: "remain-current-directory-when-open-new-window-in-tmux"
tags: ["tmux"]
title: "tmuxでウィンドウを開いたり画面分割したときにディレクトリを維持する"
---

こんな感じ。

```
# v でペインを縦に分割する
bind v split-window -h -c "#{pane_current_path}"

# s でペインを横に分割する
bind s split-window -v -c "#{pane_current_path}"

# 新規ウィンドウでディレクトリを保持
bind c new-window -c "#{pane_current_path}"
```

## 参考にさせていただきました

[tmux 1.9 でペイン分割時にカレントディレクトリを維持 - Studio3104::BLOG.new](http://studio3104.hatenablog.com/entry/2014/10/14/131430)
