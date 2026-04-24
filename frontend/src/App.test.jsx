import { render, screen, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import App from "@/App";

afterEach(() => {
  cleanup();
  window.history.replaceState({}, "", "/");
});

describe("App routes", () => {
  it("renders the homepage", () => {
    window.history.replaceState({}, "", "/");

    render(<App />);

    expect(screen.getByText("Niharika Bajaj")).toBeTruthy();
  });

  it("renders a work sample route", () => {
    window.history.replaceState({}, "", "/work/cox-kings");

    render(<App />);

    expect(screen.getByText("Cox & Kings")).toBeTruthy();
    expect(screen.getByText("Back to Work Samples")).toBeTruthy();
  });
});
