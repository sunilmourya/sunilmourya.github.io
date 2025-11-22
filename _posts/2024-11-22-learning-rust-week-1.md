---
layout: post
title: "Learning Rust: Week 1 - Ownership & Borrowing"
date: 2024-11-22
category: Rust
tags: [rust, programming, learning, beginners]
read_time: 5
excerpt: "My first week diving into Rust and wrestling with the borrow checker. Here's what I learned about ownership..."
---

## Day 1: Hello, Rust!

Started my Rust journey today by installing `rustup` and creating my first "Hello, World!" program. Coming from Python/JavaScript, the compilation step feels different but satisfying.
```rust
fn main() {
    println!("Hello, Rust!");
}
```

## Understanding Ownership

The ownership system is Rust's superpower. Here's what clicked for me:

1. **Each value has an owner**
2. **Only one owner at a time**
3. **When owner goes out of scope, value is dropped**

### Example that confused me:
```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1; // s1 is moved, no longer valid!
    
    // println!("{}", s1); // This would error!
    println!("{}", s2); // This works
}
```

## Key Takeaways

- Ownership prevents memory leaks and data races
- Borrowing lets you reference data without owning it
- The compiler is strict but saves you from runtime bugs

## What's Next?

Next week, I'm building a CLI tool to track my running data. Combining my two interests!

**Resources I found helpful:**
- [The Rust Book](https://doc.rust-lang.org/book/)
- [Rustlings exercises](https://github.com/rust-lang/rustlings)

---

*Have questions? Find me on [GitHub](https://github.com/yourusername)!*