# 概要
firebaseuiとVue.jsを使ったログイン処理  
一度ログインしたらログインフォームは非表示にする。  （匿名ログインは除く）  
匿名ログインは「ゲスト」として表示する。  
匿名ログイン後、SNSアカウントでログインしたら統合させる。  

## 環境
- Windows10
- Node.js　v10.15.0
- Vue.js　2.9.6
- Firebase　6.4.0

## 環境構築

事前にPCにインストールされていれば「Vueプロジェクトを作成」までスキップ

### windowsにNode.jsをインストール

推奨版をインストール
https://nodejs.org/ja/


Node.jsのバージョン確認
https://qiita.com/strsk/items/925644e124efcc964625

```bash
> node -v
v10.15.0
```

### npmにVue.jsインストール

```bash

> npm install -g vue-cli

> vue -V
2.9.6
```

## Vueプロジェクトを作成
Enter5回、No3回、npmを選択してEnter

```bash
> vue init webpack memomemo

? Project name memomemo
? Project description A Vue.js project
? Author okdyy75 <xxxxx75@gmail.com>
? Vue build standalone
? Install vue-router? Yes
? Use ESLint to lint your code? No
? Set up unit tests No
? Setup e2e tests with Nightwatch? No
? Should we run `npm install` for you after the project has been created? (recommended) npm
```

「 To get started」の以下コマンドを実行

```bash
To get started:

  cd memomemo
  npm run dev
```

vue init 時に作成されたREADME

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
```

## Firebaseプロジェクトを作成

Firebaseコンソールからプロジェクトを作成
https://console.firebase.google.com/


Firebase ツールをインストール

```bash
> npm install -g firebase-tools
```

firebase にログインして、Firebaseプロジェクト作成

```bash
> firebase login
...

> firebase init
```

どのFirebase CLI機能を使うかSpaceキーを押して選択  
Hostingを選択してEnter

```bash
? Which Firebase CLI features do you want to setup for this folder? Press Space to select features, then Enter to confi
rm your choices.
 ( ) Database: Deploy Firebase Realtime Database Rules
 ( ) Firestore: Deploy rules and create indexes for Firestore
 ( ) Functions: Configure and deploy Cloud Functions
>(*) Hosting: Configure and deploy Firebase Hosting sites
 ( ) Storage: Deploy Cloud Storage security rules
```

コンソールから作成したプロジェクトを選択

```bash
? Select a default Firebase project for this directory:
  [don't setup a default project]
> fir-84a0c (dev-firebase)
  [create a new project]
```

1. Hostingの公開ディレクトリ(public)にするか聞かれているので、「dist」にしてEnter

1. SPA（シングルページアプリケーション）として設定（すべてのURLを/index.htmlにアクセス）するか
聞かれているので、「dist」にしてEnter

```bash
? What do you want to use as your public directory? dist
? Configure as a single-page app (rewrite all urls to /index.html)? Yes
```

Firebaseの初期化が完了

```bash
+  Firebase initialization complete!
```

firebaseがローカルで動くか確認

```
> firebase serve

i  hosting: Serving hosting files from: dist
+  hosting: Local server: http://localhost:5000
```

firebase初期画面が表示されたらOK

## プロジェクトの設定

```bash
# firebaseのインストール
> npm install firebase --save

# firebase-uiのインストール
# [FirebaseUI公式リファレンス](https://github.com/firebase/firebaseui-web)
> npm install firebaseui --save

# firebase-ui日本語のインストール
> npm install firebaseui-ja --save
```

使用したい場所で下記のように読み込む

```js
var firebase = require("firebase");
var firebaseui = require("firebaseui-ja");
require("firebaseui-ja/dist/firebaseui.css");
```

## ログイン方法を有効にする
firebaseコンソールの「Authentication」の「ログイン方法」
から使用したいSNSを有効にしておく

各SNSデベロッパーサイト

- Facebook
 - https://developers.facebook.com/
- twitter
 - https://developer.twitter.com/en/apps
- GitHub
 - https://github.com/settings/developers

## ローカル動作確認
1. 「config/dev.env.js」に環境変数を設定する
2. `npm run dev`

## 本番デプロイ
1. 「config/prod.env.js」に環境変数を設定する
2. `npm run build`
3. `firebase deploy`

## 以下ソース

```html:index.html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>FirebaseUI + vueでログイン</title>
  </head>
  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```

```js:/src/main.js

import Vue from "vue";
import App from "@/App.vue";
import router from "@/router/index";

Vue.config.productionTip = false

import firebase from 'firebase/app';
firebase.initializeApp(process.env.FIREBASE_CONFIG);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


```

```js:src/route/index.js
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})

