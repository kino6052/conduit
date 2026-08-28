---
title: THE METAPHYSICS OF CODE - PERSONAL PREFERENCE
subtitle: Personal Preference
date: 2025-02-21
layout: post.html # reference to a layout file
tags: all; code / architecture; code / metaphysics;
---

## Section: The Labyrinth of Fake Entities — From Personal Preference to Precise Language

If you ask ten developers to critique a codebase, you will get ten conflicting opinions.
One will say a function is "too long." Another will argue over spaces versus tabs. A third will demand three more abstraction layers because "that’s how enterprise software is done."
Because software engineering has lacked an empirical foundation, architectural discussions routinely devolve into **subjective bikeshedding and personal preference**. Developers feel gaslit by framework dogma, unable to articulate _why_ a 7-layer architecture feels deeply wrong when every textbook claims it is "best practice."
This book provides the objective vocabulary to end those debates.
The exhaustion you feel in modern software development is not a matter of taste. It is the direct mathematical and epistemological consequence of **building software out of entities that do not exist.**

### 1. Topological Reification: Folder Trees as Monuments to Machinery

The corruption begins before a single line of business logic is written. It starts when a developer sets up a repository and builds a directory tree structured around **where code executes** and **what frameworks demand**:

```
  TRADITIONAL CODEBASE TOPOLOGY (GROUNDED IN ACCIDENTS)
  src/
  ├── client/                  <-- Split by execution target (Browser)
  │   └── components/
  │       └── OrderCancelModal.tsx
  └── server/                  <-- Split by execution target (Node/OS)
      ├── controllers/         <-- Split by framework layer
      │   └── OrderController.ts
      ├── services/            <-- Split by framework layer
      │   └── OrderService.ts
      └── repositories/        <-- Split by framework layer
          └── OrderRepository.ts

```

In this traditional layout, the folder tree is a physical monument to accidental complexity:

- **client/ vs. server/** is an execution accident.
- **controllers/, services/, and repositories/** are framework accidents.
  When a product owner asks to modify how an order is canceled, a developer must open five files scattered across four distant folders. The unified human intent—_Order Cancellation_—has no physical home in the codebase. It has been pulverized and scattered across the filesystem.

### 2. Entities Without Referents: The Ghost Economy

Look closely at the standard enterprise stack: OrderController, OrderService, OrderManager, OrderDTO, OrderRepository.
Ask yourself a simple question: **Which of these entities corresponds to something in human perception?**

```
   HUMAN PERCEPTION                             FRAMEWORK LABYRINTH
┌──────────────────┐                       ┌─────────────────────────┐
│                  │                       │ OrderController         │
│  "Cancel Order"  │ ────────────────────► │   └── OrderService      │
│                  │                       │       └── OrderManager  │
│                  │                       │           └── OrderRepo │
└──────────────────┘                       └─────────────────────────┘
                                            (Four ghosts invented to
                                             deliver one intent)

```

Only the **Order** and its **Cancellation** exist in reality.

- The Controller exists solely because an HTTP framework needed an object to attach routing decorators to.
- The Service exists because object-oriented patterns forced functions to masquerade as classes.
- The Repository exists because we treat an external SQL database as if it were a load-bearing domain concept instead of a disk-backup detail.
  An entire global economy of frameworks (Spring, NestJS, Angular, Rails), bootcamps, and enterprise architectures exists solely to manage the administrative overhead of these fake entities. We have built multi-billion-dollar technology stacks to service machinery that has no referent in human thought.

### 3. Putting Accidents in Their Place

Restructuring does not mean throwing away databases, web servers, or UI frameworks. It means **demoting them from landlords to peripheral adapters**.
In a Substance-First Architecture, the directory tree is organized strictly around **Perceptual Identities**. The core of your software is a pure, synchronous, in-memory state machine. Frameworks, databases, and network protocols are pushed out to the absolute edge as swappable accidents.

```
  SUBSTANCE-FIRST TOPOLOGY (GROUNDED IN IDENTITY)
  src/
  └── order/                   <-- Pure Perceptual Identity
      ├── order.ts             <-- Pure State Machine (Zero dependencies)
      ├── order.test.ts        <-- Microsecond test suite
      └── adapters/            <-- Peripheral Execution Accidents
          ├── ui.tsx           <-- Rendered UI projection (React)
          ├── http.ts          <-- Network wire adapter (Express/REST/gRPC)
          └── db.ts            <-- Storage backup adapter (PostgreSQL)

```

If you replace React with Svelte, or swap Express for gRPC, **you touch only the files inside adapters/**. The core order.ts state machine does not recompile, move, or care.

### 4. The Precise Vocabulary of Liberation

When you adopt this framework, you stop arguing over personal style. You gain a precise, rigorous vocabulary to name and diagnose architectural pathologies:
| Vague "Clean Code" Debate | Grounded Metaphysical Vocabulary |
|---|---|
| _"This file feels too messy and long."_ | **Ungrounded Proliferation:** _"You have split a single perceptual identity into five fake classes (DTO, Controller, Service, Repo, Entity)."_ |
| _"I don't like how this project is structured."_ | **Topological Reification:** _"The directory tree is organized by execution targets (client/server) rather than human perceptual identities."_ |
| _"Why are we writing so much boilerplate?"_ | **Framework Landlordism:** _"We built an administrative middleman (Controller) to satisfy a framework instead of mapping intent directly to state."_ |
| _"This architecture is hard to maintain."_ | **Instant-Legacy:** _"By entangling pure state with SQL and HTTP abstractions, you created a system that resists change instead of remaining soft."_ |

### The Call to Arms

When you give developers these precise terms, you do not just give them better code habits—you liberate them.
You give them the tools to look at an over-engineered enterprise labyrinth and say, with complete clarity and authority:

> _"This is not sophisticated engineering. This is a monument built out of ungrounded accidents—and we are going to put the accidents back at the edge where they belong."_
