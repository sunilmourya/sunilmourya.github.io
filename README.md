# sunilmourya.github.io

Personal site. 100 days of Rust, C++, and running. Crash to highs.

## Structure

```
.
├── _config.yml
├── _includes/
│   ├── header.html
│   └── footer.html
├── _layouts/
│   ├── default.html
│   └── post.html
├── _posts/
│   └── YYYY-MM-DD-day-NNN-title.md   ← daily log format
├── assets/
│   ├── css/style.css
│   └── js/main.js
├── index.html         ← home + live progress strip
├── 100days.html       ← mission + day grid + all day logs
├── about.html         ← crash to highs story
├── now.html           ← /now page (update weekly)
└── README.md
```

## Post Frontmatter

### Day log (100DaysOfX)
```yaml
---
layout: post
title: "Day 42: Lifetimes clicked + tempo run"
date: 2026-04-26
category: Rust          # Rust | C++ | Running | Life
tags: [rust, lifetimes, 100days]
day: 42                 # day number 1-100
read_time: 3
distance: 7.2           # km (for Running posts)
pace: "5:30/km"         # (for Running posts)
excerpt: "One line summary shown on index"
---
```

### Regular post
```yaml
---
layout: post
title: "FFI Patterns: Calling C++ from Rust"
date: 2026-04-01
category: Rust
tags: [rust, cpp, ffi, bindgen]
read_time: 8
excerpt: "Deep dive into bindgen and safe FFI boundaries"
---
```

## Categories
- `Rust` — learning, projects, exercises
- `C++` — C++11 deep dives, SDV/audio
- `Running` — training logs, race reports
- `Life` — reflection, meta

## Running locally
```bash
gem install bundler jekyll
bundle exec jekyll serve --livereload
```

## Plugins needed (Gemfile)
```ruby
gem "jekyll-feed"
gem "jekyll-seo-tag"
gem "jekyll-paginate"
```

## Content plan (100 days)

**Week 1–2 (Days 1–14):** Rust fundamentals without AI
- Ownership, borrowing, lifetimes from scratch
- Rustlings exercises
- Running base-building

**Week 3–5 (Days 15–35):** DSA in Rust
- Linked list, BST, graph — all manual
- Parallel C++ implementations
- First 10K attempt

**Week 6–8 (Days 36–56):** Systems in Rust
- CLI tools (real projects)
- File I/O, error handling patterns
- FFI bridge with C++ audio lib

**Week 9–10 (Days 57–70):** Interview prep
- System design
- Coding patterns
- Portfolio writeups

**Week 11–14 (Days 71–100):** SDV/Automotive focus
- Audio framework integration
- Rust in embedded context
- Half-marathon week 14

## Theme

Dark logbook aesthetic. Fonts: Syne (display) + Syne Mono + Literata.
Colors: Rust orange (#e06c2a), terminal green (#4ade80), code blue (#60a5fa).