---
title: THE METAPHYSICS OF CODE - USE CASE - TIC TAC TOE (DRAFT)
subtitle: A Post-Mortem of Tic-Tac-Toe Through the Lens of Empirical Software
date: 2025-02-21
layout: post.html # reference to a layout file
tags: all; code / architecture; code / metaphysics; draft;
---

## Introduction: The Canonical Case Study

Every field has its canonical example. In software, Tic-Tac-Toe serves as the "Hello World" of interactive applications—the rite of passage that every developer completes, usually within their first week of learning React. The official React tutorial presents a complete implementation: state managed with hooks, logic embedded in components, and a game that works perfectly.

But like the architectural "temple of decoration" described in the Empirical Software Manifesto, the default implementation contains a foundational error so deeply concealed by its apparent simplicity that generations of developers have replicated it without question. The error is this: **the logic of the game has been bound to the machinery of its presentation, and the concepts of the code have been allowed to drift from their empirical anchors.**

What follows is a philosophical and structural examination of a deliberately refactored Tic-Tac-Toe implementation—one that embodies the principles of Empirical Software and serves as a working demonstration of the metaphysics outlined in _The Metaphysics of Code_. This is not a tutorial. It is an autopsy of an architecture, conducted to reveal what most codebases conceal: **the ghost of reification dressed in the robes of best practice.**

---

## Part I: The Default Framework and Its Hidden Bugs

### The Received Implementation

In the canonical React implementation, the `Game` component manages state via `useState`, defines `handleClick` and `jumpTo` functions inline, and passes props down to `Board` and `Square`. The logic for calculating winners, making moves, and managing history is intertwined with the rendering code. Everything lives in one file—or at most, two.

This works. It ships. The CEO is happy.

But consider what this architecture communicates to the developer who inherits it. The state, the logic, and the UI are presented as a single, indivisible phenomenon. The `Board` _is_ the game. The `Square` _is_ the move. The `useState` hook _is_ the history.

This is reification in its purest form: an abstract concept—"the game state"—has been treated as a physical thing that exists in the wild, with properties and behaviors that are inseparable from the React runtime. The mental model becomes: "I am building a React component called `Game`, and inside it lives the game."

### What the Default Framework Hides

Berkeley's critique of abstraction was not a philosophical exercise—it was a diagnostic tool for identifying the precise point at which concepts detach from experience and become ghosts. Applied to React Tic-Tac-Toe, the diagnosis is devastating:

The `handleClick` function does not correspond to anything a user perceives. The user does not "handle a click." The user presses a square. The `jumpTo` function does not exist in the user's experience. The user moves backward through history. The `useState` hook has no empirical correspondent—it is machinery, not meaning.

These are not merely naming issues. They are category errors that propagate throughout the codebase. When a new developer reads `handleClick`, they are forced to perform a translation: "handleClick" means "the user pressed a square, which should update the board, which may win or draw, unless it's already over..." The name does not point to the behavior. It points to the implementation. The code has become a map of its own internal logic rather than a map of what the user experiences.

The result is cognitive friction. Every addition to the codebase—persistence, undo, multiplayer—requires adding more machinery that must be understood through the lens of the machinery that already exists. The complexity compounds not because the game is complex, but because the architecture has mistaken its own structures for the problem domain.

---

## Part II: The Inversion—Empirically Grounded Tic-Tac-Toe

### The Core: Logic as a Pure Mathematical Transformation

In the refactored implementation, the game's logic is extracted into a set of pure functions:

```typescript
export function calculateWinner(matrix: TBoardMatrix): string | null;
export function getStatus(matrix: TBoardMatrix, xIsNext: boolean): string;
export function makeMove(
  matrix: TBoardMatrix,
  row: number,
  col: number,
  xIsNext: boolean,
): TBoardMatrix | null;
```

These functions are deterministic, synchronous, and dependency-free. They are not React components. They are not hooks. They are not classes. They are mathematical transformations that map inputs to outputs with no side effects.

Importantly, they operate on the simplest possible data structures: a `TBoardMatrix` is a 2D array of strings or nulls. There are no `Game` objects, no `Board` classes, no `Move` factories. The ontology is flat and transparent. Everything corresponds directly to what can be seen: `calculateWinner` looks at the board and returns an X, O, or null. `getStatus` reads the board and returns a string that will appear on the screen.

