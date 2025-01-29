import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { expect, describe, it } from "@jest/globals";
import AuthPage from "@/app/auth/page";

describe("Auth Page", () => {
  it("shows sign-in form by default", () => {
    render(<AuthPage />);
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  it("toggles to sign-up form", () => {
    render(<AuthPage />);
    fireEvent.click(screen.getByText("Sign Up"));
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });

  it("shows error for invalid login", () => {
    render(<AuthPage />);
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(screen.getByText("Invalid email or password")).toBeInTheDocument();
  });
});
