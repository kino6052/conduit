---
title: THE METAPHYSICS OF CODE - ESSENCE (DRAFT)
subtitle: What software actually is
date: 2025-02-21
layout: post.html # reference to a layout file
tags: all; code / architecture; code / metaphysics; draft;
---

---

I. What Software Actually Is

Software is not code. Software is not behavior. Software is not a database, a framework, or a deployment pipeline.

Software is a communicated idea.

It is an experience that is designed, encoded, and transmitted to a human mind through a perceptual interface. The user sees a screen. They read text. They click buttons. They receive feedback. All of this communicates meaning to them. They understand what is happening, what they can do, what has gone wrong, what has succeeded.

This is what makes software software. It is not the machinery. It is the meaning that the machinery produces.

A dog can look at a screen. A dog can see colors, movement, shapes. But the dog does not understand that clicking a button means "I am logging in." The dog does not understand that an error message means "something went wrong." The dog is not part of the communicative loop. The software is not for the dog.

Software only exists in the mind of the person who perceives it. It is meaning, made manifest.

---

II. The Great Confusion

We have confused the machinery with the meaning.

We treat frameworks, databases, and deployment pipelines as if they were the substance of software. They are not. They are the machinery that carries the meaning. They are the vehicle, not the destination.

This confusion is not accidental. It is reinforced by our professional culture. The developer who wrestles with complex infrastructure is seen as skilled. The developer who builds a simple, clear model of the user's experience is seen as naive. Complexity signals competence. Simplicity signals amateurism.

This is the status trap. It is the deepest cause of our professional dysfunction.

---

III. Substance and Accident

Every thing has a substance—what it essentially is—and accidents—everything that can change without destroying its identity.

The substance of software is the idea it communicates to the user. The experience. The meaning. The story.

The accidents are everything else:

· The programming language
· The framework
· The database
· The deployment platform
· The file structure
· The design patterns
· The infrastructure

All of these can be changed without changing what the software means to the user. If you rewrite the code in a different language, and the user's experience remains identical, the software has not lost its identity. The substance survived. The language was an accident.

This is not a metaphor. It is the most practical observation imaginable. It tells you what to protect, what to change, and what to ignore.

---

IV. The Labyrinth

When we confuse accidents with substance, we build labyrinths.

We choose a framework. We choose a database. We choose an ORM. We choose a deployment platform. We choose a file structure. We choose patterns. Each choice is rational in isolation. Each solves a real problem.

But collectively, they create a labyrinth. The code becomes entangled with the tools. The framework dictates the structure. The ORM dictates the data model. The deployment platform dictates the architecture.

The software becomes hard. A small change requires touching seven layers. A bug fix requires understanding three different abstractions. The developers learn to navigate the labyrinth. They take pride in their ability to do so. The labyrinth becomes their identity.

The layman—the person who has not been initiated—looks at the labyrinth and asks: "Why is it so complicated?"

We have no good answer. Because the answer is: "We made it complicated because it made us feel important."

---

V. The Status Trap

This is the hardest truth to face.

We choose complexity because it signals competence. We build elaborate architectures because they make us look like experts. We use obscure terminology because it separates us from the uninitiated.

This is not a conspiracy. It is a psychological trap. It is tied to identity. "I am a serious engineer because I understand these serious tools." To admit that simplicity is superior is to admit that our years of wrestling with complexity were wasted. It is to question our own worth.

The status trap obscures what software engineering should be: the clear communication of an idea to a human mind. Instead, we build monuments to our tools. We serve the machinery, not the meaning.

---

VI. The Empirical Ground

The only cure is grounding.

Grounding means anchoring every element of the software in what the user perceives. Every component must correspond to something the user can see, read, or interact with. If you cannot point to what the user experiences that corresponds to this module, this layer, this entity—it has no right to exist.

This is not minimalism. It is empiricism applied to architecture. It is the insistence that meaning precedes machinery. It is the refusal to build ghosts.

