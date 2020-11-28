# Auth0導入メモ

## Applicationの登録
- コンソール画面からの[Create applications]を選択。以下の情報で作成
  - name: bola-chat  
  - application type: SPA  


## GCP側の設定
- コンソール画面からIDプラットフォームの有効化
  - 新しいIDプロパイダを追加する

- ログイン方法の設定
  - プロパイダ：SAML
  - 名前：auth0
  - エンティティID：任意っぽい
  - SS0のURL：auth0の[Advanced Settings > Endpoints:AML Protocol URL]を参照
  - 証明書：auth0の[Advanced Settings > Certificate]を参照
  - サービスプロパイダ(エンティティID)：auth0の[Client ID]を指定

- Allowed Web OriginsにURLの追加
追加しなくても良さそうだけど一応追加する
```
https://bola-chat.us.auth0.com
```

## ソースコードの修正
- SignInModuleに以下のメソッドを追加
  - 呼び出すとAuth0のログイン画面に遷移する
```typescript
  signInAuth() {
    console.log('signInWithRedirect');
    const provider = new firebase.auth.SAMLAuthProvider('saml.auth0');
    firebase.auth().signInWithRedirect(provider);
  }
```

---
ここまでで、できることauth0で登録するとfirebase側のユーザも作成されている

## ログアウト処理の実装

- Auth0のモジュールをapps配下でインストール
```
-> % npm install @auth0/auth0-spa-js
```

- ログアウト処理を任意の場所に記述
```typescript
import createAuth0Client from '@auth0/auth0-spa-js';

const auth0 = await createAuth0Client({
  domain: '<AUTH0_DOMAIN>',
  client_id: '<AUTH0_CLIENTID>',
  returnTo: 'RETURN_URL',
});
auth0.logout();
```
※returnTOに指定するURLはAuth0の管理画面に登録する必要がある  
[Application > Setting > Allowed Logout URLs]

## 参考記事
https://qiita.com/hisashiyamaguchi/items/2d0bcae052077f6ae4a4