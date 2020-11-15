## 作業記録

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

- apps/src/firehase/firebase.tsの作成  
firabaseの設定は環境変数ファイルから参照するため、合わせて環境変数ファイルも修正