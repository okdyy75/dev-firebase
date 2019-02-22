# dev_firebase
Firebase開発・検証プロジェクト

# 環境
- Node.js　v10.15.0
- Vue.js　　2.9.6
- Firebase　6.3.1

# 環境構築

事前にPCにインストールされていれば「Vueプロジェクトを作成」までスキップ

## windowsにNode.jsをインストール
推奨版をインストール  
https://nodejs.org/ja/


Node.jsのバージョン確認
https://qiita.com/strsk/items/925644e124efcc964625

```bash
> node -v
v10.15.0
```

## npmにVue.jsインストール

```
> npm install -g vue-cli

> vue -V
2.9.6
```

# Vueプロジェクトを作成
Enter5回、No3回、npmを選択してEnter
```bash
> vue init webpack memomemo

? Project name memomemo
? Project description A Vue.js project
? Author okdyy75 <okdyy75@gmail.com>
? Vue build standalone
? Install vue-router? Yes
? Use ESLint to lint your code? No
? Set up unit tests No
? Setup e2e tests with Nightwatch? No
? Should we run `npm install` for you after the project has been created? (recommended) npm
```

「 To get started」で以下のコマンドを実行
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
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


# Firebaseプロジェクトを作成

Firebaseコンソールからプロジェクトを作成  
https://console.firebase.google.com/


Firebase ツールをインストール
```bash
> npm install -g firebase-tools
```

Google にログインする
```bash
> firebase login
```

Firebaseプロジェクト作成
```bash
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

- Hostingの公開ディレクトリ(public)にするか聞かれているので、「dist」にしてEnter
- SPA（シングルページアプリケーション）として設定（すべてのURLを/index.htmlにアクセス）するか
聞かれているので、そのままEnter
- index.htmlを上書きするか聞かれているので「No」でEnter
```bash
? What do you want to use as your public directory? dist
? Configure as a single-page app (rewrite all urls to /index.html)? Yes
? File dist/index.html already exists. Overwrite? No
```

Firebaseの初期化が完了
```bash
+  Firebase initialization complete!
```

ここでgitにコミット

## 作成したFirebaseプロジェクトを公開

各種設定後、Firebaseプロジェクトを一度デプロイ  
正常に公開されているかHosting URLにアクセス
```
> npm run build
> firebase deploy
```

正常にデプロイ出来ていたらOK

# プロジェクトの設定


```
# Vue Routerのインストール
> npm install vue-router--save

# firebaseのインストール
$ npm install firebase --save

# firebase-uiのインストール
# [FirebaseUI公式リファレンス](https://github.com/firebase/firebaseui-web)
> npm install firebaseui --save

# firebase-ui日本語化のインストール
> npm install firebaseui-ja --save

var firebase = require("firebase");
var firebaseui = require("firebaseui-ja");
require("firebaseui-ja/dist/firebaseui.css");

# Vuetifyのインストール
npm install vuetify --save

# 日付処理ライブラリのインストール
npm install moment -save

# マテリアルデザインアイコンのインストール
# https://github.com/jossef/material-design-icons-iconfont
npm install material-design-icons-iconfont --save

# axios
npm install axios --save


コンソールからRealtime Database作成
npm run build
npm run build build-js-ja
npm run build build-npm-ja

build-js-ja build-npm-ja

テストモードで開始

? Are you ready to proceed? Yes
? Which Firebase CLI features do you want to setup for this folder? Press Space to select features, then Enter to confi
rm your choices. Database: Deploy Firebase Realtime Database Rules

=== Project Setup

First, let's associate this project directory with a Firebase project.
You can create multiple project aliases by running firebase use --add,
but for now we'll just set up a default project.

i  .firebaserc already has a default project, skipping

=== Database Setup

Firebase Realtime Database Rules allow you to define how your data should be
structured and when your data can be read from and written to.

? What file should be used for Database Rules? database.rules.json
+  Database Rules for  have been downloaded to database.rules.json.
Future modifications to database.rules.json will update Database Rules when you run
firebase deploy.

i  Writing configuration info to firebase.json...
i  Writing project information to .firebaserc...

+  Firebase initialization complete!

