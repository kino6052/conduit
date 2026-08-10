---
title: THE METAPHYSICS OF CODE - SOLID Is Aristotelian Metaphysics
subtitle: The Philosophy Bob Martin Didn't Know He Was Writing
date: 2025-02-21
layout: post.html # reference to a layout file
tags: all; code / architecture; code / metaphysics; draft;
---

**Introduction: The Hidden Philosophy**

You have used SOLID principles. You have been told they are "best practices"—pragmatic rules for writing maintainable code. You have been told to apply them, to follow them, to teach them. And you have probably experienced the confusion that follows.

How small should a class be? How many methods is too many? What counts as a "reason to change"? When am I done applying the Single Responsibility Principle? The answer is always the same: "It depends." And no one can tell you what it depends on.

This is not a failure of your understanding. It is a failure of the principles themselves. They are philosophical prescriptions disguised as engineering rules—and they were written by a man who did not realize he was doing philosophy.

SOLID is not a set of pragmatic guidelines. SOLID is Aristotle's metaphysics applied to code.

---

**The Substance-Accident Distinction**

Aristotle asked: What makes a thing _what it is_? He distinguished between _substance_—the essential nature that defines a thing's identity—and _accidents_—everything that can change without destroying that identity.

A chair is a chair because it has four legs, a seat, and a backrest. That is its substance. Its color, material, and height are accidents. You can repaint it, reupholster it, even shorten its legs, and it remains a chair. You cannot remove the seat and call it a chair.

This distinction has haunted philosophy for two thousand years. It has never been properly applied to software.

Until now.

Software has substance too. The substance of a software system is its **minimal, necessary, and sufficient representation**—the pure, synchronous, in-memory state machine that you can hold entirely in your head, interact with directly, and verify without any external machinery. Everything else—databases, UI frameworks, networks, file structures, deployment configurations—is accident. It can be swapped, upgraded, or discarded without destroying the software's essential identity.

SOLID is the accidental application of this distinction to code. Bob Martin wrote rules to solve practical problems—rigidity, fragility, immobility. He was trying to make code "clean." He was actually doing ontology.

---

**Single Responsibility: The Search for Substance**

"Each component should have only one reason to change."

This sounds precise. It is not. How many "reasons to change" does a component have? One line of code has one reason. One method has one reason. One class has one reason if you define the reason broadly enough. And a whole module has one reason if you define it narrowly enough. The principle is unfalsifiable. It can justify any granularity.

Why? Because "reason to change" is an accident. It is external. It depends on who the stakeholders are, what the business wants, what the organizational structure looks like. The CFO wants the tax logic to change. The CTO wants the database to change. These are accidents of corporate structure—not properties of the software itself.

The principle cannot tell you where to stop because it is grounded in the wrong thing. It is grounded in accidents, not in substance.

When you apply the _correct_ philosophical lens, SRP becomes clear:

**Each component should correspond to one perceivable entity.**

A button. A form. A status message. A list. These are the ontological primitives of software. The user points to them on the screen. They exist in the perceptual field. You stop decomposing when you have isolated one observable thing. This is the substance.

If you cannot point to what the user sees that corresponds to your "Customer" class, your "Repository," your "Aggregate Root"—you have reified. You have built a ghost. You have not found substance; you have created metaphysical fantasy.

This is the _real_ Single Responsibility Principle. And Bob Martin never knew it.

---

**Open-Closed: Stacking Behaviors on Substance**

"Software should be open for extension but closed for modification."

This principle is about _stacking behaviors_ on top of the substance. You have the essential core—the perceivable behaviors. Then you add what is necessary for the project to function in its context. These additions are accidents, but they are a particular kind of accident.

There are two types of accidents:

1. **Baked accidents**—Things that are _implemented_ but not essential. They live inside the system. They could, in theory, be different without changing the core identity. They are necessary for the project, but they are not the substance.

2. **Separated accidents**—Things that are _plugged in_ at the boundary. Dependencies, third-party services, infrastructure, frameworks. These are external and swappable. They do not live inside the substance; they are connected to it through contracts.

Open-Closed is the recognition that you can stack behaviors on top of substance. You can add new functionality without altering the essence. But it fails to tell you _what_ to extend and _what_ to close. Without the substance-accident distinction, you cannot know where the boundary is.

The correct application: **The substance is closed. The accidents are open.**

Your perceivable, grounded, essential behaviors do not change when the business adds a new feature. They _extend_—you add new perceivable behaviors—but the existing ones remain untouched. And the accidents—the implementation details, the external dependencies—can be extended, swapped, or discarded without touching the substance.