```


```vuejs:src/components/Home.vue
<template>
  <div class="app">
    <h2>ログインフォーム</h2>
    <Login v-if="!isLogin || loginUser.displayName == 'ゲスト'"></Login>

    <h2>ログアウトフォーム</h2>
    <Logout v-if="isLogin" :loginUser="loginUser"></Logout>

    <div v-if="isLogin">
      <div>{{loginUser.displayName}} さん</div>
      <div>
        <img :src="loginUser.photoURL">
      </div>
      <div></div>
    </div>
  </div>
</template>


<script>
var firebase = require("firebase");
import Login from "@/components/Login.vue";
import Logout from "@/components/Logout.vue";

export default {
  name: "Index",
  components: {
    Login: Login,
    Logout: Logout
  },
  data() {
    return {
      isLogin: false,
      loginUser: null
    };
  },
  beforeRouteEnter(route, redirect, next) {
    console.log("Home_beforeRouteEnter");
    firebase.auth().onAuthStateChanged(user => {
      console.log("onAuthStateChanged", user);
      next(vm => {
        var user = firebase.auth().currentUser;

        if (!user) {
          return;
        }

        vm.isLogin = true;
        vm.loginUser = user;
      });
    });
  },
  beforeRouteUpdate(to, from, next) {
    console.log("Home_beforeRouteUpdate");
    vm.isLogin = false;
    vm.loginUser = null;
    firebase.auth().onAuthStateChanged(user => {
      console.log("onAuthStateChanged", user);
      if (!user) {
        next();
        return;
      }
      vm.isLogin = true;
      vm.loginUser = user;
      next();
    });
  }
};
</script>
```

```vuejs:src/components/Login.vue
<template>
  <div>
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
var firebase = require("firebase");
var firebaseui = require("firebaseui-ja");
require("firebaseui-ja/dist/firebaseui.css");

export default {
  name: "Login",
  mounted() {
    console.log("Login_mounted");
    var vm = this;
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", {
      callbacks: {
        uiShown: function() {
          console.log("uiShown");
        },
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          console.log("signInSuccessWithAuthResult", authResult, redirectUrl);

          var isNewUser = authResult.additionalUserInfo.isNewUser;
          var displayName = authResult.user.displayName;
          var photoURL = authResult.user.photoURL;

          // SNSログイン＆で登録済みであればスキップ
          if (displayName != "ゲスト" && !isNewUser) {
            return true;
          }

          switch (authResult.additionalUserInfo.providerId) {
            case firebase.auth.GoogleAuthProvider.PROVIDER_ID:
              displayName = authResult.additionalUserInfo.profile.name;
              photoURL = authResult.additionalUserInfo.profile.picture;
              break;
            case firebase.auth.FacebookAuthProvider.PROVIDER_ID:
              displayName = authResult.additionalUserInfo.profile.name;
              photoURL = authResult.additionalUserInfo.profile.picture.data.url;
              break;
            case firebase.auth.TwitterAuthProvider.PROVIDER_ID:
              displayName = authResult.additionalUserInfo.profile.name;
              photoURL =
                authResult.additionalUserInfo.profile.profile_image_url;
              break;
            case firebase.auth.GithubAuthProvider.PROVIDER_ID:
              displayName = authResult.additionalUserInfo.profile.name;
              photoURL = authResult.additionalUserInfo.profile.avatar_url;
              break;
            default:
              displayName = "ゲスト";
              photoURL = "";
              break;
          }

          var user = {
            displayName: displayName,
            photoURL: photoURL
          };

          firebase
            .auth()
            .currentUser.updateProfile(user)
            .then(res => {
              console.log("Auth登録完了", res);
              alert("ログインしました。");
              vm.$router.go();
            });
        },
        signInFailure: function(error) {
          console.log("signInFailure", error);
          alert(error.message);
          vm.$router.go();
        }
      },
      autoUpgradeAnonymousUsers: true,
      signInFlow: "redirect",
      signInSuccessUrl: "/",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
      ]
    });
  }
};
</script>
```

```vuejs:src/components/Logout.vue
<template>
  <div>
    <button @click="accountDelete()">アカウント削除</button>
    <button @click="logout()">ログアウト</button>
  </div>
</template>

<script>
var firebase = require("firebase");

export default {
  name: "Logout",
  props: ["isLogin", "loginUser"],
  methods: {
    // ログアウト
    logout() {
      var vm = this;
      if (!firebase.auth().currentUser) {
        alert("ログインしてください。");
        return;
      }
      firebase
        .auth()
        .signOut()
        .then(function(res) {
          console.log("signOut", res);
          alert("ログアウトしました。");
          vm.$router.go();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    accountDelete() {
      var vm = this;
      // アカウント削除
      if (!firebase.auth().currentUser) {
        alert("ログインしてください。");
        return;
      }
      firebase
        .auth()
        .currentUser.delete()
        .then(function(res) {
          console.log("currentUser.delete", res);
          alert("アカウントを削除しました。");
          vm.$router.go();
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
```

Gitのブランチに上げました
https://github.com/okdyy75/dev-firebase/tree/dev-firebaseui-login
