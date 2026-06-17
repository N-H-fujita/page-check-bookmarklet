import { runTextChecks } from "./textChecks";
import { runHtmlChecks } from "./htmlChecks";
import { runFontColorChecks } from "./fontColorChecks";

function getCheckTarget() {
  return document.querySelector("main") ?? document.body;
};

export function runChecks() {
  const target = getCheckTarget();

  return [
    runTextChecks(target),
    runHtmlChecks(target),
    runFontColorChecks(target),
    {
      id: "tab3",
      label: "タブ3",
      groups: [
        {
          id: "tab3-basic",
          label: "基本",
          items: [],
        },
      ],
    },
    {
      id: "tab4",
      label: "タブ4",
      groups: [
        {
          id: "tab4-basic",
          label: "基本",
          items: [],
        },
      ],
    },
    {
      id: "tab5",
      label: "タブ5",
      groups: [
        {
          id: "tab5-basic",
          label: "基本",
          items: [],
        },
      ],
    },
  ];
};
