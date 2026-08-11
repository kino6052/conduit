// THE COMPOSITION ROOT -- docs/code-example.md's shape: an RxJS
// BehaviorSubject as the store, getState/setState closing over it, a
// useSharedState hook wiring the store into React, and an App component
// assembled from compileFeedViewModel + Feed. This is where essence
// (src/essence), the view-model compiler, and the view components all
// finally meet -- nowhere else in this tree do they know about each other.

import React, { useEffect, useState } from "react";
import { BehaviorSubject, skip } from "rxjs";
import { createInitialState, TState } from "../essence/state";
import { compileFeedViewModel } from "./view-model";
import { Feed } from "./components";

export function createCompositionRoot() {
  const store = new BehaviorSubject<TState>(createInitialState());

  const getState = (): TState => store.getValue();
  const setState = (next: TState): void => store.next(next);

  function useSharedState(): TState {
    const [value, setReactState] = useState(store.getValue());
    useEffect(() => {
      const subscription = store.pipe(skip(1)).subscribe((next) => setReactState(next));
      return () => subscription.unsubscribe();
    }, []);
    return value;
  }

  return function App() {
    const state = useSharedState();
    const viewModel = compileFeedViewModel(state, getState, setState);
    return React.createElement(Feed, viewModel);
  };
}

export default createCompositionRoot();
