import { render } from "@testing-library/react";
import Button from "./Button";

describe("Button Component", () => {

    it("Shold render Button Component", () => {

        const { getByTestId } = render( <Button text="TesteButton"/>  );

        expect(getByTestId("button-component")).toBeTruthy();

    })

    it("Shold render Button Component text TesteButton", () => {

        const { getByTestId } = render( <Button text="TesteButton"/>  );

        expect(getByTestId("button-component")).toHaveTextContent("TesteButton");
    })



})