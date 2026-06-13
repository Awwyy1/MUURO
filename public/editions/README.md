# Edition photography

This is where every edition's product photography lives. The site
scans these folders at build time and shows whatever it finds, so
**you do not need to touch the code** to add or replace images. Drop
files in, commit, and the site updates itself.

## File convention

Each edition has its own folder named after its slug. Drop JPGs in,
named `01.jpg` to `05.jpg`:

```
public/editions/
  the-outlier/
    01.jpg
    02.jpg
    03.jpg
    04.jpg
    05.jpg
  63-sting-ray/
    01.jpg
    ...
```

The first image (`01.jpg`) becomes the cover on the catalogue grid.
All images are displayed in order on the product page as a swipeable
gallery: customers swipe or click arrows to flip through them. You
decide what each photo shows (room scene, paper detail, frame corner,
backlit at night, person handling the frame). The site does not label
them.

## How to add real photography (no code edits)

1. Open the folder for the edition on GitHub, e.g.
   `public/editions/the-outlier/`.
2. Click **Add file → Upload files**.
3. Drag in your photos. **File names must be** `01.jpg`, `02.jpg`,
   `03.jpg`, `04.jpg`, `05.jpg`. Lower-case, no spaces.
4. Commit the upload directly to `main`.
5. Vercel rebuilds in 1 to 2 minutes. The new photography appears
   on `muuro.co` automatically.

You can upload fewer than five files. If only `01.jpg` and `02.jpg`
exist, the gallery shows two slides instead of five.

`.png` and `.webp` work too; the matcher accepts `01.jpg`, `01.jpeg`,
`01.png`, `01.webp`.

## Format guidance

- **Aspect ratio**: 4:5 portrait works best. Matches framed posters
  and keeps the layout consistent across editions.
- **Resolution**: at least 1600 px on the long side. 2400 px is ideal.
- **File size**: aim for under 600 KB per image. Use
  [Squoosh](https://squoosh.app) or `mozjpeg` to compress.
- **Naming**: keep `01.jpg`, `02.jpg`, ... order. Lower-case.

## Replacing or removing an image

To replace `02.jpg`, just upload a new file with the same name; the
old one is overwritten. To remove a slide entirely, delete the file
in GitHub. The gallery rebuilds with whatever files remain.

## Editions

- [the-outlier](./the-outlier/)
- [63-sting-ray](./63-sting-ray/)
- [red-waves](./red-waves/)
- [hast-du-gekackt](./hast-du-gekackt/)
- [untitled-05](./untitled-05/)
- [untitled-06](./untitled-06/)
