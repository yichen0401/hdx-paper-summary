const stateData = {
  six: {
    status: "基態 · 兩條軸向配位都連接",
    title: "六配位 Fe(III)",
    description: "M80 與 H18 都和血基質鐵配位，青、紅兩側皆接近原生構形；此模型無法解釋實驗觀察到的 HDX 增強。",
    level: "low",
    signal: "低"
  },
  five: {
    status: "大幅構形移動 · 幾乎沒有 HDX 訊號",
    title: "五配位 Fe(III)",
    description: "上方 M80–Fe 配位鍵出現「×」，青色遠端曲線大幅變形；但多數主鏈氫鍵仍維持，因此幾乎是 HDX-silent。",
    level: "low",
    signal: "低（近乎 HDX-silent）"
  },
  four: {
    status: "低族群構形 · HDX 可偵測",
    title: "四配位 Fe(III)",
    description: "上下兩條配位鍵都出現「×」，青色遠端與紅色近端曲線皆明顯改變，並伴隨廣泛氫鍵開啟；此模型最符合實驗。",
    level: "high",
    signal: "高（最符合實驗）"
  }
};

const tabs = document.querySelectorAll(".state-tab");
const diagram = document.getElementById("stateDiagram");
const title = document.getElementById("stateTitle");
const description = document.getElementById("stateDescription");
const status = document.getElementById("stateStatus");
const signal = document.getElementById("signalLabel");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const key = tab.dataset.state;
    const data = stateData[key];
    tabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
    });
    diagram.dataset.state = key;
    title.textContent = data.title;
    description.textContent = data.description;
    status.textContent = data.status;
    signal.textContent = data.signal;
    signal.dataset.level = data.level;
  });
});

const progressBar = document.getElementById("progressBar");
const updateProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = `${Math.min(100, Math.max(0, percent))}%`;
};

window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();
