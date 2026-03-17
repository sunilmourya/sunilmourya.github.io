---
layout: post
title: "Day 001: Rust Iterators — Surface Scratched"
date: 2026-03-16
category: Rust
tags: [100days, rust, iterators]
day: 1
read_time: 2
excerpt: "Started iterators. Need to go deeper. Tomorrow: collections."
---

<div class="day-log-header">day 001 · 16 mar 2026 · rust</div>

Started with Rust iterators. Got through the basics — `map`, `filter`, `collect`. Wrote a custom `Iterator` impl.

Feels surface-level. The concepts are there but not yet in the fingers.

**What's not solid yet:**
- Iterator adaptors chaining
- `flat_map` vs `map` + `flatten`
- When to use `iter()` vs `into_iter()` vs `iter_mut()`

No AI touched today. Took longer. Good.

---

**Tomorrow:** Collections — `Vec`, `HashMap`, `HashSet`. Then back to iterators with actual data structures to iterate over.