**This is the antidote to reification.** By refusing to create entities that have no visual correspondent, the core logic remains anchored in perception. The developer can point to any line of code and say: "This affects what the user sees on the screen in exactly this way."

### The Rule of Screen Referent Justification

The Empirical Software framework introduces a single, operational rule for determining whether a concept is legitimate:

**Every concept in the code must either:**

1. **Have a direct screen referent** (the user can point to it), OR
2. **Explain its route to a screen referent and justify the necessity of the abstraction.**

This rule is not a naming convention. It is a **constraint on the creation of concepts**. When a developer cannot point to the screen and say "this concept corresponds to _that_," they are forced to:

1. Question the abstraction: Do I really need this?
2. Justify the abstraction: Why is this necessary for testing or structure?
3. Document the route: How does this connect to what the user sees?

The result is that concepts are not created until they are absolutely necessary, and when they are created, they are transparently connected to the user's experience.

### The Screen Referent Audit

Let's audit every concept in the refactored codebase:

#### ✅ Pass: Direct Screen Referent

| Concept                | Screen Referent                                       |
| ---------------------- | ----------------------------------------------------- |
| `TBoardMatrix`         | The grid of 9 squares                                 |
| `currentMove`          | The highlighted move in the history list              |
| `calculateWinner`      | The status text "Winner: X" or "Winner: O"            |
| `getStatus`            | The status text: "Next player: X", "Draw", etc.       |
| `makeMove`             | An X or O appearing in a square                       |
| `onSquareClick`        | The physical interaction of clicking a square         |
| `onJumpToMove`         | The physical interaction of clicking a history button |
| `TGameViewModel`       | The complete visible Game component                   |
| `title` (in ViewModel) | The status text at the top                            |
| `boardProps`           | The board with 9 squares                              |
| `moveButtonProps`      | The list of history buttons                           |
| `Square` component     | A square on the screen                                |
| `Board` component      | The 3x3 grid                                          |
| `Game` component       | The entire game UI                                    |

#### ⚠️ Pass: Route to Screen + Justification

| Concept                              | Route to Screen                                                     | Justification                                                                                  |
| ------------------------------------ | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `compileGameViewModel`               | Produces the ViewModel that maps to the Game UI                     | Enables pure testing without React                                                             |
| `TGameState`                         | Bundles boards (visible history) and currentMove (highlighted move) | Organizes data needed to produce the ViewModel                                                 |
| `runGame`                            | Bootstraps the infrastructure that renders the Game                 | Necessary entry point; contains no business logic                                              |
| `BehaviorSubject` / `useSharedState` | Tools that express the game's state in words                        | State is the description of what the user sees; these are the machinery that holds those words |

#### ❌ Ghosts: Concepts Without Screen Referents

In a strictly Empirical codebase, these concepts would be rejected:

| Ghost            | Why It's a Ghost                       | Alternative                                          |
| ---------------- | -------------------------------------- | ---------------------------------------------------- |
| `GameController` | No screen referent, no justification   | The pure functions are the controller                |
| `GameService`    | No screen referent, no justification   | The pure functions are the service                   |
| `MoveFactory`    | No screen referent, no justification   | Just call `makeMove` with parameters                 |
| `HistoryManager` | No screen referent, no justification   | The state management already handles history         |
| `handleClick`    | Does not point to a screen interaction | `onSquareClick` maps directly to the physical action |
| `jumpTo`         | Does not point to a screen interaction | `onJumpToMove` maps directly to the physical action  |

### The ViewModel: The Empirical Ground Truth

The `compileGameViewModel` function bridges the gap between the pure logic and the presentation:

```typescript
export function compileGameViewModel(
  state: TGameState,
  getState: TGetState,
  setState: TSetState,
): TGameViewModel;
```

This function does not render anything. It does not know about React, the DOM, or any presentation technology. It takes the current state and the state management interface and produces a plain JavaScript object that contains everything needed to display the game.

