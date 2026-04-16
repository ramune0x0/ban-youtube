# ban-youtube

YouTube の視聴をブロックするツール群。

## 機能

### 1. Shorts ブロッカー（ブラウザ拡張）

YouTube Shorts だけを選択的にブロックする Chrome 拡張。Arc / Chrome で動作。
詳細な設計は [`docs/adr/0001-browser-extension-blocker.md`](docs/adr/0001-browser-extension-blocker.md) 参照。

#### インストール（開発者モードでローカル読み込み）

1. Arc / Chrome で `chrome://extensions` を開く
2. 右上の **デベロッパーモード** を ON
3. **パッケージ化されていない拡張機能を読み込む** をクリック
4. このリポジトリの `extension/` ディレクトリを選択

読み込むと `*.youtube.com/shorts/*` と `youtu.be/shorts/*` がブロック画面にリダイレクトされ、
ホーム・サイドバー・検索結果の Shorts 関連 UI も非表示になる。

### 2. YouTube 全体ブロック（Mac 向け）

`/etc/hosts` を編集して YouTube ドメインをブロックする。

```bash
sudo python scripts/hosts_blocker.py on      # ブロック有効化
sudo python scripts/hosts_blocker.py off     # ブロック解除
sudo python scripts/hosts_blocker.py status  # 状態確認
```

### 3. スマホ向け全体ブロック（将来）

[NextDNS](https://nextdns.io/) で DNS レベルに `youtube.com` を登録する想定。
スマホの Shorts だけブロックは技術的に不可能なため、「YouTube アプリを削除 + iPhone Safari
で拡張」を Phase 2 で対応予定。

## セットアップ（Python 側）

```bash
# Python 3.12+
uv sync
```
