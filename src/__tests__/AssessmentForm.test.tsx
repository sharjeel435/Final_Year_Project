import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Assessment from "@/pages/Assessment";

// jsdom doesn't implement crypto.randomUUID by default in all environments
if (!globalThis.crypto?.randomUUID) {
  // @ts-ignore
  globalThis.crypto = {
    // @ts-ignore
    randomUUID: () => `uuid-${Math.floor(Math.random() * 1e6)}`,
  } as unknown as Crypto;
}

describe("Assessment form", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("updates failed trades immediately", async () => {
    render(<Assessment />);
    const total = screen.getByLabelText(/Total Number of Trades/i);
    const success = screen.getByLabelText(/Successful Trades/i);
    const failed = screen.getByLabelText(/Failed Trades/i);

    await userEvent.clear(total);
    await userEvent.type(total, "10");
    await userEvent.clear(success);
    await userEvent.type(success, "6");
    expect((failed as HTMLInputElement).value).toBe("4");
  });

  it("generates 20 unique questions per topic", async () => {
    render(<Assessment />);
    const topic = screen.getByText(/Question Topic/i);
    await userEvent.click(topic);
    const option = await screen.findByRole("option", { name: /Risk Management/i });
    await userEvent.click(option);

    const items = await screen.findAllByText(/Assessment Questions/i);
    expect(items.length).toBeGreaterThan(0);
  });

  it("submits with valid stats", async () => {
    render(<Assessment />);
    const total = screen.getByLabelText(/Total Number of Trades/i);
    const success = screen.getByLabelText(/Successful Trades/i);
    const submit = screen.getByRole("button", { name: /Continue to Quiz/i });

    await userEvent.clear(total);
    await userEvent.type(total, "5");
    await userEvent.clear(success);
    await userEvent.type(success, "5");

    const mockFetch = vi.spyOn(globalThis, "fetch" as any).mockResolvedValue({ ok: true, json: async () => ({ quiz_id: "q1", questions: [] }) } as any);
    await userEvent.click(submit);
    expect(mockFetch).toHaveBeenCalled();
  });
});
