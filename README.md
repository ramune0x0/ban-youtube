# ban-youtube

YouTube Shorts をブロックする Chrome 拡張機能と、Mac 用の hosts ブロッカー。

## 1. Shorts ブロック Chrome 拡張

Arc / Chrome で動作する Shorts 専用ブロッカー。

- `*://*.youtube.com/shorts/*` と `*://youtu.be/shorts/*` をブロック画面へリダイレクト
- SPA 内部遷移にも対応（ページ内で Shorts に飛ばされても即リダイレクト）
- ホーム・サイドバー・検索結果の Shorts 関連 UI を DOM から非表示

設計の詳細は [`docs/adr/0001-browser-extension-blocker.md`](docs/adr/0001-browser-extension-blocker.md) を参照。

### インストール（開発者モードでローカル読み込み）

1. Arc / Chrome で `chrome://extensions` を開く
2. 右上の **デベロッパーモード** を ON
3. **パッケージ化されていない拡張機能を読み込む** をクリック
4. このリポジトリの `extension/` ディレクトリを選択

## 2. hosts ブロッカー（Mac 向け補助）

`/etc/hosts` を編集して自分の Mac だけ YouTube 全体を一時遮断する軽量スクリプト。
拡張とは独立。Python 3.10+ の標準ライブラリのみで動作（追加依存なし）。

```bash
sudo python scripts/hosts_blocker.py on      # ブロック有効化
sudo python scripts/hosts_blocker.py off     # ブロック解除
sudo python scripts/hosts_blocker.py status  # 状態確認
```

## 関連ドキュメント

- スマホで YouTube 全体をブロックしたい場合の手順（NextDNS 推奨）:
  [`docs/nextdns-setup.md`](docs/nextdns-setup.md)