This is what Open-Closed _should_ mean. It is not what it _does_ mean.

---

**Liskov Substitution: Contracts as Substance**

"Subtypes must be substitutable for their base types."

This principle tells us that implementations of dependencies must match a contract. The contract itself must be substantial. It must be minimal, necessary, and sufficient.

If a dependency's implementation violates the contract, the substance breaks. The system becomes untestable, unpredictable, or dishonest.

The contract is not an accident. It is the _grounding_ of the substance at the boundary. It defines what is essential for that interaction. Any extra method, any unneeded property, is an accident leaking in.

The Liskov Substitution Principle is correct—when the contract is grounded in perceivable behavior. When the contract is an abstract `IUserRepository` derived from your database schema, you have built a ghost. When the contract is "the user clicks this button and sees this result," you have built substance.

This is what Liskov _should_ say. It does not.

---

**Interface Segregation: No Accidents in Contracts**

"No client should be forced to depend on methods it does not use."

This is a defense of the contract. It says: make sure we do not pollute the substance with accidents. Dependencies, too, must be substantial.

Any method on an interface that is not necessary for the interaction is an accident. It forces the client to depend on something that is not essential. It adds coupling where none is needed. It makes the contract fat, imprecise, and polluted.

This is correct—when the interface is grounded in perceivable behavior. When you start with "the user clicks this button" and derive the interface from that interaction, you naturally get only what is necessary. When you start with "we need a UserRepository" and build abstractions around it, you create pollution.

The Interface Segregation Principle is a symptom of a larger problem: fat interfaces exist because we never started from substance. We started from accidents and built abstractions around them. ISP is a corrective, but it's correcting a problem we shouldn't have had.

The real fix: **Start from the user's perception. Derive the interface from the observable behavior. It will be exactly as small as it needs to be.**

---

**Dependency Inversion: The Crown Principle**

"Depend on abstractions, not concretions."

This is the most philosophically correct of the five principles. It explicitly says: the substance must not depend on accidents. Your core logic must not depend on databases, frameworks, UI libraries, or networks. These are accidents. They change. They vary. They are not essential.

Dependency Inversion forces you to invert the direction of dependency so the substance is independent. Your core logic depends on contracts—interfaces—that are substantial. The implementation details depend on the contracts. The substance is protected.

This is the structural mechanism that makes "soft software" possible. By inverting dependencies, you isolate the substance from everything that can change. You make the software light enough to run on a developer's local machine, at any moment, with zero external dependencies. You make it _soft_.

But here is the trap: "abstractions" can themselves become metaphysical ghosts. An abstract `IUserRepository` is still an accident if it was derived from your database schema rather than from perceivable user behavior. The abstraction must itself be substantial—grounded in what the user sees and does—or it is just another layer of reification.

The correct application: **Depend on contracts that are grounded in perceivable behavior. Let the accidents depend on you, not the other way around.**

---

**Why SOLID Is Philosophical (And Bob Martin Didn't Know It)**

Bob Martin prescribed rules to solve practical problems. He saw codebases that were rigid, fragile, immobile. He saw developers struggling to make changes. He wrote principles to make software "clean."

He did not know he was doing philosophy.

He did not know he was writing about substance and accidents. He did not know he was applying Aristotle's metaphysics to code. He did not know that "one reason to change" is an ontological claim, not a practical one. He did not know that "depend on abstractions" is an epistemological claim about what counts as real.

He just wanted to help developers write better code.

And the principles _work_—when they work—because they _accidentally_ enforce the substance-accident distinction. When you correctly apply SRP, you naturally isolate substance. When you correctly apply DIP, you naturally protect it. But without the philosophical framework, these principles are ambiguous, unfalsifiable, and easily misapplied.

Developers are left guessing. They argue over how small a class should be. They build metaphysical labyrinths of abstractions. They create "Customer" objects that are load-bearing architectural walls, while the actual behavior of the software is buried six folders deep.

They are doing philosophy without knowing it. And because they do not know it, they are doing it badly.

---

**The Antidote: Substance-First Architecture**

SOLID is not wrong. It is incomplete. It is a set of philosophical principles that were stripped of their philosophical grounding and presented as engineering rules.

The solution is not to abandon SOLID. The solution is to _ground it_.

Start from the user's perception. What does the user see? A button. A form. A status message. These are your ontological primitives. These are your substance.

Everything else—the database, the API, the cloud, the framework, the file structure—is accident. It can be changed. It can be swapped. It is not essential.

Let SOLID be what it always was: a philosophical manifesto. But now, understand it. Apply it correctly. Stop building ghosts. Start building substance.

The software will stay soft.
