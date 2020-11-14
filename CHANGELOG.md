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