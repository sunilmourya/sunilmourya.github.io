---
layout: post
title: "Lifetimes Aren't About Memory — They're About Scope"
date: 2026-03-22
category: Rust
tags: [rust, lifetimes, borrowing, ownership]
day: 7
read_time: 8
excerpt: "Week 1 done. The thing that finally made lifetimes click wasn't a diagram — it was realising the borrow checker isn't tracking memory, it's tracking time."
---

<div class="day-log-header">day 007 · 22 mar 2026 · rust · 2h 20min</div>

I spent two days confused by lifetime annotations. Here's what finally clicked — and it wasn't in any tutorial I read.

## The wrong mental model

Every explanation I found started with memory. "The borrow checker ensures references don't outlive the data they point to." True, but thinking about *memory* made me write lifetime annotations like I was manually managing allocations.

I kept asking: *why does the compiler need me to tell it this? It can see the code.*

## The right mental model

Lifetimes aren't about memory. They're about **scope relationships**.

When you write `'a`, you're not saying "this lives for some duration A." You're saying "this reference and that reference must share a scope relationship." The compiler needs you to name the relationship so it can verify it.

Here's the function that broke my brain for 45 minutes:

```rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}
```

I kept reading this as "x and y both live for lifetime `'a`." That's subtly wrong.

The actual meaning: **the returned reference will be valid for the overlap of x's and y's lifetimes.** `'a` isn't a fixed duration — it's whatever the intersection turns out to be at the call site.

```rust
let s1 = String::from("long string");
let result;
{
    let s2 = String::from("xy");
    result = longest(s1.as_str(), s2.as_str());
    println!("{}", result); // ✓ — s2 still alive here
}
// println!("{}", result); // ✗ — s2 dropped, 'a shrunk to s2's scope
```

`'a` is elastic. It contracts to the shortest input lifetime at each call site.

## Where this clicks in practice

Once I had this model, structs with lifetime parameters stopped feeling arbitrary:

```rust
struct Excerpt<'a> {
    content: &'a str,
}
```

This isn't "Excerpt has a lifetime." It's: "Excerpt borrows some string, and it cannot outlive that string." The `'a` names that dependency so the compiler can enforce it across function boundaries where it can't see the original source.

## The 30-minute rule in action

I hit the wall on this code:

```rust
fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }
    &s[..]
}
```

No lifetime annotations. It compiles. I wanted to understand *why* the compiler didn't ask for them here.

Sat with it for 35 minutes before realising: **lifetime elision rules**. The compiler applies three rules mechanically, and when only one input reference exists, the output lifetime is inferred to match it. It's not magic — it's a deterministic algorithm.

Would have Googled it in 2 minutes before. Instead I traced through the elision rules myself. I won't forget them now.

## The C++ parallel

C++ has dangling references too, obviously. The difference: C++ lets you *create* them. Rust won't compile.

```cpp
// C++ — compiles, undefined behaviour at runtime
std::string_view first_word(const std::string& s) {
    auto pos = s.find(' ');
    return s.substr(0, pos); // returns string_view into temporary — dangling
}
```

The Rust compiler would reject this. Not because it's smarter about memory — because lifetimes force you to name the relationship and verify it statically.

## What I'm taking into week 2

Lifetime annotations are a communication tool between you and the compiler, not a runtime mechanism. Once I stopped thinking of them as "telling the computer where memory lives" and started thinking of them as "naming scope relationships," the syntax became almost obvious.

Almost.

---

**Tomorrow:** Implementing a singly linked list. `Box<T>` only. No `Rc`, no `RefCell`, not yet.