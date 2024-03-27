import { render } from "@testing-library/react";
import Timer from "./Timer";

describe("Timer Component", () => {

    it("Shold render Timer Component", () => {

        const TimeMock = 20
        const { getByTestId } = render( <Timer mainTime={TimeMock}/>  );

        expect(getByTestId("timer-component")).toBeTruthy();
      });

      it("Shold render 20 seconds", () => {

        const TimeMock = 20
        const { getByTestId } = render( <Timer mainTime={TimeMock}/>  );

        expect(getByTestId("timer-component")).toHaveTextContent("00:20");
      });



})