# Empirically Grounded App with React & TypeScript

[codebase.show](https://codebase.show/projects/realworld)

Welcome! This implementation of the Conduit app that follows Empirically Grounded Software principles adheres to Clean Code principles (by Bob Martin) and Dependency Injection (by Steven van Deursen).

## Getting Started

> **Prerequisite:** Install [NodeJS](https://nodejs.org/en/) on your system.

To install dependencies:

```bash
npm install
```

## Storybook

To view your Storybook:

```bash
npm run storybook
```

Storybook will be accessible at [http://localhost:6006/](http://localhost:6006/).

To build Storybook for release:

```bash
npm run build-storybook
```

## Development Approach

### Key Principles

- **Essence Preserving**: Ensures that the essence is preserved
- **Empirically Grounded**: Entities are meaningful and perceivable, and are the source of truth
- **Testable**: Ensure all components can be easily tested.
- **Scalable**: Design with scalability in mind.
- **Maintainable**: Follow SOLID principles for maintainability.
- **Dependency Inversion**: Use DI to defer decisions about tools and frameworks.
- **Outside-in Development**: Develop starting from the user interface (UI) and working inwards.
- **Test-Driven Development (TDD)**: Write tests before implementing functionality.

### Steps

#### Step 1: Capture the essence as minimal necessary and sufficient (essential) visual representation

Create a minimal representation of what the app is.
If something can be removed without altering what the app is - it is not its essence, it is its "accident" - something that could be removed without altering the identity.

For example: the app needs to show list of articles with titles - without it the app isn't an app about sharing and discovering articles. Login form, however, can be removed entirely without altering the essence. Somebody might argue - but without login you can't have users, users are essence of the app - yes and no - we are building with grounding in the screen - from the screen reference frame we don't care how users are logged in or handled or even if they exist. The app identity is preservedwe care about ability to read and write articles and interact with them. That is the essence. Profile change is not part of the apps essence either - because if you can't change user name the app identity is preserved.

Capture the essence as a thorough living check list.

#### Step 2: Convert this essence to state

Create an object that will represent the perceivable essence of the app.

#### Step 3: MVVM & TDD

Develop the essential version of the application logic using the MVVM pattern and TDD. Write tests to define the model's behavior and ensure all logic is encapsulated in the ViewModel.

```js
// Example test
it("should navigate to user profile", async () => {
  const props = mapStateToProps(state);
  (props as TAppProps<EPage.Home>).posts[0].onClick?.();
  await checkEventual((state) => state.page === 'article', PropsSubject);
  expect(props.page.title).toMatchInlineSnapshot(`"Article"`);
});
```

#### Step 4: Connecting to IO

create an extended version of mapStateToProps that takes dependencies.

Delay decisions about storage and other IO as long as possible to keep development flexible and adaptable.
Define the essence of dependendencies (their essence is capture in interfaces). Develop and connect those essential representations in the composition root of the app.

Use TDD to develop them

#### Step 5: Capture non-essential features of the app and add them

Keep your essential representation separate from the full non-essential app

Non-essential app extends the implementations of the essential part

Write those non-essential part in TDD fashion but no need to compose all dependencies, non-essential parts can be developed in isolation from the rest

### Pros & Cons

**Pros:**

- Legacy-proof and adaptable.
- Builds on established practices like OOP, MVVM, and Component Composition.
- Encourages a natural programming style.

**Cons:**

- Requires a coherent conceptual understanding of the application.
- Necessitates ongoing refactoring and optimization.

## Conclusion

This approach ensures your applications are adaptable and maintainable, avoiding the pitfalls of being tied to specific frameworks. By adhering to these principles, you can develop scalable and testable applications that stand the test of time.
