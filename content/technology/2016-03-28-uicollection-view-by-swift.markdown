---
date: 2016-03-28T12:21:32+09:00
slug: "uicollection-view-by-swift"
tags: ["swift", "ui-collection-view"]
title: "swiftでUICollectionViewを扱う"
---

セクションってなにさ

[UICollectionViewDataSource Protocol Reference](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UICollectionViewDataSource_protocol/#//apple_ref/occ/intfm/UICollectionViewDataSource/numberOfSectionsInCollectionView:)

> Asks your data source object for the number of sections in the collection view.

コレクションをグループ化することが出来るらしい。

* [UICollectionView その3 セクション | Cyber Passion for iOS](http://blogios.stack3.net/archives/932)
* [stack3/UICollectionViewSample](https://github.com/stack3/UICollectionViewSample)

セクション数を指定するメソッドはこれ。
セクション単位にヘッダーを付けたりもできるらしい。

``` swift
override func numberOfSectionsInCollectionView(collectionView: UICollectionView) -> Int {
    return 1
}
```

個々のセルを生成するメソッド。
CellにIdentifierを設定していないといけない。

``` swift
override func collectionView(collectionView: UICollectionView, cellForItemAtIndexPath indexPath: NSIndexPath) -> UICollectionViewCell {
    let cell:Post = collectionView.dequeueReusableCellWithReuseIdentifier("postCell", forIndexPath: indexPath) as! Post
    return cell
}
```

1セクションに表示するセル数の定義。

``` swift
override func collectionView(collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
    return 20
}
```

swiftもむずいけどXcodeの使い方のほうがむずい。

