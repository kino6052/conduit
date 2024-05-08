import { Subject, tap } from "rxjs";
import { checkEventual } from "../testing";

describe("Check eventual", () => {
  it("should", async () => {
    const s = new Subject<{ test: number }>();

    setTimeout(() => {
      s.next({ test: 1 });
      s.next({ test: 2 });
      s.next({ test: 3 });
    }, 1000);

    const result = await checkEventual<{ test: number }>(
      (r) => r.test === 3,
      s,
    );

    expect(result).toMatchInlineSnapshot(`
{
  "test": 3,
}
`);
  });
});
