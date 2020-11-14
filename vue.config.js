module.exports = {
  "productionSourceMap": false,
  "pages": {
    "index": "src/main.ts"
  },
  "outputDir": "dist",
  "devServer": {
    "port": 8089
  },
  "transpileDependencies": [
    "vuetify"
  ]
}