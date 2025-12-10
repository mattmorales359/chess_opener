import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import ChessBoard from '@/components/ChessBoard.vue';

describe("ChessBoard", () => {
    it("renders properly", () => {
        const wrapper = mount(ChessBoard, { props: { msg: "Hello Vitest" } });
        expect(wrapper.text()).toContain("Hello Vitest");
    });
});
