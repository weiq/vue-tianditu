import { defineComponent } from "vue-demi";
import { useMethods, useState } from "../use";
import { IconSearch, IconClose } from "./icons";
import { h } from "../../../utils";

export const SearchBox = defineComponent({
  props: {
    placeholder: { type: String, default: "输入关键字搜索" }
  },
  setup(props) {
    let isComposition = false;
    const state = useState();
    const { onSearch } = useMethods(state);

    return () =>
      h(
        "div",
        {
          class: "tdt-search-box"
        },
        [
          h("input", {
            class: "search-input",
            attrs: {
              type: "text",
              placeholder: props.placeholder
            },
            domProps: {
              value: state.keyword
            },
            on: {
              focus: () => (state.queryType = 4),
              compositionstart: () => (isComposition = true),
              compositionend: () => (isComposition = false),
              input: (e: any) => setTimeout(() => !isComposition && (state.keyword = e.target.value))
            }
          }),
          h(
            "i",
            {
              class: "search-close",
              style: state.keyword ? "" : "display:none",
              on: {
                click: () => (state.keyword = "")
              }
            },
            [h(IconClose)]
          ),
          h(
            "button",
            {
              class: "search-btn",
              on: {
                click: () => onSearch(1)
              }
            },
            [h(IconSearch)]
          )
        ]
      );
  }
});