The crucial insight is that `compileGameViewModel` is the _only_ place where the abstract state of the game is translated into perceivable primitives. The `title` is a string that will appear as text. The `boardProps` are a matrix of squares, each with a value (text) and an `onClick` handler (the behavior). The `moveButtonProps` are a list of buttons with descriptions (text) and `onClick` handlers.

Every property of the ViewModel points to something that the user can see or do. There are no `GameStatus` enums, no `BoardState` objects, no abstract concepts that require interpretation. The mapping from state to perception is direct and transparent.

### The Actions: Handlers That Mirror Physical Interaction

The action handlers—`onSquareClick` and `onJumpToMove`—are defined as pure functions that operate on a state interface:

```typescript
export const onSquareClick = (
  row: number,
  col: number,
  getState: TGetState,
  setState: TSetState,
): void => {
  /* ... */
};

export const onJumpToMove = (
  moveIndex: number,
  getState: TGetState,
  setState: TSetState,
): void => {
  /* ... */
};
```

Notice the naming: `onSquareClick` corresponds to the physical interaction of clicking a square. `onJumpToMove` corresponds to the physical interaction of clicking a history button. These names do not describe the implementation—they describe the user's behavior. The code is written from the perspective of what the user perceives, not how the machinery works.

The handlers receive the physical coordinates of the interaction—`row` and `col` for the square, `moveIndex` for the history button. They retrieve the current state, call the pure functions, and update the state. The `setState` function is passed in as a parameter, making the handler completely decoupled from any particular state management implementation.

**This is Dependency Inversion in its purest form.** The handler depends on an abstraction (`(state) => void`) rather than a concrete implementation. It can be tested with a simple mock that records the state updates.

### The View: A Peripheral Projection

The React components—`Square`, `Board`, `Game`—are pure presentational components. They do not manage state. They do not define logic. They receive props and render elements. The `Game` component receives a `TGameViewModel` and renders it as a DOM tree.

The key architectural decision is that the React components are treated as a _projection_ of the ViewModel, not as the source of truth for the application's state. The `Game` component does not know about `useState`, `useEffect`, or any hooks. It is a pure function of its props.

The composition root—renamed to `runGame` to better reflect its screen referent—creates the state management machinery, defines the `getState`/`setState` functions, and wires everything together:

```typescript
export function runGame() {
  const store = new BehaviorSubject<TGameState>(INITIAL_STATE);
  // ...
  return function App() {
    const state = useSharedState();
    const viewModel = compileGameViewModel(state, getState, setState);
    return React.createElement(Game, viewModel);
  };
}
```

The React runtime is invoked at the absolute periphery of the application. The `App` component does not define the logic—it _consumes_ the logic that was defined elsewhere. The `Game` component does not know it is being rendered by React. It is a pure function that happens to return React elements because that is the projection layer in use.

### The State Container: An Infrastructure Detail

The state is managed by a `BehaviorSubject` from RxJS—a choice that is completely invisible to the core logic. The `getState` and `setState` functions isolate the core from the details of the state management implementation.

The `useSharedState` hook exists solely to bridge the reactive state container to the React rendering cycle. These tools do not have screen referents themselves—but they are machinery that holds the "words" that describe what the user sees. They are justified because they enable state to be expressed, tested, and rendered.

---

## Part III: The Philosophical Implications

### The Three Triumvirates of Failure, Examined

#### 1. Reification

The canonical implementation reifies the concept of a "game" as a React component. The refactored implementation treats the game as a mathematical transformation—a set of pure functions that operate on data structures. The `Game` component is not the game. It is a projection of the game. The `handleClick` function is not the game. It is a translator between physical interactions and state transitions.

The refactoring systematically eliminates reification by:

- Defining the core logic in terms of data transformations rather than objects with identity
- Exposing the ViewModel as a plain object that mirrors the user's perception
- Treating the UI as a projection rather than a source of truth
- Naming actions after physical interactions rather than implementation events
- Applying the Rule of Screen Referent Justification to every concept

#### 2. Metaphysics

The canonical implementation operates on a metaphysics of "components," "hooks," and "effects." These concepts are not grounded in user perception. They are internal to the framework. The refactored implementation grounds every concept in what the user sees: squares, moves, status text.

