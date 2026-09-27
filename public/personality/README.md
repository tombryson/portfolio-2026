# Portfolio personality assets

Prepared 30 August 2026 with the built-in `image_gen.imagegen` tool in background-extraction mode. The final generated files were copied unchanged into this directory; no CLI/API fallback or image-library editing was used. Original screenshots remain untouched. Only the two unwatermarked August screenshots were used.

## Crocodile

- Input: `Screenshot 2026-08-30 at 2.54.58 pm.png`
- Output: `crocodile.png`, 1254 × 1254, RGBA with real alpha (range 0–255).
- Visible subject bounds (alpha > 24): x 27–1194, y 463–784. The square transparent canvas can be framed by CSS.
- Two earlier wide-format attempts rendered a checkerboard background and were rejected; the square extraction below is the selected asset.
- Generated source: `exec-d4f574b9-4e84-47e2-be20-a2eb206925fb.png`

Final prompt:

```text
Extract this crocodile onto a transparent background. Return a transparent RGBA PNG web sticker, 1024 by 1024 pixels. There should be only the original pixel-art crocodile and transparency. Center the crocodile across the square canvas, nearly filling its width, with transparent empty space above and below. Preserve the original crocodile exactly: green pixel-art, black block outline, cream teeth, open mouth facing left, long low body. Do not add any scenery, checkerboard, grid, ground, colored background, glow, or shadow. All pixels outside the crocodile must have zero opacity.
```

## Lightning

- Input: `Screenshot 2026-08-30 at 2.56.27 pm.png`
- Output: `lightning.png`, 1024 × 1536, RGBA with real alpha (range 0–254).
- Visible subject bounds (alpha > 24): x 161–950, y 7–1521.
- Generated source: `exec-655686a2-867a-4a8c-9d7a-1e7b04fed175.png`

Final prompt:

```text
Use case: background-extraction
Asset type: transparent PNG lightning bolt icon beside a portfolio hero name.
Input image: edit target, the supplied yellow lightning bolt with a dark thick border on an off-white/light-gray background.
Primary request: Remove only the off-white/light-gray background to actual transparent alpha. Keep the entire existing yellow lightning-bolt object unchanged. Output transparent PNG; no checkerboard illustration and no solid backdrop.
Constraints: Preserve the exact yellow center, dark near-black thick outline with subtle brown highlight at the top, shape and long pointed lower tip, proportions, existing slight enamel/sticker texture, and original orientation. Do not redraw or restyle the bolt; do not add shadows, text, or other objects. Tight crop around the whole subject with only about 2% transparent padding on every side.
```

These are generated background extractions; preserve the source artwork's applicable usage rights. No watermarked screenshot was used.

## Work-menu crocodile frames

- Inputs: `Screenshot 2026-09-01 at 2.45.12 pm.png` and `Screenshot 2026-09-01 at 2.45.20 pm.png`.
- Outputs: `crocodile-work-closed.png` and `crocodile-work-open.png`, each 758 × 359.
- The connected pale background and its isolated under-neck pocket were flood-filled to transparent alpha, preserving enclosed artwork details such as the eye and teeth.
- Both frames use the same padded source crop and output dimensions so the crocodile's body remains registered while its mouth changes without touching the canvas edge.
