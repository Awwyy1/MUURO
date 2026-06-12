# Edition photography

This is where every edition's product photography lives. The site reads
images from these folders and shows them in the catalogue and on the
swipeable product gallery.

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

The first image (`01.jpg`) is the cover shown on the catalogue grid.
All images are displayed in order on the product page as a swipeable
gallery: customers swipe or click arrows to flip through them. You
decide what each photo shows (room scene, paper detail, frame corner,
backlit at night, person handling the frame). The site does not label
them.

## How to add real photography

1. Open the folder for the edition you want to update, e.g.
   `public/editions/the-outlier/`.
2. Drop your 5 photos in, named `01.jpg` through `05.jpg`.
3. Open `lib/editions.ts` and find the matching edition entry.
4. Replace its `images: []` line with:

   ```ts
   images: [
     "/editions/the-outlier/01.jpg",
     "/editions/the-outlier/02.jpg",
     "/editions/the-outlier/03.jpg",
     "/editions/the-outlier/04.jpg",
     "/editions/the-outlier/05.jpg",
   ],
   ```

5. Commit and push. Vercel rebuilds automatically and the new
   photography goes live.

If `images` is left empty, the site falls back to the SVG placeholder.

## Format guidance

- **Aspect ratio**: 4:5 portrait works best. Matches framed posters and
  keeps the layout consistent across editions.
- **Resolution**: at least 1600 px on the long side. 2400 px is ideal.
- **File size**: aim for under 600 KB per image. Use
  [Squoosh](https://squoosh.app) or `mozjpeg` to compress.
- **Naming**: keep `01.jpg`, `02.jpg`, ... order. Lowercase, no spaces.

## Editions

- [the-outlier](./the-outlier/)
- [63-sting-ray](./63-sting-ray/)
- [red-waves](./red-waves/)
- [hast-du-gekackt](./hast-du-gekackt/)
- [untitled-05](./untitled-05/)
- [untitled-06](./untitled-06/)