The `compileGameViewModel` function is a metaphysical exorcism. It takes the abstract state of the game and translates it into the concrete, perceivable elements that will appear on the screen. There is no intermediary ontology. The state exists only as data, and the ViewModel exists only as a description of what the user will see.

#### 3. The Obsession with Details

The canonical implementation—and the framework it depends on—is an obsession with details. Which rendering library? Which hooks? Which state management pattern? The refactored implementation postpones these decisions as far as possible. The core logic is independent of React. The ViewModel is independent of React. Only the peripheral view layer and the composition root contain framework-specific code.

The physical file structure follows the same principle. The core logic, the ViewModel compiler, and the composition root are clearly separated. The presentation components are isolated in their own file. The state management is initialized at the composition root. The architecture is not defined by file organization—the file organization reflects the architecture.

### The Toy Representation and Its Power

The refactored implementation reveals something profound: the game, in its essence, is incredibly simple. The core logic is approximately 50 lines of pure functions. The ViewModel compiler is about 30 lines. The entire complexity of the application—the game logic, the history management, the state transitions—is contained in a handful of pure, testable functions.

The rest—the React components, the state container, the subscription management—is machinery. It is necessary machinery, to be sure, but it is peripheral. It serves the core. The core does not serve it.

This "toy representation" is the ultimate goal of Empirical Software. The software becomes soft because its core is simple, its behavior is predictable, and its dependencies are minimal. The codebase can be understood in its entirety by reading a few files. Changes can be made with confidence because the behavior is well-defined and tested.

### The Role of AI: Validation, Not Generation

In the context of this architecture, AI becomes a powerful tool for validation rather than generation. Because the core logic is pure, deterministic, and synchronous, the AI can:

- Generate exhaustive test cases based on the behavior defined in the ViewModel
- Verify that every state transition corresponds to a perceivable change
- Detect reification—naming that has no visual correspondent
- Ensure that the interface contracts (the `getState`/`setState` functions) are correctly implemented
- Enforce the Rule of Screen Referent Justification: reject any concept that cannot be traced to the screen

The AI is not used to generate large, speculative abstractions. It is used to enforce the principles of Empirical Software: grounding, softness, and the elimination of reification. The engineer remains the master of the idea; the AI ensures the shield never cracks.

### Testability and the Feedback Loop

The refactored implementation excels at testability because the core logic is isolated from infrastructure. The following can be tested completely in-memory, without a browser, without React, without a network:

- `calculateWinner` - pure function, trivial to test
- `makeMove` - pure function, trivial to test
- `getStatus` - pure function, trivial to test
- `compileGameViewModel` - given a state, returns a predictable ViewModel
- `onSquareClick` - given a state and a clicked square, produces the correct state update
- `onJumpToMove` - given a state and a move index, produces the correct state update

The feedback loop is immediate. Every change to the core logic can be verified in milliseconds. Changes to the ViewModel compiler can be verified against the ViewModel contract. Changes to the presentation layer are limited to the view layer and can be verified visually or through automated tests against the ViewModel.

The heavy CI/CD pipelines that plague modern development teams become unnecessary because the architecture itself provides fast, reliable feedback. The vampire pipelines—the expensive, latency-inducing CI/CD systems that teams build to compensate for architectural brittleness—are eliminated.

---

## Part IV: The Practical Path Forward

### Adopting the Philosophy Without a Big Bang

The skeptical engineer's question is valid: How does a team adopt this philosophy without a costly rewrite? The answer is incremental extraction:

**First Step: Extract the Pure Logic**
Take the canonical implementation and extract the pure functions—`calculateWinner`, `getStatus`, `makeMove`—into a separate file. Test them in isolation. Notice that the component code becomes simpler and more predictable.

**Second Step: Define the ViewModel Contract**
Create a `compileGameViewModel` function that takes the state and returns a plain object describing what should be rendered. The component consumes this ViewModel and renders it. The component no longer defines the logic—it projects the ViewModel.

**Third Step: Extract the Actions**
Move the `handleClick` and `jumpTo` functions into pure functions that take `getState` and `setState` as parameters. The component calls these functions with the state interface, becoming a thin wrapper over the logic.

