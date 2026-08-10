---
title: THE METAPHYSICS OF CODE - DON'T REPEAT YOURSELF
subtitle: Don't repeat yourself
date: 2025-02-21
layout: post.html # reference to a layout file
tags: all; code / architecture; code / metaphysics;
---

Here is the critical pressure-test that tightens the core argument.

## Poking the Argument: The Dual Traps of Code Design

To make this bulletproof, we have to admit where developers break things in _both_ directions:

1.  **Trap A (Duplication):** Splitting one real entity into five code objects.
2.  **Trap B (Naive DRY / Over-abstraction):** Forcing two completely different real entities into one fake parent object just because they share a few lines of code.
    If we don't address Trap B, our critique of duplication accidentally justifies the worst over-engineering horror stories in software history.

```
                         HUMAN PERCEPTUAL REALITY
                     ┌──────────────────────────────┐
                     │ "Customer"  vs  "Supplier"   │
                     └──────────────┬───────────────┘
                                    │
    ┌───────────────────────────────┴───────────────────────────────┐
    ▼                                                               ▼
TRAP A: UNGROUNDED PROLIFERATION                TRAP B: NAIVE DRY (GHOST ABSTRACTION)
"CustomerDTO", "CustomerORM", "CustomerEntity"   Merge them into "AbstractAuditableParty"
Result: 1 entity fragmented into 3              Result: 2 real entities fused into 1 fake

```

### 1. Occam’s Razor: Preserving Essence

Occam’s Razor is regularly cited in computer science, but almost always misunderstood:

> _"Entities must not be multiplied beyond necessity."_
>
> In software, **necessity is defined exclusively by human perception.**
> If a concept exists in human reality (_"Customer"_), it must exist in code. If it does not exist in human reality (_"AbstractBaseEntityAdapterFactory"_), it is an unnecessary entity—a ghost.
> Occam's Razor is not about writing fewer lines of code. It is about **keeping the essence pure by refusing to invent ungrounded abstractions.**

### 2. Duplication as Essence Pollution

When you take a single perceptual entity—like an Account balance—and let it exist in a React state, a Redux store, a backend cache, and a database row simultaneously, you duplicate the **identity**.
This is essence pollution. You now have competing versions of reality, and your system will spend immense energy keeping these fragments synchronized.

### 3. The DRY Horror Story: Coincidental Shape vs. True Identity

This is where the naive "clean code" movement went off the rails.
A developer sees a Customer object and a Supplier object. Both have a name, an email, and an address. The developer panics, screams "DRY!", and invents a shared base class:

```typescript
// THE GHOST ABSTRACTION (NAIVE DRY)
// Inventing an entity that exists nowhere in human reality
abstract class AbstractBaseAuditablePartyEntity {
  name: string;
  email: string;
  address: string;
}
```

This is the birth of **instant-legacy**.
Customer and Supplier are two completely distinct entities in human perception. Their lifecycles, business rules, and future needs will diverge. But because an engineer fell in love with code-level DRY, they welded these two distinct identities together using a fake, ungrounded abstraction.
Three months later, when the business changes how Customer emails are validated, the developer modifies AbstractBaseAuditablePartyEntity and accidentally breaks Supplier.

### The Tightened Rule: Shape vs. Identity

> **Shape is accidental; Identity is substantial.**
>
> - **Coincidental Similarity:** Two distinct perceptual entities that happen to look similar in code today. **Do NOT merge them.** Duplicating a few lines of structural shape is harmless.
> - **Identity Duplication:** A single perceptual entity scattered across multiple files or state containers. **Eliminate it.** Duplicating an identity is fatal.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        THE GROUNDING DECISION                          │
├──────────────────────────────────┬─────────────────────────────────────┤
│ COINCIDENTAL SHAPE               │ IDENTITY DUPLICATION                │
│ (Two different things look alike)│ (One thing split across code)       │
├──────────────────────────────────┼─────────────────────────────────────┤
│ • Example: Customer & Supplier   │ • Example: CustomerDTO & Customer   │
│ • Action: KEEP SEPARATE          │ • Action: MERGE / UNIFY             │
│ • Reason: Different real-world   │ • Reason: Single real-world         │
│   identities.                    │   identity.                         │
└──────────────────────────────────┴─────────────────────────────────────┘

```

By drawing this line, we prevent both abuses: we stop developers from scattering a single identity into a dozen mappers (Trap A), and we stop them from inventing fake base classes in the name of DRY (Trap B).
Does this distinction between _coincidental shape_ and _true identity_ give us the exact edge we need to call out over-engineered "clean code" practices?
