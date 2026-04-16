# ban-shorts

YouTube Shorts をブロックする Chrome 拡張機能（Arc / Chrome 対応）。

## 機能

- `*://*.youtube.com/shorts/*` と `*://youtu.be/shorts/*` をブロック画面へリダイレクト
- SPA 内部遷移にも対応（ページ内で Shorts に飛ばされても即リダイレクト）
- ホーム・サイドバー・検索結果の Shorts 関連 UI を DOM から非表示

設計の詳細は [`docs/adr/0001-browser-extension-blocker.md`](docs/adr/0001-browser-extension-blocker.md)。

## インストール（開発者モードでローカル読み込み）

1. Arc / Chrome で `chrome://extensions` を開く
2. 右上の **デベロッパーモード** を ON
3. **パッケージ化されていない拡張機能を読み込む** をクリック
4. このリポジトリの `extension/` ディレクトリを選択

## 関連ドキュメント

- スマホで YouTube 全体をブロックしたい場合の手順（NextDNS 推奨）:
  [`docs/nextdns-setup.md`](docs/nextdns-setup.md)
