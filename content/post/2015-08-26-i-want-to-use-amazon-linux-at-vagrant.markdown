---
comments: true
date: 2015-08-26T23:12:02+09:00
eyecatch: "aws.png"
slug: "i-want-to-use-amazon-linux-at-vagrant"
tags: ["aws"]
title: "Amazon LinuxをVagrantで使いたい"
---

開発はCentOS、本番はAmazonLinuxにしようとしたら意外と違うところが多くてProvisioningがだるかったので。

## ec2-create-instance-export-task

ec2-create-instance-export-taskっていうCLIのコマンドが用意されているらしい。

[Amazon EC2 インスタンスをエクスポートする - Amazon Elastic Compute Cloud](http://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/ExportingEC2Instances.html)

このコマンドでEC2のinstance_idを指定してS3にイメージファイルをエクスポートできるとのこと。

書式はこんな。

```
ec2-create-instance-export-task instance_id –e target_environment –f disk_image_format -c container_format –b s3_bucket
```

pipで入れたからこんな感じになったよ。

```
aws ec2 create-instance-export-task --instance-id i-82xxx70 --target-environment vmware --export-to-s3-task DiskImageFormat=vmdk,ContainerFormat=ova,S3Bucket=images.xxxxx.jp
```

そしたらこんなエラー。

```
A client error (AuthFailure) occurred when calling the CreateInstanceExportTask operation: vm-import-export@amazon.com must have WRITE and READ_ACL permission on the S3 bucket.
```

しっかり説明を読むと、

>エクスポートされたインスタンスを格納する Amazon S3 バケットを作成します。Amazon S3 バケットでは、[vm-import-export@amazon.com] アカウントへの [Upload/Delete] および [View Permissions] アクセスが付与される必要があります。詳細については、Amazon Simple Storage Service コンソールユーザーガイド の Creating a Bucket および Editing Bucket Permissions を参照してください。

なるほどなるほど。

こんな感じに。

[<img src="/images/2015-08-26/bucket.png" class="image" alt="bucket">](/images/2015-08-26/bucket.png)

そしたら違うエラー。

```
A client error (NotExportable) occurred when calling the CreateInstanceExportTask operation: Only imported instances can be exported.
```

ん？

前提条件を読んでなかった。

[VM Import/Export の前提条件 - Amazon Elastic Compute Cloud](http://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/VMImportPrerequisites.html#vmimport-image-formats)

>Linux/Unix（64 ビット）
>
>Red Hat Enterprise Linux (RHEL) 5.1-5.11、6.1-6.6、7.0-7.1
>
>Note
>Amazon EC2 で実行するときに必要なドライバが存在しないため、RHEL 6.0 はサポートされていません。
>VM Import は、RHEL インスタンスのライセンスポータビリティをサポートしています。既存の RHEL ライセンスは、関連付けられた RHEL インスタンスと一緒にインポートされます。Red Hat Cloud Access の適格性の詳細については、Red Hat ウェブサイトの適格性を参照してください。
>CentOS 5.1～5.11、6.1～6.6、7.0-7.1
>
>Note
>Amazon EC2 で実行するときに必要なドライバが存在しないため、CentOS 6.0 はサポートされていません。
>Ubuntu 12.04、12.10、13.04、13.10、14.04、14.10
>
>Debian 6.0.0-6.0.8, 7.0.0-7.2.0

あっ・・・。

## これでいいや

[Amazon Linux Vagrant Box Images | Geek and I](https://www.geekandi.com/2014/04/13/amazon-linux-vagrant-box-images/)

ちょっと古いし不安だけど、どうせ個人的なやつだし・・・。

## 参考にさせていただきました

[virtualbox - Convert Amazon EC2 AMI to Virtual or Vagrant box - Stack Overflow](http://stackoverflow.com/questions/21920993/convert-amazon-ec2-ami-to-virtual-or-vagrant-box)
