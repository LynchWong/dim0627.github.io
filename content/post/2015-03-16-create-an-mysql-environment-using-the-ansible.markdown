---
comments: true
date: 2015-03-16T23:15:49+09:00
eyecatch: "ansible.png"
slug: "create-an-mysql-environment-using-the-ansible"
tags: ["vagrant", "ansible"]
title: "Ansibleを使ってMySQLが動く環境を手っ取り早く作る"
---

ちょっと友人と共同で開発しているWebアプリがあって、DBの用意も手軽に共有したいのでAnsibleでやることに。

まあオレはViewしか触ってないから別になくてもいいんだけど・・・。

## hostsを書く

Ansibleが取り扱うマシンの定義をしておかなきゃいけない。

`Vagrantfile`で作られる仮想マシンのipを固定して、

``` ruby
  config.vm.network "private_network", ip: "192.168.33.20"
```

Ansibleに読み込ませる`hosts`に定義しよう。

```
[vagrant]
192.168.33.20
```

ansibleのsshがrefuseで止められる場合は、`vagrant ssh-config >> ~/.ssh/config`とかしておけば多分大丈夫。

## Vagrantfileでプロビジョニング出来るようにする

せっかくだし`vagrant up`か`vagrant provision`でプロビジョニングしてほしい。

`Vagrantfile`にこんな感じの記述をすれば、初回実施時にAnsibleのPlaybookを実行してくれるらしい。

Ansibleはなんかコマンド覚えらんないしちょうどいいね。

``` ruby
  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "env/dev-playbook.yml"
    ansible.inventory_path = "env/hosts"
    ansible.limit = 'all'
  end
```

今回は`Vagrantfile`があるディレクトリに`env`ってディレクトリを作って、そこに設定ファイルを置くことにした。

Playbookとかもここに入れていくよ。

## Ansible Galaxyを使う

AnsibleはPlaybookにモジュールの導入やらの記述をするようなので用意する。

Playbookはymlで書くんだけど、正直個人的に使う環境のためにガリガリ書くのはバカらしいよね。

特にMySQLなんて相当な数の人が使ってるだろうし、そのノウハウを使わせてもらいたい。

Ansibleには[Ansible Galaxy](https://galaxy.ansible.com/)っていうWebサービスがあって、モジュール単位のよく使う定義をアップできるみたい。

[Ansible Galaxy | Find, reuse, and share the best Ansible content](https://galaxy.ansible.com/)

AnsibleではMySQLやらhttpdやらの個々のモジュールをroleと呼んでるらしい。

つまり今回はMySQLのroleを探せばいい。

検索は[Browse Roles](https://galaxy.ansible.com/list#/roles)から出来ます。

検索結果、デフォルトで評価の降順にしておいて欲しいんだけど・・・。

今回は[ANXS.mysql](https://galaxy.ansible.com/list#/roles/509)という奴を使わせてもらうことにしました。

理由は、評価がそれなりに高くて、MySQLの設定等が見たまんまでやれそうだったから。

### Ansible Galaxyからroleをインストールする

Ansible Galaxyからの導入は`ansible-galaxy install ANXS.mysql`みたいにやれば出来る。

でもこれじゃあ、このPCにだけroleが導入されちゃうし、どんなroleが必要だったのかがわからないね。

だから他の人が環境を作るときに困っちゃう。

そういう時のために`requirements.txt`っていうのを作るのが主流らしい。

これはAnsible Galaxyから導入したroleを記述しておくものみたいで、今回はこんな感じの記述になった。

```
- src: ANXS.mysql
```

シンプル。

導入するときは`ansible-galaxy install -p ./env/roles -r env/requirements.yml`みたいにやればいい。

これで環境を作る手順を統一することができた。

このコマンドは覚えられなそうだから、プロジェクトで使うWikiとかに書いておいたほうがいいね。

ちなみに、roleはAnsible Galaxyにあるものだけじゃなくて、GitHubにあるものとかも導入できるらしい。

### Playbookを書く

じゃあインストールしてきたroleをもとにPlaybookを書こう。

設定の仕方はだいたいAnsible Galaxyに書いてあるんだけど、書いてないのも多いから選ぶときに気をつけたほうがいいかも。

[ANXS.mysql](https://galaxy.ansible.com/list#/roles/509)の場合はこんな感じ。

```
- hosts: vagrant
  user: vagrant
  sudo: yes
  vars_files:
    - mysql.yml
  roles:
  - { role: ANXS.mysql }
```

`roles`で使うroleを指定していて、`vars_files`がroleで使う設定を外だしするための記述。

外だししたファイルがこれ。

```
# Basic settings
mysql_port: 3306                        # The port on which mysql listens
mysql_bind_address: "0.0.0.0"           # The address the mysql server binds on
mysql_root_password: 'root'             # The root password

mysql_character_set_server: 'utf8'
mysql_collation_server: 'utf8_general_ci'

# List of databases to be created (optional)
mysql_databases:
  - name: dev
    collation: "utf8_general_ci"        # optional, defaults to "utf8_general_ci"
    encoding: "utf8"                    # optional, defaults to "utf8"

# List of users to be created (optional)
mysql_users:
  - name: dev
    pass: dev
    priv: "*.*:ALL"                     # optional, defaults to "*.*:ALL"
    host: "%"                           # optional, defaults to "localhost"

# GLOBAL Setting
monit_protection: false                 # true or false, requires ANXS.monit
```

Ansible Galaxyに載っているものからコピってきて、不要なものを消しただけ。

## プロビジョニングする

`vagrant up`か`vagrant provision`すればやってくれる。

[ANXS.mysql](https://galaxy.ansible.com/list#/roles/509)の場合はMySQLユーザの作成とデータベースの作成までやってくれる。

テーブルとかは別途スキーマ定義を用意するだろうし、ここまでやってくれれば十分だね。


