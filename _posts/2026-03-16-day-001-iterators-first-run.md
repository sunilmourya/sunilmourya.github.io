---
layout: post
title: "Day 001: Iterators and the First Run"
date: 2026-03-16
category: Rust
tags: [rust, 100days, iterators, running]
day: 1
read_time: 4
distance: 5.2
pace: "5:48/km"
excerpt: "Day 1. Fought with Iterator impl for 40 minutes without AI. Then ran 5K. The reboot is real."
---

<div class="day-log-header">day 001 · 16 mar 2026 · rust + running</div>

## Rust: 2h 15min

Worked on Rust iterators — specifically writing a custom `Iterator` impl from scratch.

Hit the 30-minute wall within the first session. Had a broken impl that wouldn't compile and I sat with it. No Copilot. No pasting into Claude. Just the compiler error, the book, and time.

The error was this:

```
error[E0046]: not all trait items implemented, missing: `Item`
  --> src/main.rs:8:1
   |
8  | impl Iterator for Counter {
   | ^^^^^^^^^^^^^^^^^^^^^^^^^ missing `Item` in implementation
```

I kept looking at my `next()` method. Correct logic. Kept looking. 38 minutes before I noticed the missing associated type:

```rust
struct Counter {
    count: u32,
}

impl Iterator for Counter {
    type Item = u32;  // ← this. I kept forgetting this.

    fn next(&mut self) -> Option<Self::Item> {
        if self.count < 5 {
            self.count += 1;
            Some(self.count)
        } else {
            None
        }
    }
}
```

`type Item = u32`. Four words. 38 minutes.

I will never forget associated types again.

## Running: 5.2km

First run of the 100 days. Evening, after the Rust session. Legs were stiff — I hadn't run in 11 days.

5.2km at 5:48/km. HR peaked at 171 on the small hill near the reservoir, settled at 162 avg. Harder than it should have been, but Day 1 of anything is supposed to feel like Day 1.

The interesting thing: I was still thinking about the `type Item` problem during the first kilometer. By km 3, it had dissolved. By the time I got home, the solution felt obvious.

There's something about physical reset that works. I don't understand the mechanism, don't need to.

## Honest assessment

Day 1 was uncomfortable in all the right ways.

The 38-minute stuck period was painful. Not intellectually painful — just the quiet anxiety of not knowing if I was doing something wrong or just hadn't found the answer yet. That anxiety is the thing I'd been short-circuiting with AI tools.

I let it run. Found the answer. The answer stuck.

---

**Tomorrow (Day 2):** Singly linked list. `Box<T>`. No stdlib, no looking at how others did it.