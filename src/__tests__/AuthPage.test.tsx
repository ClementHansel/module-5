import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { expect, describe, it, jest } from "@jest/globals";
import AuthPage from "@/app/auth/page";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("Auth Page", () => {
  it("shows sign-in form by default", () => {
    render(<AuthPage />);
    // ✅ Use getAllByText() and select the first "Sign In"
    expect(screen.getAllByText("Sign In")[0]).toBeInTheDocument();
  });

  it("toggles to sign-up form", () => {
    render(<AuthPage />);
    fireEvent.click(screen.getAllByText("Sign Up")[0]); // ✅ Ensure correct element is clicked
    expect(screen.getAllByText("Sign Up")[0]).toBeInTheDocument();
  });

  it("shows error for invalid login", async () => {
    render(<AuthPage />);
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    // ✅ Use findByText() for async error messages
    expect(
      await screen.findByText((content) =>
        content.includes("Invalid email or password")
      )
    ).toBeInTheDocument();
  });
});
