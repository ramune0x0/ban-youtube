# ban-shorts

YouTube Shorts をブロックする Chrome 拡張機能（MV3）。

## 技術スタック

- JavaScript（素の JS、ビルド無し）
- WebExtension API: `declarativeNetRequest`, content script

## ディレクトリ構成

```
extension/   # 拡張機能本体（manifest.json, content.js, rules/, blocked.html）
docs/adr/    # 設計判断の記録
docs/        # 設定手順（NextDNS 等）
```

## 動作確認（開発者モード）

1. Arc / Chrome で `chrome://extensions`
2. デベロッパーモード ON
3. 「パッケージ化されていない拡張機能を読み込む」→ `extension/` を選択
4. コード変更後は更新アイコン（🔄）で再読み込み

## 配布方針（Phase 2 予定）

Chrome ウェブストア公開（$5 の開発者登録・生涯有効）。Safari / iPhone 対応は
コスト（$99/年）に見合わないため ADR で不採用決定済み。スマホは NextDNS で
YouTube 全体ブロックという運用を推奨（`docs/nextdns-setup.md`）。
