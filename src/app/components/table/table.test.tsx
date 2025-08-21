/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import React from "react";
import { render, screen } from "@testing-library/react";

import Table from ".";

describe("Table Component", () => {
    it("componente deve renderizar corretamente", () => {
        render(<Table />);

        expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });
});