**Fourth Step: Decouple the State Management**
Replace the `useState` with a state management abstraction that is initialized at the composition root. The component receives `getState` and `setState` as props, or subscribes to the state through a hook.

**Fifth Step: Parallelize the UI**
Build the Minimal Necessary UI—the MS Paint version—against the ViewModel. Use this as the foundation for development while the design team iterates on the Target UI in parallel. The design team can work independently because the contract is stable.

Each step is a small, low-risk change that immediately improves the architecture. The team gains confidence as they see the code becoming cleaner, more testable, and more predictable. The philosophy spreads organically, not through mandate but through demonstrated value.

### The AI-Assisted Migration

Given the current state of AI, the migration can be accelerated significantly. The AI can:

- Generate the pure function equivalents for existing logic
- Create the ViewModel types based on the component's props
- Refactor the component to consume the ViewModel
- Generate tests for the pure logic and the ViewModel compiler
- Identify reification in the naming and suggest corrections
- Enforce the Rule of Screen Referent Justification

The engineer works with the AI as a collaborator, validating each step and ensuring that the architecture remains grounded. The AI is not a replacement for the engineer—it is a tool that accelerates the realization of the philosophy.

---

## Part V: The Falsifiability of the Approach

The Empirical Software Manifesto includes a crucial section on falsifiability—the specific conditions that would disprove the claims. Applied to the Tic-Tac-Toe example, the claims are clear:

**Claim 1: Extracting the pure logic improves maintainability.**  
_Falsification:_ A team that extracts the pure logic but finds that changes are harder to make, tests are more brittle, or onboarding is slower. If the extracted logic does not provide the claimed benefits, the approach is weakened.

**Claim 2: The ViewModel contract enables parallel development.**  
_Falsification:_ A team that creates a ViewModel but finds that the UI team and the logic team are still blocked by each other's changes. If the ViewModel does not provide stable enough abstraction for independent work, the claim is refuted.

**Claim 3: The state management abstraction eliminates framework coupling.**  
_Falsification:_ A team that replaces React with another UI framework and finds that the migration requires significant changes to the ViewModel or the core logic. If the abstraction is not sufficiently decoupled, the claim is disproven.

**Claim 4: The synchronous, in-memory execution model provides faster feedback.**  
_Falsification:_ A team that runs the application entirely in-memory but finds that the feedback loop is still slow due to the amount of logic, the complexity of the ViewModel, or the overhead of the testing framework. If the feedback is not actually faster, the claim is refuted.

**Claim 5: The Rule of Screen Referent Justification reduces reification.**  
_Falsification:_ A team that applies the rule but finds that their codebase still contains abstractions with no screen referent, or that the rule forces them to create awkward justifications that don't actually improve the code. If the rule does not reduce reification, the claim is weakened.

The absence of these counterexamples—the fact that teams consistently find the approach beneficial—is evidence for the validity of the philosophy.

---

## Part VI: The Deeper Implication

### What This Philosophy Actually Changes

The Rule of Screen Referent Justification is not a minor stylistic preference. It fundamentally changes how software is developed:

**Before Empirical Software:**  
The team gathers requirements, builds a conceptual model (DDD), designs the architecture (Clean Architecture), chooses patterns (CQRS, Event Sourcing), and then—finally—implements the UI that the user will see. The UI is the last thing built, and it is the least important thing in the architecture. It is a "view" of the "domain."

**After Empirical Software:**  
The team starts with what the user will see. The UI is the first thing designed, and it is the most important thing in the architecture. Everything else—the logic, the state, the infrastructure—exists to serve the UI. The core logic is a mathematical transformation that produces the UI's state. The infrastructure is machinery that enables the UI to be delivered.

This inversion is not just a change in order. It is a change in **which concepts are allowed to exist**. Concepts that cannot be pointed to on the screen are either eliminated or justified through a clear route to the screen. Concepts that can be pointed to on the screen become the load-bearing structures of the architecture.

### The Labyrinth Versus the Toy

The labyrinth is the natural state of a codebase where concepts have been allowed to drift from their empirical anchors. Every layer of abstraction is a wall. Every reification is a dead end. The developer navigates by memory, not by understanding.

