```ts
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
  xIsNext: boolean,
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
  setState: TSetState,
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
  setState: TSetState,
): void => {
  setState({ ...getState(), currentMove: moveIndex });
};

// ==========================================
// 3. View Model Compiler
// ==========================================
export function compileGameViewModel(
  state: TGameState,
  getState: TGetState,
  setState: TSetState,
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
        })),
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
    props.value,
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
          React.createElement(Square, { key: colIndex, ...colProps }),
        ),
      ),
    ),
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
        React.createElement(Board, props.boardProps),
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
                btnProps.description,
              ),
            ),
          ),
        ),
      ),
    ),
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
