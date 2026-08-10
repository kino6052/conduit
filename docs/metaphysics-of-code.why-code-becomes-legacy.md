---
title: THE METAPHYSICS OF CODE - Why Does Code Become Legacy?
subtitle: Why Does Code Become Legacy?
date: 2025-02-21
layout: post.html # reference to a layout file
tags: all; code / architecture; code / metaphysics; draft;
---

### A Little Metaphor

Writing code is like connecting two dots. Expectedly, the easiest way is to draw a straight line between Point A and Point B.
For most simple cases, this works. In software, this pure, straight line represents the **essence**—the pure logic of what the application does and what the user directly perceives.
But in real life, besides connecting the dots, you also have to bypass obstacles. These obstacles are the **accidents**—the frameworks, the browser APIs, the database, the network latency. In the beginning, maneuvering around them is no big deal.
Now, let's increase the number of obstacles. The line becomes more winding.
Next, let's make these obstacles move. Slowly, but enough to cause problems. Frameworks update, deployment pipelines shift. The straight line now looks much more serious.
What if we make the dots themselves move too? Requirements change, and you have to keep the line connected.
But here is the final, most maddening complication: Imagine we only know the _approximate_ position of the dots, and the only way to find out if our line is actually connecting them is to request their location, which takes 5 minutes every time you ask.
This is exactly what real-world UI development looks like.

### The Discussion

In the context of this metaphor, the dots are the functional requirements—the verifiable reality of what the software must do. The moving obstacles are the technological constraints.
Naturally, in such a dynamic situation, code written with the best intentions turns into an ugly, tangled curve. This happens due to **reification**: developers invent unverified fictions (ghosts) in their architecture, and to keep those fictions alive, they weld their pure logic (the essence) directly to the moving obstacles (the accidents).
This tangled yarn is known as **legacy code**—code that is extremely difficult to change without breaking everything, where the pure logic has been entirely polluted by accidental machinery.

### How to Solve This Problem?

Partially, this is solved with design patterns—Lego blocks that make building controlled paths easier. But patterns are not enough. In fact, blindly applying patterns to unverified concepts creates _more_ ghosts (overengineering). It is far more important to know that you are moving quickly in the right direction than to move correctly in the wrong one.
To solve the problem of moving dots and obstacles, we need **quick correctness feedback**. We need to know _instantly_ where the dots are.
When you isolate the essence of your application in pure, synchronous memory—completely decoupled from the accidental machinery of the UI framework—your feedback loop drops from 5 minutes to 5 milliseconds. **This instant correctness feedback is the ultimate weapon.** When you can verify the pure logic of your application instantly, you gain the freedom to change the accidents (swap a framework, rewrite a component) incredibly fast and without fear.
To achieve this, you must use **black-box testing**—testing the verifiable essence (what goes in and what comes out on the screen), rather than testing the accidental path the line took.

### From Idea to Legacy

Why is UI development especially prone to becoming legacy? Because fast feedback and the separation of essence and accident are almost never built in from the start.

#### Greenfield — The One-Man Project Built from Scratch

When a developer starts from scratch, the requirements are fresh. As they build the first components, progress is blindingly fast.
They do this using **Greedy Resolution**. Like a falling rock taking the path of least resistance, they bypass tests, hard-coding the logic directly into the UI components to get immediate visual results on the screen. Their priority is meeting the requirement right now, not protecting the architecture for the future. The essence is instantly welded to the accidents. With some trial and error, the project is delivered on time.

#### Brownfield Project

Later, you inherit this project. You have to figure out the thought process of the developer before you.
You can no longer just click around the UI to verify things because the logic is too tangled in the machinery. You are forced to debug through the code. Step by step, you tightly couple new features to the old ones, just trying to survive the sprint.
If you are lucky, you start writing tests. But because the essence is polluted by accidents, you write **white-box tests**. In our philosophy, this is **Testing the Ghosts**. You write tests tied directly to internal implementation details, framework hooks, and unverified abstractions that the user never perceives. Because these tests are bound to the machinery, they break every time the machinery moves.

#### Legacy Project

Finally, the codebase becomes true legacy. There is almost no hope for refactoring. The feedback cycle for knowing if a change is correct is heavily delayed because the tests are slow, flaky, and tied to ghosts. The motivation to improve the codebase dies.

### Conclusion

UI development decays into legacy because developers succumb to greedy resolution. By failing to separate the verifiable essence from the accidental machinery at the very beginning, they destroy the fast correctness feedback loop. Without that speed, you cannot safely maneuver when the world changes, and the code turns to stone.
