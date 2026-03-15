---
layout: post
title: "C++ Move Semantics: What the Textbooks Skip"
date: 2026-03-28
category: C++
tags: [cpp, move-semantics, rvalue, performance, memory]
day: 13
read_time: 7
excerpt: "I've used std::move for years. This week I finally understood what it actually does — and what it doesn't do."
---

<div class="day-log-header">day 013 · 28 mar 2026 · c++ · 1h 45min</div>

I've been writing C++ for 8 years. I've used `std::move` hundreds of times. This week, explaining it to myself as a Rust developer, I realized I had a gap.

## What std::move actually is

`std::move` does not move anything.

That's the thing the textbooks bury. `std::move` is an unconditional cast to an rvalue reference. It's equivalent to:

```cpp
static_cast<typename std::remove_reference<T>::type&&>(t)
```

The *actual* moving happens in the move constructor or move assignment operator that gets called because of that cast. If no such constructor exists, the copy constructor runs instead — silently. Your "move" became a copy and the compiler said nothing.

```cpp
struct NoCopyNoMove {
    int data[1000];
    // No user-defined move constructor
    // Compiler generates one: memberwise move (= memberwise copy for ints)
};

NoCopyNoMove a;
NoCopyNoMove b = std::move(a); // "moves" — but for ints, this is a copy
// a is in a "valid but unspecified state" — in practice, unchanged
```

## The Rust contrast

Rust made this click for me. In Rust, move *is* the default:

```rust
let a = String::from("hello");
let b = a;  // moved — a is gone, compiler enforces it
// println!("{}", a); // compile error
```

In C++, you explicitly opt into move semantics via rvalue references *and* you write the constructor *and* you call `std::move` *and* you hope nothing silently falls back to copy. Four places to get it wrong.

Rust has one rule. C++ has a protocol.

## The five special functions

The relationship between them is what I always half-understood:

```
1. Default constructor          T()
2. Copy constructor             T(const T&)
3. Copy assignment              T& operator=(const T&)
4. Move constructor             T(T&&)
5. Move assignment              T& operator=(T&&)
```

The rule of zero, three, and five all hinge on one insight: **if you define any one of {destructor, copy ctor, copy assignment}, the compiler suppresses implicit move generation.** This is why old C++03 code — written before move semantics — often silently copies when you expect moves.

```cpp
class OldBuffer {
public:
    ~OldBuffer() { delete[] data; }  // user-defined destructor
    // Implicit move constructor: SUPPRESSED
    // std::move(old_buffer) → calls copy constructor
private:
    char* data;
    size_t size;
};
```

The fix: define the move constructor explicitly, or `= default` all five, or `= delete` the ones you don't want.

## What "valid but unspecified state" means in practice

After a move in C++, the source object must be destructible and assignable — but nothing else is guaranteed. For `std::string`, the standard guarantees it becomes empty. For your own types, it's whatever you implement.

```cpp
std::string s = "hello";
std::string t = std::move(s);
// s is now "" (standard guarantees this for string)
// t is "hello"
std::cout << s.size(); // 0 — safe, but only because string says so
```

Compare Rust: the compiler *physically prevents you* from using `s` after a move. No "valid but unspecified state" to reason about. The moved-from object ceases to exist in the type system.

This is a genuine design tradeoff. C++ flexibility = you can use moved-from objects. Rust safety = you can't accidentally use moved-from objects.

## The audio framework connection

In our SDV audio stack, we have large PCM buffers passed between processing nodes. Before I understood this properly, I had a pipeline stage that was calling copy constructors on 4MB buffers — because the class had a user-defined destructor suppressing move generation. Silent, expensive, and non-obvious in a profiler unless you knew what to look for.

The fix was trivially adding `AudioBuffer(AudioBuffer&&) = default;`. Allocations dropped by ~60% in that stage.

Understanding *why* matters more than knowing the syntax.

---

**Next C++ topic:** Template metaprogramming — specifically, how `std::enable_if` connects to Rust's trait bounds.