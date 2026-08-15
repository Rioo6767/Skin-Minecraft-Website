# NexoMC

NexoMC Minecraft Skin website.

## Skin setup

Preview image:
- Put the Catbox direct image URL in `data/skins.js` under `image`.

Download:
- Put the MediaFire file URL in `download`.
- Current Alex29 download:
  https://www.mediafire.com/file/xfyf4iptud110zd/alex29.png/file

Local skin PNG files are not required.

## Add another skin

Add another object to the `skins` array:

```js
{
  id: "skin2",
  name: "Nama Skin",
  category: "Minecraft Skin",
  image: "https://files.catbox.moe/xxxxx.png",
  download: "https://www.mediafire.com/file/xxxxx/skin.png/file"
}
```