When you ground the software in perception, the labyrinth dissolves. You no longer need to argue about how many classes to create. You just ask: "What does the user see?" You no longer need to debate which pattern to apply. You just ask: "What meaning are we communicating?"

The grounding tells you:

· Stop decomposing when you have a perceivable entity.
· Extend only the perceivable behaviors.
· Contracts are grounded in what the user does.
· Interfaces serve perceivable interactions.
· Dependencies protect the perceivable core.

Everything else is an accident. Everything else is swappable. Everything else is irrelevant until the meaning is clear.

---

VII. The Demonstration

We do not argue. We demonstrate.

We build the toy—the minimal, necessary, and sufficient representation of the communicated idea. Pure, synchronous, in-memory. We show it working. We change it. We show the change. We show the ad-hoc version failing. We show the grounded version surviving.

We do this again and again, until the evidence is overwhelming and the old paradigm is an embarrassment.

This is how scientific revolutions happen. Not through argument. Through demonstration. Through evidence that accumulates until it cannot be ignored.

---

VIII. The Preservation

Grounding validates the substance. It preserves it. It prevents the drift into metaphysics, into ghosts, into reified abstractions that have no correspondent in the user's experience.

The substance is the idea. The idea is the meaning. The meaning is what the user perceives and understands.

We protect it by grounding everything in perception. We preserve it by keeping the accidents swappable. We trust it by keeping the feedback loop instant.

---

IX. Conclusion

Software is not code. Software is not behavior. Software is a communicated idea.

We have confused the machinery with the meaning. We have built labyrinths of complexity and called them architecture. We have reified abstractions and called them design.

The cure is grounding. Anchor everything in what the user perceives. Treat everything else as an accident. Demonstrate, do not argue. Preserve the substance.

We must write software this way. Not because we are forced to. But because every other path leads to a system we cannot understand, cannot change, and cannot trust.

The demonstration is the proof. The grounding is the guarantee.

The idea is preserved.

