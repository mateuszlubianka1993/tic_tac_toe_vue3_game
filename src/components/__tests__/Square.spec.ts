import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Square from "../Square.vue";
import { PLAYERS } from "../../config";

describe("Square.vue", () => {
  it("renders an empty square when value is null", () => {
    const wrapper = mount(Square, {
      props: { value: null },
    });
    expect(wrapper.text()).toBe("");
    expect(wrapper.classes()).toContain("cursor-pointer");
  });

  it("renders X player correctly", () => {
    const wrapper = mount(Square, {
      props: { value: PLAYERS.X_PLAYER },
    });
    expect(wrapper.text()).toBe(PLAYERS.X_PLAYER);
    expect(wrapper.classes()).toContain("text-player-x");
  });

  it("renders O player correctly", () => {
    const wrapper = mount(Square, {
      props: { value: PLAYERS.O_PLAYER },
    });
    expect(wrapper.text()).toBe(PLAYERS.O_PLAYER);
    expect(wrapper.classes()).toContain("text-player-o");
  });

  it("emits click event when clicked and empty", async () => {
    const wrapper = mount(Square, {
      props: { value: null },
    });
    await wrapper.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("click");
  });

  it("does not emit click event when occupied", async () => {
    const wrapper = mount(Square, {
      props: { value: PLAYERS.X_PLAYER },
    });
    await wrapper.trigger("click");
    expect(wrapper.emitted("click")).toBeUndefined();
  });

  it("disables the button when disabled prop is true", () => {
    const wrapper = mount(Square, {
      props: { value: null, disabled: true },
    });
    const button = wrapper.find("button");
    expect(button.element.disabled).toBe(true);
    expect(wrapper.classes()).toContain("cursor-default");
  });
});
