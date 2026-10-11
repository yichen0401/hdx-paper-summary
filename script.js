const stateData = {
  six: {
    status: "GROUND STATE",
    title: "六配位 Fe(III)",
    description: "結構接近原生狀態，M80 與 H18 都與血基質鐵配位。模擬中的氫鍵圖譜無法解釋實驗觀察到的 HDX 增強。",
    meter: "18%",
    signal: "低"
  },
  five: {
    status: "MAJOR MOTION · ALMOST HDX-SILENT",
    title: "五配位 Fe(III)",
    description: "M80–Fe 斷裂，遠端 Ω loop 大幅翻開並暴露血基質；但多數主鏈氫鍵仍維持，因此 HDX 訊號只出現很小變化。",
    meter: "27%",
    signal: "低"
  },
  four: {
    status: "RARE · HDX-DETECTABLE",
    title: "四配位 Fe(III)",
    description: "M80 與 H18 配位都斷裂，近端與遠端出現廣泛氫鍵開啟。雖然是低族群構形，卻最能解釋實驗的 HDX 增強。",
    meter: "88%",
    signal: "高"
  }
};

const tabs = document.querySelectorAll(".state-tab");
const diagram = document.getElementById("stateDiagram");
const title = document.getElementById("stateTitle");
const description = document.getElementById("stateDescription");
const status = document.getElementById("stateStatus");
const meter = document.getElementById("signalMeter");
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
    meter.style.width = data.meter;
    signal.textContent = data.signal;
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
