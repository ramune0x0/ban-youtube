function isShortsPath() {
  return location.pathname.startsWith("/shorts/");
}

function redirectToBlocked() {
  location.replace(chrome.runtime.getURL("blocked.html"));
}

if (isShortsPath()) {
  redirectToBlocked();
}

let lastPath = location.pathname;
setInterval(() => {
  if (location.pathname !== lastPath) {
    lastPath = location.pathname;
    if (isShortsPath()) redirectToBlocked();
  }
}, 300);

const HIDE_CSS = `
  /* サイドバー */
  ytd-guide-entry-renderer:has(a[title="Shorts"]),
  ytd-mini-guide-entry-renderer[aria-label="Shorts"],
  a[title="Shorts"],

  /* ホーム画面の Shorts 棚 */
  ytd-rich-shelf-renderer[is-shorts],
  ytd-rich-section-renderer:has(ytd-rich-shelf-renderer[is-shorts]),

  /* 検索結果・関連動画の Shorts 棚 */
  ytd-reel-shelf-renderer,
  grid-shelf-view-model,

  /* Shorts プレイヤー要素 */
  ytd-reel-item-renderer,
  ytm-shorts-lockup-view-model,

  /* 個別の Shorts 動画カード（URL に /shorts/ を含むもの） */
  ytd-video-renderer:has(a[href*="/shorts/"]),
  ytd-compact-video-renderer:has(a[href*="/shorts/"]),
  ytd-grid-video-renderer:has(a[href*="/shorts/"]),
  ytd-rich-item-renderer:has(a[href*="/shorts/"]) {
    display: none !important;
  }
`;

const style = document.createElement("style");
style.id = "ban-youtube-hide-shorts";
style.textContent = HIDE_CSS;
(document.head || document.documentElement).appendChild(style);

const SHORTS_CHIP_LABELS = new Set(["Shorts", "ショート", "ショートムービー"]);

function hideShortsChips() {
  for (const chip of document.querySelectorAll("yt-chip-cloud-chip-renderer")) {
    const text = chip.textContent?.trim();
    if (text && SHORTS_CHIP_LABELS.has(text)) {
      chip.style.display = "none";
    }
  }
}

hideShortsChips();
new MutationObserver(hideShortsChips).observe(document.documentElement, {
  childList: true,
  subtree: true,
});
