window.NEXOMC_SKINS = [
  {
    id: "alex29",
    name: "Alex29",
    category: "Minecraft Skin",
    image: "https://files.catbox.moe/pdm86w.jpg",
    download: "https://www.mediafire.com/file/xfyf4iptud110zd/alex29.png/file"
  }
];

// Backwards-compatible variable for simple static hosting.
const skins = window.NEXOMC_SKINS;
if (typeof module !== "undefined") module.exports = skins;
