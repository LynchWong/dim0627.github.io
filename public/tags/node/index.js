<!DOCTYPE html>

<head>
<meta charset="utf-8">


<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">



<meta property="og:title" content="Unresolved">
<meta property="og:url" content="http://yet.unresolved.xyz/">

<meta property="og:site_name" content="Unresolved">
<meta name="google-site-verification" content="SLxungm5o9WvGwPUEGZCspbMBAsLBjOxAHNyjIBUuSI" />

<title>
    
    Tags | Unresolved
    
</title>


<link rel="stylesheet" href="//fonts.googleapis.com/css?family=PT+Serif:400,400italic,700|PT+Sans:400">
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css">
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.4/styles/solarized_dark.min.css">
<link rel="stylesheet" href="http://yet.unresolved.xyz//css/base.css">
<link rel="stylesheet" href="http://yet.unresolved.xyz//css/styles.css">
<link rel="stylesheet" href="http://yet.unresolved.xyz//css/custom.css">


<link rel="shortcut icon" href="http://yet.unresolved.xyz//assets/favicon.ico">


<link rel="alternate" type="application/rss+xml" title="RSS" href="http://yet.unresolved.xyz//index.xml">
</head>



<div class="wrap">
    <div class="masthead">
        <div class="container">
            <h3 class="masthead-title">
                <a href="http://yet.unresolved.xyz/" title="Home">Unresolved</a>
            </h3>
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
        </div>
    </div>

    <div class="container content">


<div class="posts">
    
    <article class="post">
    <div class="eyecatch">
        
        <a href="http://yet.unresolved.xyz/blog/2014/10/18/install-nodejs-on-ubuntu/"><img src="http://yet.unresolved.xyz//images/nodejs.png" alt="Ubuntuにnode.jsをインストールする"></a>
        
    </div>
    <div class="data">
        <span class="post-date">Sat, Oct 18, 2014</span>
        <h1 class="post-title"><a href="http://yet.unresolved.xyz/blog/2014/10/18/install-nodejs-on-ubuntu/">Ubuntuにnode.jsをインストールする</a></h1>
        <div class="summary">そろそろ新しいことをやらねばなと思うので、node.jsに手を出してみるよ。 node.jsはmake &amp; make installを推奨しているとのことなので、とりあえずソースを持ってくる。 $ wget http://nodejs.org/dist/v0.10.32/node-v0.10.32.tar.gz $ tar zxvf node-v0.10.32.tar.gz $ make そしてエラー flock: g++: No such file or directory make[1]: * [/home/daisuketsuji/Develop/node/out/Release/openssl-cli] Error 69 make[1]: Leaving directory `/home/daisuketsuji/Develop/node/out' make: * [node] Error 2 g++がない。 build-essentialを使えばいいらしい。 $ sudo apt-get install -y build-essential $ make $ make install またエラー installing /usr/local/bin/node Traceback (most recent call last): File &quot;tools/install.py&quot;, line 191, in &lt;module&gt; run(sys.argv[:]) File &quot;tools/install.py&quot;, line 186, in run if cmd == 'install': return files(install) File &quot;tools/install.py&quot;, line 130, in files action(['out/Release/node'], 'bin/node') File &quot;tools/install.py&quot;, line 79, in install def install(paths, dst): map(lambda path: try_copy(path, dst), paths) File &quot;tools/install.py&quot;, line 79, in &lt;lambda&gt; def install(paths, dst): map(lambda path: try_copy(path, dst), paths) File &quot;tools/install.py&quot;, line 70, in try_copy try_unlink(target_path) # prevent ETXTBSY errors File &quot;tools/install.py&quot;, line 33, in try_unlink os.unlink(path) OSError: [Errno 13] Permission denied: '/usr/local/bin/node' make: *** [install] Error 1 ああ・・・。 $ sudo make install 行けたっぽいのでインタラクティブシェルを起動してみる。 daisuketsuji@daisuketsuji-VirtualBox:~/Develop/node-v0.10.32$ node &gt; console.log(&quot;hello world&quot;) hello world worked!</div>
    </div>
    <footer class="readon">
        <a href="http://yet.unresolved.xyz/blog/2014/10/18/install-nodejs-on-ubuntu/">
            <i class="fa fa-chevron-down"></i>
        </a>
    </footer>
</article>
<hr>

    
</div>


    </div>
</div>

<div class="container footer-ad">
    <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-4218045898905176"
         data-ad-slot="4750057642"
         data-ad-format="auto"></ins>
    <script>
