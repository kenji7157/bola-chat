// For authoring Nightwatch tests, see
// https://nightwatchjs.org/guide

module.exports = {
  'comment e2e tests': (browser) => {
    const time = Date.now();
    browser
      .init()
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('#comment-area')
      .assert.elementPresent('.comment-btn')
      // テキストエリアに値を入力
      .setValue('#comment-area', 'こんにちは' + time)
      // 送信ボタンのクリック
      .click('.comment-btn')
      // 送信処理の待機
      .pause(1000)
      // 先頭に入力した値がくることを確認
      .assert.containsText('#comment-text', 'こんにちは' + time)
      .end();
  },
};
