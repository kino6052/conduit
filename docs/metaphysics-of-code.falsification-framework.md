---
title: THE METAPHYSICS OF CODE - Falsification Framework for Empirical Software
subtitle: Falsification Framework for Empirical Software
date: 2025-02-21
layout: post.html # reference to a layout file
tags: all; code / architecture; code / metaphysics; draft;
---

---

The Core Claim

Empirical Software is a falsifiable methodology. It makes specific, testable claims about software development. If these claims are false, the methodology must be abandoned or revised.

This is not a creed. This is science.

---

The Claims

Claim 1: Grounding in Perception Is Necessary

The Claim:

Software is a communicated idea. The only stable ground for architectural decisions is what the user perceives on the screen. Any abstraction that cannot be traced to perception is a ghost that will eventually produce complexity and brittleness.

What Would Falsify It:

Produce a software system that:

1. Contains abstractions with no correspondent in user perception
2. Is demonstrably more maintainable, adaptable, and understandable than a system that follows the Empirical approach
3. Maintains this advantage over multiple years, multiple developers, and multiple requirement changes

The Experiment:

Take two teams. Give them the same requirements. Have one team build with Empirical principles (grounding everything in perception). Have the other team build using any other approach—Domain-Driven Design, Clean Architecture, Feature-Sliced Design, or "best practices."

Measure:

· Time to implement new features after 6 months
· Number of bugs introduced per change
· Time for new developers to become productive
· Developer satisfaction

If the non-Empirical team outperforms the Empirical team on all metrics, the claim is falsified.

---

Claim 2: Grounding in Perception Is Sufficient

The Claim:

Grounding everything in what the user perceives is sufficient to build any software system. You do not need to model the "domain" or the "business" or the "data" separately. The screen is enough.

What Would Falsify It:

Produce a software system that:

1. Is grounded entirely in what the user perceives
2. Cannot be built because the perceptual ground is insufficient to capture the system's complexity
3. Requires additional concepts that have no perceptual anchor

The Experiment:

Take a complex system—a payment processor, an airline reservation system, a hospital management system.

Attempt to model it entirely in terms of what the user perceives. Build the pure, synchronous, in-memory representation of the screens, the buttons, the forms, the status messages.

If you cannot build a complete, working, verifiable system using this approach, the claim is falsified.

If the system works but is more complex than an alternative approach, the claim is weakened.

---

Claim 3: Accidents Are Swappable Without Affecting Substance

The Claim:

The substance (what the user perceives) can be completely separated from the accidents (the framework, the database, the deployment platform). The substance can be tested and verified in isolation. The accidents can be swapped without changing the substance.

What Would Falsify It:

Produce a system where:

1. The substance and accidents are correctly separated
2. Swapping an accident (e.g., changing from React to Vue, or PostgreSQL to MongoDB) requires changing the substance
3. This is not due to poor design but due to inherent constraints of the problem

The Experiment:

Build a system using the Empirical approach. Extract the pure substance—the in-memory state machine.

Swap the UI framework. Swap the database. Swap the deployment platform.

If any swap requires changing the substance, the claim is falsified.

---

Claim 4: Empirical Software Produces Faster Feedback

The Claim:

Because the substance is pure, synchronous, and in-memory, tests run in milliseconds. This instant feedback loop enables faster iteration, safer refactoring, and higher quality.

What Would Falsify It:

Produce an Empirical system where:

1. The substance is correctly isolated
2. Tests run slower than an ad-hoc approach
3. The feedback loop is longer, not shorter

The Experiment:

Measure the test execution time for an Empirical system against an equivalent ad-hoc system.

If the ad-hoc system provides faster feedback (measured from code change to test result), the claim is falsified.

---

Claim 5: Empirical Software Reduces Reification

The Claim:

Because the only criterion for existence is perception, developers are prevented from creating ghosts. The system contains no abstractions that do not correspond to something the user sees.

What Would Falsify It:

Produce an Empirical system that:

1. Claims to be grounded in perception
2. Contains abstractions that have no perceptual anchor
3. These abstractions are load-bearing and cannot be removed without breaking the system

The Experiment:

Review an Empirical codebase. Identify every abstraction (class, interface, function, module). For each one, ask: "Does this correspond to something the user perceives?"

If a significant number of abstractions have no perceptual anchor, the claim is falsified.

---

Claim 6: Empirical Software Is Simpler and More Maintainable

The Claim:

Because the substance is small, pure, and isolated, the system is easier to understand, change, and maintain. Developers can hold the entire substance in their head.

What Would Falsify It:

Produce an Empirical system where:

1. The substance is correctly isolated
2. The system is more complex, harder to understand, and more difficult to change than an ad-hoc system solving the same problem
3. This is not due to poor implementation but due to inherent limitations of the approach

The Experiment:

Take two teams. Give them the same requirements. Measure over time:

· Lines of code
· Number of modules/classes
· Cyclomatic complexity
· Time to implement new features
· Bug rate

If the Empirical system is consistently more complex than the ad-hoc system, the claim is falsified.

---

The Falsification Test

If you are a skeptic, you can falsify the Empirical Software approach by producing evidence for any of the following:

Claim Falsification Evidence
Grounding in perception is necessary A system with ungrounded abstractions that outperforms a grounded system
Grounding in perception is sufficient A system that cannot be built from perception alone
Accidents are swappable A swap that requires changing the substance
Empirical produces faster feedback An Empirical system with slower tests than ad-hoc
Empirical reduces reification An Empirical system with load-bearing ghosts
Empirical is simpler and more maintainable An Empirical system that is more complex than ad-hoc

---

What Would Not Falsify It

To be clear, the following would not falsify Empirical Software:

· "I don't like it." This is subjective. The claims are objective.
· "It's not how we've always done it." Tradition is not evidence.
· "It seems too simple to work." Intuition is not evidence.
· "The business requires more complex modeling." This is the very reification the framework rejects. If the business requires something not on the screen, it is a ghost.
· "Our framework forces us to do it differently." The framework is an accident. If it forces pollution, replace it.

---

The Science

This is how science works.

You state a claim. You specify what would falsify it. You invite others to produce the evidence. If the evidence appears, you revise or abandon the claim. If the evidence does not appear, the claim stands.

Empirical Software is falsifiable. It is science. It is not a creed.

---

Summary

Claim Falsification
Perception is necessary A system with ghosts that is more maintainable
Perception is sufficient A system that cannot be built from perception alone
Accidents are swappable A swap that requires changing the substance
Faster feedback Slower tests than ad-hoc
Reduces reification Load-bearing ghosts in the system
Simpler and more maintainable More complex than ad-hoc

---

This is the falsification framework. It is complete. It is testable. It invites refutation.

If it is false, show us. We will revise.

If it is true, it will survive.