The toy is the natural state of a codebase where every concept is grounded in perception. The code is simple because it mirrors what the user sees. The developer understands the code by looking at the screen. The architecture is transparent because it follows from behavior, not from a conceptual model that must be learned before any code can be read.

The goal of Empirical Software is to reduce every system to a toy—a representation so simple that it can be understood in its entirety by looking at the screen and reading the code that produces it.

---

## Part VII: The Closing Argument

### The Toy That Reveals the Cathedral

Tic-Tac-Toe is a toy. It is intentionally simple. But the architecture of a toy is not trivial—it is a microcosm of the architecture of any software system, regardless of its scale. The principles that govern the refactored implementation—grounding in perception, elimination of reification, separation of logic from presentation, composition over inheritance, dependency inversion—are the same principles that govern the architecture of systems with millions of users.

The "toy representation" is not a limitation. It is a feature. The ability to reduce a system to its essence—to strip away the details and see what it actually does—is the ultimate test of architectural integrity. A system that cannot be represented as a toy is a system that has been contaminated by its own machinery.

The architecture described in this examination is not new. It draws on principles that have been understood for decades—pure functions, hexagonal architecture, clean architecture, dependency inversion. What is new is the application of these principles with radical consistency and the explicit grounding in philosophical empiricism. The result is software that remains soft, that can be understood, that can be tested, and that can change without breaking.

### The Litmus Test

Take any user-facing behavior in your current codebase. Add an extra input field or change the success condition. If Version A (the direct logic) requires one clean edit, but Version B (the decorated stack) requires you to touch a page object, an abstract registry, a factory, and an infrastructure configuration file, your abstractions are not paying rent. They are a tax on change.

The refactored Tic-Tac-Toe implementation passes the litmus test. The core logic is one edit. The ViewModel is one edit. The presentation layer updates automatically. The machinery is not a tax—it is a service.

### The Final Challenge

Go through your codebase and name one concept that cannot be pointed to on the screen and cannot be justified through a clear route to the screen. If you cannot, your code is grounded. If you can, you have found a ghost—and ghosts are the source of the labyrinth.

The toy reveals the cathedral. The cathedral, when stripped of its decoration, is just a toy.

---

_This article was developed through a dialogue between a software engineer and an AI, exploring the principles of Empirical Software through a specific implementation of Tic-Tac-Toe. The philosophy expressed here is derived from "The Metaphysics of Code" and the "Empirical Software Manifesto"—works that argue for grounding software architecture in perception, eliminating reification, and treating infrastructure as a peripheral concern. The code discussed is available in the accompanying repository._

