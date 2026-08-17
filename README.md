# NexoMC

Struktur:
- index.html       -> struktur halaman
- config.js        -> nama website, link Hub, tema awal, typing speed
- css/style.css    -> seluruh UI/style
- js/app.js        -> theme, typing effect, counter, slider, download, FAQ
- data/skins.js    -> daftar skin + link file PNG
- assets/skins/    -> tempat file PNG skin

## Direct download
Taruh file skin PNG asli di `assets/skins/`, lalu isi `data/skins.js`:
image: "assets/skins/nama.png"
download: "assets/skins/nama.png"

Karena file berada pada website yang sama, tombol download dapat langsung mengambil file PNG tanpa membuka MediaFire.

Jika memakai URL PNG dari domain lain, hasil download bergantung pada aturan browser/CORS/server hosting.
