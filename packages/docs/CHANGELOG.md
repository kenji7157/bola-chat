## 作業記録
node12で構築

### プロジェクトの作成
```
-> % vue create bola-chat
? Please pick a preset: Manually select features
? Check the features needed for your project: Choose Vue version, TS, Router, Vuex
? Choose a version of Vue.js that you want to start the project with 2.x
? Use class-style component syntax? Yes
? Use Babel alongside TypeScript (required for modern mode, auto-detected polyfills, transpiling JSX)? No
? Use history mode for router? (Requires proper server setup for index fallbackin production) Yes
? Where do you prefer placing config for Babel, ESLint, etc.? In dedicated config files
? Save this as a preset for future projects? No
```

### ビルドの設定
- --modeオプション
```
-> $ vue-cli-service build --mode dev
```
--mode：読み込む環境設定ファイルを指定する  
> 例 --mode dev： .end.devを環境設定ファイルとして読み込む

- vue.coonfig.jsファイルの作成  
vue-cli-service... vue-cli-serviceがビルド時に読むこむ設定ファイル

> 公式ドキュメント：https://cli.vuejs.org/config/#global-cli-config

### 単体テストの追加
- 
```
-> $ npm install --save-dev @vue/cli-plugin-unit-jest
```
公式ドキュメント：https://cli.vuejs.org/core-plugins/unit-jest.html#injected-commands

Jestで単体テストを実行することができる

### vuetifyの導入
- vuetifyの追加  
```
-> % vue add vuetify
 WARN  There are uncommitted changes in the current repository, it's recommended to commit or stash them first.
? Still proceed? Yes

📦  Installing vue-cli-plugin-vuetify...

+ vue-cli-plugin-vuetify@2.0.7
added 7 packages from 9 contributors, removed 1 package and audited 1481 packages in 11.54s

58 packages are looking for funding
  run `npm fund` for details

found 1 low severity vulnerability
  run `npm audit fix` to fix them, or `npm audit` for details
✔  Successfully installed plugin: vue-cli-plugin-vuetify

? Choose a preset: Default (recommended)

🚀  Invoking generator for vue-cli-plugin-vuetify...
📦  Installing additional dependencies...

added 6 packages from 5 contributors and audited 1487 packages in 12.186s

60 packages are looking for funding
  run `npm fund` for details

found 1 low severity vulnerability
  run `npm audit fix` to fix them, or `npm audit` for details
⚓  Running completion hooks...

✔  Successfully invoked generator for plugin: vue-cli-plugin-vuetify
 vuetify  Discord community: https://community.vuetifyjs.com
 vuetify  Github: https://github.com/vuetifyjs/vuetify
 vuetify  Support Vuetify: https://github.com/sponsors/johnleider
```

- plugins/vuetify.tsの作成  
以下エラーが発生するので、tsconfgi.jsonでコンパイルオプションを追加する
> Could not find a declaration file for module 'vuetify/lib/directives'. 


- tsconfig.jsonの修正  
vuetifyをtypes配列に追加する
```json
"types": [
      "webpack-env",
      "vuetify"
    ],
```


### huskyの追加
```
-> $ npm install --save-dev husky
```

- .huskyrc.jsの作成
  - masterブランチのコミット/プッシュを禁止

### ESlint/Prettierの追加
- ESLint関連のモジュール
```
-> $ npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-vue
```

- Prettier関連のモジュール
```
-> $ npm install --save-dev prettier eslint-plugin-prettier eslint-config-prettier
```

- .huskyrc.jsの修正  
  - 整形してからコミットするように修正

- .editorconfigファイルの追加
  - 異なるエディタ/IDE間のコーディングスタイルを定義

- .eslintignoreファイルの追加
  - eslint対象外の指定

### lernaの導入
- lernaのインストール
```
-> $ npm install --save-dev lerna
```

- packagesフォルダの生成
```
-> $ npx lerna init
```

- appsサブフォルダの作成
```
-> $ npx lerna create apps
```

appsにvueアプリを移植

