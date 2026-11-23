const shots = {
  warehouse: ["仓库收藏页 · 界面设计稿", "仓库界面设计稿，选中桥头纪念章后显示大图与说明"],
  "story-entry": ["主线入口 · Unity 有档与无档实机对照", "两张实机局部对照，主按钮在开始序章与继续默认存档之间切换"],
  "warehouse-test": ["藏品领取测试面板 · Unity 实机", "大厅的仓库测试面板，选中旧渡口票根，可测试领取和列表更新"]
};
const picture = document.querySelector("#gallery-image");
const caption = document.querySelector("#gallery-caption");
const buttons = document.querySelectorAll("[data-shot]");
for (const button of buttons) {
  button.addEventListener("click", () => {
    const key = button.dataset.shot;
    const [label, description] = shots[key];
    picture.src = "./media/" + key + ".webp";
    picture.alt = description;
    caption.textContent = label;
    for (const option of buttons) option.setAttribute("aria-pressed", String(option === button));
  });
}

for (const link of document.querySelectorAll("a[data-video]")) {
  link.addEventListener("click", (event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const player = document.querySelector("#" + link.dataset.video + " video");
    if (!player || !player.canPlayType("video/mp4")) return;
    event.preventDefault();
    const seek = () => { player.currentTime = Number(link.dataset.time); };
    if (player.readyState >= 1) seek();
    else player.addEventListener("loadedmetadata", seek, { once: true });
    for (const other of document.querySelectorAll("video")) {
      if (other !== player) other.pause();
    }
    player.scrollIntoView({ block: "nearest" });
    player.play().catch(() => { player.focus(); });
  });
}
