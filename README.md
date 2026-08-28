# For You, My Love — a premium romantic birthday website

A cinematic, interactive "digital love letter" built with plain
HTML, CSS and JavaScript — no build tools, no frameworks, no
installs. Open it locally or host it free on GitHub Pages.

## 1. How to preview it

Just double-click `index.html`, or for the smoothest experience
(some browsers restrict autoplay/audio on `file://` pages), run a
tiny local server from this folder:

```bash
# Python 3
python3 -m http.server 8000
# then open http://localhost:8000
```

## 2. Your photos are already in place

Your photos are grouped into your 12 chapters, matched to your memory
text for each one:

1. **Our First Date** (June 7th, 2026)
2. **Our Second Date**
3. **Our First Double Date**
4. **Our First Time Drinking Red Bull Together** — including the Red Bull snap
5. **My Best Trial for Boba**
6. **Our First Cinema Date**
7. **Our First Time Going to the Clinic and Getting Groceries**
8. **My Birthday** — the wallet gift and your first time holding hands
9. **Our First Long Ride and Shopping**
10. **The Most Gorgeous Girl With the Most Random Hijab 😂❤️**
11. **Seeing the Beach With Your Eyes**
12. **Our Names** — the heart-in-the-sand photos

Two extra photos are used outside the 12 chapters: a close-up couple
photo softly blurred behind the opening proposal question, and the
bouquet photo appearing as a polaroid in the finale celebration.

**Please personalize the placeholder details** — captions and exact
dates/locations for chapters 2–12 are left as `>>> EDIT` placeholders
since I only had an exact date for chapter 1. Search `index.html` for
`>>> EDIT` comments and swap in the real details. The memory
paragraphs are your own written text, lightly cleaned up for
grammar and punctuation — your wording, jokes, and personal
references (like "your bravery's bill") are kept as you wrote them.

To swap a photo for a different one, just replace the file in
`assets/images/` (keep the same filename) or update the `src` in
`index.html`.

## 3. How to edit the text

Everything you'd want to personalize is marked with an `>>> EDIT`
comment right above it in `index.html`:

- The opening proposal question
- The two confirmation modal messages
- The "Would you honor me and hold my hand?" sequence text (see
  section 4 below)
- Each chapter's date/location line and photo captions
- The five closing finale lines and final "Happy Birthday" title

## 4. The "hold my hand" sequence

Right after she accepts the main proposal, a new question appears:
**"Would you honor me and hold my hand?"**

- **"Yes, I would ❤️"** shows an emotional transition line, then
  continues straight into the memory journey.
- **"No, I won't"** leads into a playful "Are you sure?" → "Sure
  sure?" confirmation chain (reusing the same modal/glass-card style
  as the rest of the site). Answering "No" at either confirmation
  step returns to the question before it. Confirming all the way
  through shows a closing line and restarts the whole experience
  from the very first proposal question.

## 5. How to add music

Drop an instrumental mp3 into `assets/audio/` and name it `song.mp3`
(see `assets/audio/PUT_YOUR_SONG_HERE.txt` for details and free
sources). The music button top-right toggles play/pause, and it will
also try to start softly the moment she confirms "yes."

## 6. Folder structure

```
index.html            → all page content & structure, heavily commented
css/style.css         → the full visual design system (colors, type, animation)
js/main.js            → all interactivity: the chase-the-No-button game,
                         modals, scroll reveals, cursor trail, finale particles
assets/images/         → chapter photos (currently placeholders — see above)
assets/audio/          → your background music goes here
```

## 7. Hosting it for free on GitHub Pages

1. Create a new GitHub repo and push this whole folder to it.
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment," set Source to **Deploy from a branch**,
   branch `main`, folder `/ (root)`.
4. Save — GitHub will give you a live link (e.g.
   `https://yourusername.github.io/your-repo-name/`) within a minute
   or two. Share that link with her!

## 8. If anything ever feels "not interactive"

This site is 100% self-contained vanilla JavaScript — no external
libraries are required for any button, modal, or animation to work
(only the Google Fonts stylesheet is loaded from the internet, and
that's purely cosmetic). That means it should work the moment you
open `index.html`, even with no internet connection.

If you ever try a version of a site like this that depends on an
external script (e.g. GSAP or a confetti library loaded from a CDN)
and the network is blocked or slow, the whole page can end up
looking static — because if that external script fails to load,
the rest of the JavaScript that depends on it stops running too.
This build deliberately avoids that risk: every animation, the
button chase, the modals, and the finale's confetti/hearts/sparkles
are all hand-built with plain Canvas and CSS, so there's nothing
that can silently fail to load.

If a button still ever seems unresponsive, it's almost always a
`file://` quirk in a specific browser — running the local server
from step 1 fixes that in every case I've seen.

## 9. Notes on the experience

- The "No" button gets progressively smaller and jumps to a random
  spot on screen every time it's approached, with a rotating set of
  playful messages, before finally being replaced by a "Sorry...
  Wrong Answer ❤️" line.
- "Yes" leads through two soft confirmation modals, then the "hold my
  hand?" sequence (see section 4), before revealing the memory journey.
- Scrolling through the 12 chapters triggers fade-ins, staggered
  polaroid "drop" animations, and a light parallax effect.
- Finishing chapter 12 triggers the finale: a canvas-based burst of
  hearts, kiss emoji, sparkles, confetti and fireflies, followed by
  the closing lines appearing one at a time.
- Respects `prefers-reduced-motion` for anyone with that OS setting on.

Happy birthday to her. 🎂❤️
