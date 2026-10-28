# Suisun Neuroscience Summit Archive — EEG-aligned website variant

A responsive, static HTML/CSS/JavaScript prototype based on the supplied sitemap and publicly available Suisun Summit / EEG Strategies information. The supplied 2026 Summit stylesheet (`base.css`) is the design foundation: blue primary actions, slate text, white/light-gray surfaces, system sans-serif typography, rounded controls, and restrained teal/purple/orange accents. Archive-specific layouts and galleries are layered on top.

## Preview locally

1. Download and unzip the website folder.
2. Open `index.html` in a modern browser. Most features work as a static site; to avoid browser-specific restrictions, you can also run a local server from this folder with `python -m http.server 8000` and visit `http://localhost:8000`.

## Pages

- `index.html` — home page, timeline, edition cards, community/gallery story, recording links.
- `summit.html?year=2026` — dynamic year archive with a per-year responsive image gallery; switch the year in the URL to `2022`, `2023`, `2024`, `2025`, or `2026` for the visible archive range.
- `speakers.html` — searchable directory with year and topic filters.
- `vault.html` — recording packages with purchase links to Thinkific.
- `about.html` — archive purpose and EEG Strategies bridge page.
- `site-data.js` — year / agenda / speaker content model.
- `site.js` — timeline, search filters, and dynamic page rendering.
- `base.css` — the client-provided 2026 Summit global/component stylesheet.
- `styles.css` — archive layout and responsive structure, mapped to the base stylesheet tokens.
- `eeg-theme.css` — archive-specific component styling and galleries, using the same base token system.

## Before launch

- **Confirm historical content.** The visible archive timeline starts in 2022. The 2022 entry is deliberately marked as a placeholder because details were not confirmed while creating this prototype. Check dates, themes, speakers, honorees, and agenda spelling against original programs.
- **Confirm the 2026 recording status.** The archive links to the official Summit website for release information rather than asserting that a separate public product is currently available.
- **Review speaker data.** Names, affiliations, topic tags, and years were assembled from public Summit and course pages; verify and expand bios with the client.
- **Review testimonials and photos.** Year pages include responsive galleries using official public-facing Summit cover art and speaker portraits found on the public Summit / EEG Strategies pages. Each listed speaker without a verified public portrait receives a named placeholder rather than another person’s image. If a linked image fails to load, the gallery automatically swaps it for a labeled placeholder. The 2022 gallery displays clearly labeled empty photo slots because verified 2022 photographs and speaker records are not in the current source set. Confirm rights / permissions and replace external links with client-approved media or CMS-hosted images before launch.
- **Confirm sales links and pricing.** Purchase links go to EEG Strategies' Thinkific catalog. Prices shown in the prototype reflect the listings observed during creation and should be checked at launch.
- **Set a platform.** These are static files rather than a WordPress theme or CMS build. A production site that needs staff editing, year-by-year agenda entry, file uploads, or integrated commerce should be connected to the client's chosen CMS.

## Source references used for initial population

- https://suisun.eegstrategies.com/
- https://suisun.eegstrategies.com/detailed-agenda/
- https://eegstrategies.com/
- https://eegstrategies.com/suisun-summit-2025/
- https://courses.eegstrategies.com/collections/suisun-summit-2023
- https://courses.eegstrategies.com/courses/suisun-summit-2024
- https://courses.eegstrategies.com/courses/Suisun-Summit-2025

### Speaker directory portraits

The speaker directory uses the same publicly listed presenter portrait assets as the year-by-year galleries. Profile portraits are displayed in compact 50 × 50 px square frames (one-quarter of the prior 200 px width and height), positioned to the left of each speaker’s name and affiliation with `object-fit: cover`. When no verified portrait is available—or a public image fails to load—the card displays a labeled initials placeholder.


## Styling foundation

`base.css` contains the supplied 2026 Summit global/component stylesheet. The archive-specific styles build on top of it, with the palette and typography mapped to the provided blue/slate design tokens.