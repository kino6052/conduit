# Conduit - Clean Code MVVM with React & TypeScript

Welcome! This is an implementation of Conduit app that follows Clean Code (by Bob Martin) principles as well as Dependency Injection principles (by Steven van Deursen). 

## Getting started

> **Prerequisites:**
> The following steps require [NodeJS](https://nodejs.org/en/) to be installed on your system, so please
> install it beforehand if you haven't already.

To get started with your project, you'll first need to install the dependencies with:

```
npm install
```

## Storybook

After installing, you can view your storybook by running:

```
npm run storybook
```

After a few seconds, your storybook should be accessible at the address
[http://localhost:6006/](http://localhost:6006/)

You can build your storybook for release with:

```
npm run build-storybook
```

## In-depth

In an article series I wrote about legacy-proof UI development, I shared some insights regarding why UI projects tend to become instant legacy.

Everything was boiled down to two core needs: instant feedback and proper design patterns. Where, in terms of design patterns, the requirement for hard separation between view and logic was emphasized.

I even suggested that Elm MVU was a way to go.

However, despite MVU being an architecture that allows for the hard separation of view and logic, I have become convinced that MVU (and functional programming for that matter) suffers from being somewhat alien to a "natural" process of thinking and programming.

By the word "natural", I mean something that correlates to the language we use in everyday life. Because functional programming can't always be described via such a language (e.g. despite monads (including Observable streams) being a relatively simple term, you won't be able to express it in such a language). I became convinced that programming that would better correlate to natural language is multiparadigm programming, where things are not strictly OOP and not strictly functional, but one or the other depending on clarity and the ease to work with.

Therefore programming of the core of the application (the model/domain layer) isn't really about right or wrong, the model behind an application is a description of how a person who wrote it understands the program conceptually, and it's better be one person or a group who is on the same conceptual page.

I demonstrate a process of building an application that will have the necessary components of good architecture (according to Uncle Bob Martin) with some extra ones that I personally find valuable:

- General
  - Testable
  - Scalable
  - Maintainable
  - Follows SOLID
  - Communicates conceptual understanding of the creator
- Details
	- Dependency Inversion
		- Allows to postpone decisions of which tools to use
			- Framework agnostic
			- Allows to optimize for performance, security and the rest at later stages of development
		- Design as a single source of truth for the view layer 
- Development process
  - Outside-in
  - TDD

But enough of philosophizing, let's dive into the paraphernalia. Shall we?

### Development

I will demonstrate a process of creating an application in a outside-in fashion. Where the ultimate source of truth is the design in Figma. 

We will then create a pure view as a function of state. It will not have any logic or state (other than a few details like scrolling unrelated to the domain logic).

The logic will be created in an OOP manner as a composition of classes via DI in a composition root. This will allow us to postpone details like the choice of storage and possibly some other details.

The Model will be connected to the view using a mapping function similar to ViewModel. It will have the necessary functionality to represent the view, but will not know anything about the details of the view (like library used or DOM etc.)

Having this ViewModel will allow us to write the application in a TDD fashion not worrying about complex view libraries/framework runtimes and even allowing us to swap the library.

Because both the Model as well as ViewModel will be pure JS Objects (like POJOs), they should also be easily convertible to other languages.

It is important to remember that this approach is all about writing legacy-proof apps (legacy-proof = adaptable to change = scalable), which we argued require an instant feedback (via Storybook and black-box tests in Jest for example) and good design patterns, which in our case is MVVM and DI.

#### Step 1: Designs
Here I explain how designs will be converted to Storybook stories. 

Since the tools for conversion are still far from perfect, we should rely on ourselves to implement components for the first time. However, as we change something in designs, we can ask LLMs to adapt the changes to what we already have in the component code. This is possible because components, when implemented correctly, tend to be rather small and easily understood by LLMs.

#### Step 2: Storybook
Once we convert designs to Storybook we can use the components to represent scenarios by putting together sequences of pre-setup pages (with certain props), and since we know what props need to happen in transition given certain user interactions we are preparing ourselves for writing black-box tests.

#### Step 3: MVVM & TDD
As we write our tests, we implement the domain logic. This step isn't really about right or wrong, the model behind an application is a description of how a person who wrote it understands the program conceptually, and it's better be one person or a group who is on the same conceptual page. 

So we will always have an opportunity to refactor as long as tests pass.

#### Step 4: Connecting to IO

The last and the coolest part will be the ability to delay very hard decision about technology for storage and other IO as far into the future as possible, thus allowing us to keep our pace and implement features, while knowing that we still have time make an educated decision based on our app and stakeholder needs.

__Pros & Cons__
	- Pros
		○ Legacy-proof
		○ Easy-to-learn
			§ This approach builds on top of a lot of established practices like OOP, MVVM and Component Composition
		○ Natural programming style
	- Cons
		○ Requires you to form a coherent conceptual understanding of your application
			§ You will have to doubt, rethink and refactor
			§ There is no set algorithm for creating model, you will have to experiment until it fits your needs
		○ Simplify and optimize model
			§ While View and IO could be optimized separately,
			§ It requires you to make sure your model is as simple as possible

### Conclusion

This article was a demonstration of how applications can be writing so they are kept legacy-proof and are adaptable to change as true software should be (software means that it is soft or malleable and adaptable to changes).

This is a refreshing view on UI development as modern UI is always 100% tied to a particular framework, but as this article suggests that it should be the case and in fact not marrying it to a framework makes the code look much simpler.