What Architecture Is (And What It Isn't)

---

Architecture Is Not Substance

The substance of software is the idea communicated to the user—the meaning, the experience, the perceivable behavior. Architecture is not perceived by the user. The user does not see the architecture. The user sees the interface, the behavior, the communication.

Architecture is an accident. You can change the architecture without changing what the software means to the user. You can restructure the code, rewire dependencies, reorganize modules—and if the user's experience remains identical, the software has not lost its identity. The substance survived.

---

The Special Accident

Architecture is a special accident. It is the structure we impose on the machinery to protect the substance from other accidents.

Good architecture isolates the substance from:

· The database
· The framework
· The deployment platform
· The network
· The UI framework
· The file structure

Good architecture makes the substance visible, testable, and changeable. It is the arrangement of code that ensures the idea is not polluted by the machinery.

Bad architecture, by contrast, entangles the substance with accidents. It couples the idea to the database, the framework, the deployment platform. It buries the meaning six folders deep. It turns the software into a labyrinth.

---

What Genuine Architecture Does

Genuine architecture answers one question: How do we protect the substance?

It does this by:

1. Defining contracts—interfaces that are grounded in perceivable behavior.
2. Inverting dependencies—so the substance depends on contracts, not on accidents.
3. Separating concerns—so accidents do not bleed into each other.
4. Making the substance runnable in isolation—synchronously, in-memory, without infrastructure.

These are architectural decisions. They are structural. They persist across the lifetime of the software. They are hard to change but should not need to change, because they protect the substance from the things that do change.

---

What Is Not Architecture

Many things called "architecture" are actually infrastructure. They are accidents that serve the machinery, not the substance. They are decisions about where and how the code runs, not about what the code means.

The following are not architecture:

· Cloud provider selection (AWS vs. Azure vs. GCP). This is deployment infrastructure. It is swappable. It does not touch the substance.
· Kubernetes or container orchestration. This is runtime infrastructure. It determines how the machinery is scheduled and scaled. It has no relationship to the user's experience.
· Database technology (PostgreSQL vs. MongoDB vs. DynamoDB). This is storage infrastructure. The substance does not care how data is persisted. It cares only about the behavior it produces.
· Message queues or event buses. This is communication infrastructure. It is a mechanism for moving data between components. It is not the meaning of the data.
· CI/CD pipelines. This is development infrastructure. It automates the deployment of accidents. It does not protect the substance.
· Folder structures and file organization. This is presentation of code. It affects developer navigation, not user experience.
· Linters, formatters, style guides. These are developer tools. They enforce consistency. They do not define the software's identity.

---

Why This Distinction Matters

Confusing infrastructure with architecture is the most expensive error in our profession.

When you treat cloud provider selection as architecture, you lock yourself into a vendor. When you treat database choice as architecture, you harden your data model before you understand your substance. When you treat Kubernetes as architecture, you build around deployment concerns that have nothing to do with the user's experience.

The result is a system that is hard—rigid, brittle, and expensive to change. The accidents become load-bearing. The substance is buried. The labyrinth is complete.

When you treat architecture as protection of substance, you do the opposite:

· You delay infrastructure decisions until the substance is stable.
· You keep the database, cloud, and deployment as swappable implementations.
· You test the substance in isolation, without infrastructure.
· You change infrastructure freely, without touching the core.

The software stays soft.

---

The Litmus Test

Ask this question of every decision:

If I change this, does the user's experience change?

· If yes, it is touching the substance. Proceed with caution. Ground it in perception.
· If no, it is infrastructure. Make it swappable. Delay the decision. Do not let it pollute the core.

Architecture is the set of decisions that must be made early because they protect the substance. Infrastructure is the set of decisions that should be delayed because they serve the machinery.

Confuse them at your peril.

---

Summary

· Substance: The communicated idea. What the user perceives and understands.
· Architecture: The structure that protects the substance from accidents.
· Infrastructure: Everything else—the machinery that runs the code but does not define its meaning.

Architecture is not about servers, databases, or frameworks. It is about boundaries, contracts, and isolation. It is about making the substance visible and preserving it against the chaos of accidents.

Everything else is plumbing.

Models Are Stories

---

Why Do You Use These Models?

Someone defends their abstraction: "We are modeling the real world. Customer is just a model of a real customer. That is what software does—it models reality."

This sounds reasonable. It sounds like engineering. It sounds like the right thing to do.

It is wrong.

---

The Real Question

The question is not: "Is this a model of reality?"

The question is: "Why did you choose this model? Because it corresponds to something the user perceives? Or because it is an easier story to reason with?"

Most developers choose the model because it is an easier story. They build a "Customer" object because it feels right. It fits their mental model. It makes the code easier to talk about. It tells a coherent story.

But the story is not grounded. It is fiction. It is a cognitive convenience, not a correspondence to reality.

---

The Two Reasons

There are only two reasons to create a model:

1. It corresponds to something the user perceives.

· The user sees a name label. The model represents that name.
· The user sees a photo. The model represents that photo.
· The user sees an order list. The model represents that list.

This model is grounded. It is traceable to perception. It is real.

2. It is an easier story to reason with.

· The developer thinks of a "Customer" and feels they understand the system.
· The developer talks to the business and hears "Customer" and adopts the term.
· The developer builds a "Customer" class because it is familiar.

This model is not grounded. It is a convenience. It is a story. It is fiction.

---

The Problem

When you build a model because it is an easier story, you build ghosts.

The "Customer" is not the customer. It is a data structure. It has no direct correspondent in the user's experience. The user does not see a "Customer." The user sees a name, a photo, an order list.

The "Customer" is a shorthand. It is a cognitive crutch. It makes the code easier to write and harder to verify.

And because it is not grounded, it drifts. It accumulates properties, methods, relationships. It becomes load-bearing. It becomes an architectural wall. It becomes impossible to change. And all of this happens because it was an easier story.

---

Why We Tell These Stories

We tell these stories because they are easy. They are familiar. They fit our mental models. They make us feel like we understand.

We tell these stories because we are status-driven. A "Customer" object sounds professional. It sounds like real engineering. It signals that we know what we are doing.

We tell these stories because we are trained to. We are taught data modeling. We are taught ORM. We are taught Domain-Driven Design. We are taught to reify before we understand.

We are never taught to ask: What does the user see?

---

The Correction

The correction is simple:

Model what the user perceives, not what you imagine.

· If the user sees a form, model the form.
· If the user sees a list, model the list.
· If the user sees a button, model the button.
· If the user sees a status message, model the status message.

If you cannot point to it on the screen, do not model it.

---

The Test

Ask this question of every model:

"Why do you exist? Are you here because the user sees you? Or are you here because it is an easier story?"

If it is an easier story, it is a ghost. It has no right to exist. It will pollute your code. It will harden your architecture. It will produce a labyrinth.

If it is what the user sees, it is grounded. It is real. It is substance. Protect it.

---

Summary

· You build models because it is an easier story.
· Easier stories are not grounded in perception.
· Ungrounded models are ghosts.
· Ghosts produce labyrinths.
· The correction: model only what the user perceives.
· If you cannot point to it on the screen, it has no right to exist.

This is the criterion. This is the ground. This is the correction.

The Payment App Example

---

The Common Approach

A team builds a payment app.

They know they need users. Users must register. Users must log in. Users must have accounts. They create a User entity. They create a UserRepository. They build registration, login, profile management.

They are modeling reality. They are doing what they were taught.

They are building ghosts.

---

The Substance

What does the user actually see?

The user sees a payment screen. A form. A button that says "Pay." A confirmation. A receipt. A status message.

The user does not see a "User." The user does not see a "UserRepository." The user does not see an account record.

The substance of this software is the act of paying. The user opens the app, pays, and receives confirmation. That is the experience. That is the communicated idea. That is the substance.

---

The Accident

Registration is an accident.

The user does not need to register to pay. Registration is a constraint imposed by the infrastructure. It is a record-keeping requirement. It is a way for the system to associate payments with an identity. It is a convenience for the system, not for the user.

The user wants to pay. The system requires registration. The registration is an accident. It is not essential to the experience.

---

The Ghost

The "User" is a ghost.

The developer created it because it was an easier story. It felt right. It fit the mental model. The developer said: "We need users. Users need to register. Users need to log in."

But the user does not see a "User." The user sees a payment screen. The user sees a confirmation. The user sees a receipt.

The "User" is a convenient abstraction for grouping data. It has no direct correspondent in the user's experience. It is a ghost.

---

The Surprise

When the developer learns that "User" is not an entity, they are surprised.

They assumed that "User" was real. They assumed that registration was essential. They assumed that the system needed an account.

But none of this is essential. It is all accidental. It is all record-keeping. It is all infrastructure.

The essential thing is the payment. The user pays. The system accepts the payment. The user sees confirmation. That is the substance.

Everything else is an accident.

---

The Correction

The correct approach:

1. Identify the substance. The payment act. The user opens the app, pays, sees confirmation.
2. Model the substance. A screen with a form and a button. A state machine that tracks the payment flow. A result that displays confirmation or error.
3. Treat registration as an accident. It is not essential. It is record-keeping. It is infrastructure. It can be swapped, delayed, or removed.
4. Do not create a "User" entity. Create a payment handler. Create a transaction record. The "User" is a convenience label for a cluster of data that appears only in the infrastructure layer.
5. Ground everything in perception. If the user does not see it, it is not substance. It is accident.

---

The Lesson

The lesson is simple:

Do not model what you imagine. Model what the user perceives.

The payment app does not need a "User." It needs a payment flow. The "User" is a ghost. The registration is an accident. The substance is the payment.

---

Summary

· The common approach: Build a User entity. Build registration, login, profile. Treat these as essential.
· The substance: The payment act. The user pays. The user sees confirmation.
· The accident: Registration. It is record-keeping. It is infrastructure. It is not essential.
· The ghost: The "User." It has no direct correspondent in the user's experience. It is a convenience label for data.
· The correction: Model the payment flow. Treat registration as an accident. Do not create a "User" entity. Ground everything in what the user perceives.
