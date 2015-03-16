---
comments: true
date: 2015-03-16T22:55:18+09:00
eyecatch: "ansible.png"
slug: "provided-hosts-list-is-empty"
tags: ["vagrant", "ansible" ]
title: "Vagrant + Ansibleでprovided hosts list is empty"
---

AnsibleでVagrant上のCentOSにMySQLを入れようとしたらこれ。

```
PLAY [vagrant] ****************************************************************
skipping: no hosts matched
```

`Vagrantfile`に`inventory_path`を指定しなきゃいけない。

``` ruby
  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "env/dev-playbook.yml"
    ansible.inventory_path = "env/hosts"
  end
```

次はこれ。

```
ERROR: provided hosts list is empty
Ansible failed to complete successfully. Any error output should be
visible above. Please fix these errors and try again.
```

`limit`の指定も必要。

``` ruby
  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "env/dev-playbook.yml"
    ansible.inventory_path = "env/hosts"
    ansible.limit = 'all'
  end
```

## 参考にさせて頂きました

[Vagrant 1.5からAnsibleを使うのならlimit = 'all'が必要 - 今日のハック](http://narusemotoki.tumblr.com/post/82475978900/vagrant-1-5-ansible-limit-all)


