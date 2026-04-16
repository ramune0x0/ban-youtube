# ADR-0001: YouTube Shorts ブロッカーはブラウザ拡張で実装する

- ステータス: 採用
- 日付: 2026-04-16

## 背景

YouTube Shorts を見てしまうのを止めたい。YouTube 全体ではなく Shorts だけを
選択的にブロックしたい。スマホ（iPhone Safari）も対象にしたい。

## 検討した選択肢

### 1. DNS / `/etc/hosts` / NextDNS でのブロック
- DNS クエリはホスト名（`www.youtube.com`）しか含まない
- URL パス（`/shorts/...`）はアプリケーション層（HTTP）の情報で DNS からは不可視
- Shorts は `www.youtube.com/shorts/*` で通常動画とホストが同じため、DNS では区別不能
- **結論: Shorts 単体ブロックは DNS では原理的に不可能**
- ただし「YouTube 全体ブロック」なら DNS（NextDNS 等）が最適（端末横断・アプリ内にも効く）

### 2. HTTPS 復号プロキシ（mitmproxy 等）
- 端末に自前 CA を仕込んで HTTPS を復号すればパスで判別可能
- スマホ含めた端末側の設定が重く、現実的ではない

### 3. ブラウザ拡張（採用）
- `declarativeNetRequest` で URL パス単位のブロックが宣言的に書ける
- content script で DOM を操作して Shorts 棚・タブ等の UI 要素を消せる
- Chrome/Arc は Chromium ベースなので同一拡張で動く
- iPhone Safari も WebExtension 規格をサポートするため、Xcode でラップすればほぼ同じコードが動く

## 決定

**ブラウザ拡張（WebExtension 規格）で実装する。**

スマホで見てしまうのは YouTube アプリを削除済み前提でブラウザ（iPhone Safari）
からのアクセスを想定。アプリ内の Shorts は技術的に遮断不可能なため対象外。

## フェーズ

段階的に進める。

### Phase 1: Chrome 拡張（Shorts 専用）
- Arc / Chrome（Mac）で動作
- Shorts URL へのアクセスをブロック画面へリダイレクト
- Shorts 関連 UI 要素（サイドバー・ホームの棚・検索結果）を DOM で非表示
- 開発者モードでローカル読み込み（ウェブストア公開は必要になったら）

### Phase 2: Safari 拡張化
- Phase 1 の WebExtension コードを流用
- Xcode で Safari Web Extension プロジェクトにラップ
- iPhone に sideload（無料の Apple ID で7日間、年$99で永続）

### Phase 3（将来）: YouTube 全体ブロック
- Shorts 専用で足りなければ追加
- 実装は**拡張内ではなく NextDNS** で `youtube.com` を denylist に追加する方式にする
- スマホ・PC 問わず、ブラウザ・アプリ含めて全端末で遮断できる
- 拡張側に full モードは持たせない（DNS の方が確実で漏れがない）

## 設計（Phase 1）

### スコープ
- 対象 URL: `*://*.youtube.com/shorts/*`, `*://youtu.be/shorts/*`
- 対象 resource: `main_frame` のみ（他サイトへの埋め込み iframe は対象外）

### ブロック方式
- `declarativeNetRequest` の redirect で `extension/blocked.html` へ遷移
- 真っ白ページより「ブロック中」と明示された方が意図を思い出せる

### UI 要素の非表示
URL ブロックだけでは「Shorts」タブやホームの Shorts 棚が空枠で残るため、
content script で CSS を注入して DOM から隠す。

### 設定 UI
**持たない**。常時 Shorts ブロック。トグルを付けると抜け道になりセルフコントロールを弱める。
オフにしたい時は拡張自体を無効化する。

## 構成

```
extension/
├── manifest.json       # MV3
├── content.js          # Shorts 関連 DOM を CSS 注入で非表示
├── blocked.html        # リダイレクト先
└── rules/
    └── shorts.json     # /shorts/* を redirect
```

background service worker は不要（ruleset が常時有効なので動的切替なし）。