```
import React, { useState, useEffect } from "react";
import { BehaviorSubject } from "rxjs";
import { skip } from "rxjs/operators";

// ==========================================
// 1. Data Structures & Types
// ==========================================
export type TBoardMatrix = (string | null)[][];

export type TGameState = {
  boards: TBoardMatrix[];
  currentMove: number;
};

export type TSquareProps = {
  value: string | null;
  onClick: () => void;
};

export type TBoardProps = {
  status: string;
  squareProps: TSquareProps[][];
};

export type TMoveButtonProps = {
  description: string;
  onClick: () => void;
};

export type TGameViewModel = {
  title: string;
  boardProps: TBoardProps;
  moveButtonProps: TMoveButtonProps[];
};

type TGetState = () => TGameState;
type TSetState = (next: TGameState) => void;

// ==========================================
// 2. Pure Logic & Actions
// ==========================================
export function calculateWinner(matrix: TBoardMatrix): string | null {
  const flat = matrix.flat();
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (flat[a] && flat[a] === flat[b] && flat[a] === flat[c]) return flat[a];
  }
  return null;
}

export function getStatus(matrix: TBoardMatrix, xIsNext: boolean): string {
  const winner = calculateWinner(matrix);
  if (winner) return `Winner: ${winner}`;
  if (matrix.flat().every(Boolean)) return "Draw";
  return `Next player: ${xIsNext ? "X" : "O"}`;
}

export function makeMove(
  matrix: TBoardMatrix,
  row: number,
  col: number,
  xIsNext: boolean
): TBoardMatrix | null {
  if (calculateWinner(matrix) || matrix[row][col]) return null;
  const nextMatrix = matrix.map((r) => [...r]);
  nextMatrix[row][col] = xIsNext ? "X" : "O";
  return nextMatrix;
}

// Global, un-nested action runners (Bound inside composition root)
export const onSquareClick = (
  row: number,
  col: number,
  getState: TGetState,
  setState: TSetState
): void => {
  const { boards, currentMove } = getState();
  const xIsNext = currentMove % 2 === 0;
  const nextMatrix = makeMove(boards[currentMove], row, col, xIsNext);

  if (nextMatrix) {
    const nextBoards = [...boards.slice(0, currentMove + 1), nextMatrix];
    setState({ boards: nextBoards, currentMove: nextBoards.length - 1 });
  }
};

export const onJumpToMove = (
  moveIndex: number,
  getState: TGetState,
  setState: TSetState
): void => {
  setState({ ...getState(), currentMove: moveIndex });
};

// ==========================================
// 3. View Model Compiler
// ==========================================
export function compileGameViewModel(
  state: TGameState,
  getState: TGetState,
  setState: TSetState
): TGameViewModel {
  const { boards, currentMove } = state;
  const currentMatrix = boards[currentMove];
  const statusStr = getStatus(currentMatrix, currentMove % 2 === 0);

  return {
    title: statusStr,
    boardProps: {
      status: statusStr,
      squareProps: currentMatrix.map((rowArr, rowIndex) =>
        rowArr.map((cellValue, colIndex) => ({
          value: cellValue,
          onClick: () => onSquareClick(rowIndex, colIndex, getState, setState),
        }))
      ),
    },
    moveButtonProps: boards.map((_, moveIndex) => ({
      description:
        moveIndex === 0 ? "Go to game start" : `Go to move #${moveIndex}`,
      onClick: () => onJumpToMove(moveIndex, getState, setState),
    })),
  };
}

// ==========================================
// 4. Pure Presentational View Components
// ==========================================
function Square(props: TSquareProps) {
  return React.createElement(
    "button",
    { className: "square", onClick: props.onClick },
    props.value
  );
}

function Board(props: TBoardProps) {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement("div", { className: "status" }, props.status),
    ...props.squareProps.map((row, rowIndex) =>
      React.createElement(
        "div",
        { key: rowIndex, className: "board-row" },
        row.map((colProps, colIndex) =>
          React.createElement(Square, { key: colIndex, ...colProps })
        )
      )
    )
  );
}

function Game(props: TGameViewModel) {
  return React.createElement(
    "div",
    { className: "game-container" },
    React.createElement("h1", null, props.title),
    React.createElement(
      "div",
      { className: "game" },
      React.createElement(
        "div",
        { className: "game-board" },
        React.createElement(Board, props.boardProps)
      ),
      React.createElement(
        "div",
        { className: "game-info" },
        React.createElement(
          "ol",
          null,
          ...props.moveButtonProps.map((btnProps, idx) =>
            React.createElement(
              "li",
              { key: idx },
              React.createElement(
                "button",
                { onClick: btnProps.onClick },
                btnProps.description
              )
            )
          )
        )
      )
    )
  );
}

// ==========================================
// 5. THE COMPOSITION ROOT
// ==========================================

// Explicit structural configuration isolated from runtime framework components
const INITIAL_STATE: TGameState = {
  boards: [
    [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
  ],
  currentMove: 0,
};

// Orchestrator function constructing dependencies & providing the reactive wiring
export function createCompositionRoot() {
  const store = new BehaviorSubject<TGameState>(INITIAL_STATE);

  const getState: TGetState = () => store.getValue();
  const setState: TSetState = (next) => store.next(next);

  // Reusable framework wiring wrapper
  function useSharedState(): TGameState {
    const [value, setReactState] = useState(store.getValue());
    useEffect(() => {
      const sub = store.pipe(skip(1)).subscribe((s) => setReactState(s));
      return () => sub.unsubscribe();
    }, []);
    return value;
  }

  // Returns the operational App Component wired to the isolated infrastructure
  return function App() {
    const state = useSharedState();
    const viewModel = compileGameViewModel(state, getState, setState);

    return React.createElement(Game, viewModel);
  };
}

// Assembly execution
export default createCompositionRoot();
```
