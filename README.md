# Conduit - Clean Code MVVM with React & TypeScript

Welcome! This implementation of the Conduit app adheres to Clean Code principles (by Bob Martin) and Dependency Injection (by Steven van Deursen).

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

- **Testable**: Ensure all components can be easily tested.
- **Scalable**: Design with scalability in mind.
- **Maintainable**: Follow SOLID principles for maintainability.
- **Dependency Inversion**: Use DI to defer decisions about tools and frameworks.
- **Outside-in Development**: Develop starting from the user interface (UI) and working inwards.
- **Test-Driven Development (TDD)**: Write tests before implementing functionality.

### Steps

#### Step 1: Designs

Convert designs from Figma to Storybook stories manually. As you update designs, use Large Language Models (LLMs) to adapt changes to existing component code.

#### Step 2: Storybook

Use Storybook to create and view component scenarios.

```bash
npm run storybook
```

#### Step 3: MVVM & TDD

Develop the application logic using the MVVM pattern and TDD. Write tests to define the model's behavior and ensure all logic is encapsulated in the ViewModel.

```js
// Example test
test('MyComponent renders correctly', () => {
  render(<MyComponent title="Test Title" />);
  expect(screen.getByText('Test Title')).toBeInTheDocument();
});
```

#### Step 4: Connecting to IO

Delay decisions about storage and other IO as long as possible to keep development flexible and adaptable.

```js
// Example service using DI
class ArticleService {
  constructor(private apiClient) {}

  async fetchArticles() {
    return this.apiClient.get('/articles');
  }
}
```

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