(adsbygoogle = window.adsbygoogle || []).push({});
    </script>
</div>


<aside class="sidebar-wrapper">
    <div class="container">
        
        <div class="tags tag-cloud">
            <h2>Tags</h2>
            <ul class="post-tags">
                
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/ansible">
                        ansible
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/apigility">
                        apigility
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/auriga">
                        auriga
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/aws">
                        aws
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/beanstalk">
                        beanstalk
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/book">
                        book
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/boot2docker">
                        boot2docker
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/centos">
                        centos
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/clang">
                        clang
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/clojure">
                        clojure
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/css">
                        css
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/database">
                        database
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/design">
                        design
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/dns">
                        dns
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/docker">
                        docker
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/enlive">
                        enlive
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/git">
                        git
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/github">
                        github
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/golang">
                        golang
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/google-app-engine">
                        google-app-engine
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/gravatar">
                        gravatar
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/hackathon">
                        hackathon
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/heroku">
                        heroku
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/hiccup">
                        hiccup
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/html">
                        html
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/hugo">
                        hugo
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/iterm">
                        iterm
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/javascript">
                        javascript
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/jekyll">
                        jekyll
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/laravel">
                        laravel
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/leiningen">
                        leiningen
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/linux">
                        linux
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/lobos">
                        lobos
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/mac">
                        mac
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/migration">
                        migration
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/node.js">
                        node.js
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/octopress">
                        octopress
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/os-x">
                        os-x
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/paiza">
                        paiza
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/paizaio">
                        paizaio
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/php">
                        php
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/postgresql">
                        postgresql
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/powerline">
                        powerline
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/python">
                        python
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/reactjs">
                        reactjs
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/ring">
                        ring
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/ruby">
                        ruby
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/sass">
                        sass
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/scss">
                        scss
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/security">
                        security
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/slack">
                        slack
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/sql-server">
                        sql-server
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/sqlite">
                        sqlite
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/startup">
                        startup
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/startup-weekend">
                        startup-weekend
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/tmux">
                        tmux
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/ubuntu">
                        ubuntu
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/util">
                        util
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/vagrant">
                        vagrant
                    </a>
                </li>
                
                <li>
                    
                    <a href="http://yet.unresolved.xyz//tags/vim">
                        vim
                    </a>
                </li>
                
            </ul>
        </div>
        
        
        <div id="profile">
            <div class="eyecatch">
                <img id="photo" src="/images/nopicture.png" alt="profile">
            </div>
            <div class="data">
                
                <span class="post-date">Sun, Feb 26, 1989</span>
                
                <h1 id="username" class="post-title"></h1>
                
                <a href="https://www.facebook.com/daisuke.tsuji.735" target="_blank"><i class="fa fa-facebook-square"></i></a>
                
                
                <a href="https://twitter.com/dim0627" target="_blank"><i class="fa fa-twitter-square"></i></a>
                
                
                <a href="https://github.com/dim0627" target="_blank"><i class="fa fa-github-square"></i></a>
                
                <pre id="description"></pre>
                <ul id="urls" class="post-tags"></ul>
            </div>
        </div>
        
    </div>
</aside>



<footer class="copy">
    <p>&copy; 2015  Daisuke Tsuji </p>
    <p>Powered by <a href="http://gohugo.io" target="_blank">Hugo</a>, Theme <a href="https://github.com/dim0627/hugo_theme_aglaus" target="_blank">Aglaus</a> designed by <a href="http://yet.unresolved.xyz" target="_blank">Daisuke Tsuji</a></p>
</footer>

<script src="//code.jquery.com/jquery-2.1.3.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.4/highlight.min.js"></script>
<script src="http://yet.unresolved.xyz//js/highlight.pack.js"></script>
<script>hljs.initHighlightingOnLoad();</script>


<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-55005303-1', 'auto');
ga('send', 'pageview');

</script>


<script>
$(function() {
    var url = "https://ja.gravatar.com/1e092e9f2cda827deb8623be2e846936.json?callback=?";
    $.getJSON(url)
        .done(function(data) {
            var entry = data.entry[0];
            $("#photo").attr("src", entry.photos[0].value);
            $("#username").html(entry.name.familyName + " " + entry.name.givenName);
            $("#description").html(entry.aboutMe);
            entry.urls.forEach(function(el){
                $("#urls").append($("<li><a href='" + el.value + "'>" + el.title + "</a></li>"));
            });
            $("#profile").show();
        });
});
</script>