### Firabaseの設定
- Hostingのデプロイ作業(dev)
```
-> % firebase init

     ######## #### ########  ######## ########     ###     ######  ########
     ##        ##  ##     ## ##       ##     ##  ##   ##  ##       ##
     ######    ##  ########  ######   ########  #########  ######  ######
     ##        ##  ##    ##  ##       ##     ## ##     ##       ## ##
     ##       #### ##     ## ######## ########  ##     ##  ######  ########

You're about to initialize a Firebase project in this directory:

  /Users/kawanohenkenji/work/study/bola-chat

? Which Firebase CLI features do you want to set up for this folder? Press Space to select features, then Enter to confirm your 
choices. Hosting: Configure and deploy Firebase Hosting sites

=== Project Setup

First, let's associate this project directory with a Firebase project.
You can create multiple project aliases by running firebase use --add, 
but for now we'll just set up a default project.

? Please select an option: Use an existing project
? Select a default Firebase project for this directory: bola-chat-dev (bola-chat-dev)
i  Using project bola-chat-dev (bola-chat-dev)

=== Hosting Setup

Your public directory is the folder (relative to your project directory) that
will contain Hosting assets to be uploaded with firebase deploy. If you
have a build process for your assets, use your build's output directory.

? What do you want to use as your public directory? dist
? Configure as a single-page app (rewrite all urls to /index.html)? Yes
✔  Wrote dist/index.html

i  Writing configuration info to firebase.json...
i  Writing project information to .firebaserc...

✔  Firebase initialization complete!
```

.firabaserc  
firabase.json  
が作成されるので、モノレポ用に修正
https://github.com/kenji7157/bola-chat/commit/b97589c902b910106c41adc4c3603a0fd4cddb72

### firebaseモジュールの導入
- インストール
apps配下で以下を実行
```
-> % npm install firebase --save
```

エラー対応がリリースされていないため”7.24.0"を利用
https://github.com/firebase/firebase-js-sdk/pull/4080/files

- apps/src/firehase/firebase.tsの作成  
firabaseの設定は環境変数ファイルから参照するため、合わせて環境変数ファイルも修正

- vuexfireのインストール
firebaseのリモートデータベースとローカルの状況を容易に連携させるためのツール
```
npm install vuexfire
```

- vuex-smart-moduleのインストール
classを使った自然な書き方でVuex storeの型定義を実装できる
```
npm install vuex-smart-module
```

### eslintの修正
以下の設定を.eslintrc.jsに反映
- 返戻値の型定義の設定は任意にしたい  
@typescript-eslint/explicit-module-boundary-types': 'off'

- 型定義に{}を指定できるようにしたい  
@typescript-eslint/ban-types': 'off'  

### Firestore Functions の導入
メモなし

### testsパッケージの作成
$ npx lerna create apps

testsパッケージでfirestoreのセキュリティルールを実行したい

(準備)Hostingにデプロイする際のrulesを開発リポジトリで管理する
- パッケージ直下にfirestore.rulesを作成
- firebase.jsonデプロイ対象にrulesを含めるよう修正

###　単体テスト実行環境の構築
参考記事：
https://typescript-jp.gitbook.io/deep-dive/intro-1/jest　　

- jestモジュールのインストール
```
npm i jest @types/jest ts-jest -D
```

- jest設定ファイル(jest.config.js)の生成
```js
module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
```

- 動作確認用のテストファイルを生成
test.ts/test.spec.tsファイルを用意

- 動作確認
```
npm run test
```

- push時にテストが実行されるように修正
```
"pre-push": "npm run test"
```

### CircleCIの導入
CI(Continuous Integration) 継続的インテグレーション
CD(Continuous Delivery) 継続的デリバリー

参考記事：https://www.isoroot.jp/blog/1919/　　

- githubアカウントでCircleCIにアクセス
kenji7157

- ci/cdを開始したいプロジェクト(bola-chat)をsetupする
  - 使用する言語はnode.jsを扱う
  - start buildを実行
    - 失敗する(設定ファイルの登録をしていないため)
  - config.ymlをプロジェクトに追加
    - nodeバージョンはv12.20.0に合わせる

```
version: 2.1
jobs:
  build:
    # 使用するDockerイメージ
    docker:
      - image: circleci/node:12.20.0
    working_directory: ~/bola-chat
    # 処理内容
    steps:
      - checkout
      - run:
          name: Setting npm
          command: npm run npm-ci
      - run:
          name: Run test
          command: npm run test

```

参考記事:https://qiita.com/kurodenwa/items/d4a05a0091ca2ab69911

test

