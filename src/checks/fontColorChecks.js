const fontColorTargets = [
  {
    id: "red-font",
    label: "赤文字チェック",
    selector: ".textArea2",
    allowedColors: ["red", "#ff0000", "ff0000"],
  },
];

function normalizeColor(color) {
  return color.replace(/\s+/g, "").toLowerCase();
}

function isAllowedColor(color, allowedColors) {
  const normalizedColor = normalizeColor(color);

  return allowedColors
    .map((allowedColor) => normalizeColor(allowedColor))
    .includes(normalizedColor);
}

function checkFontColor({ target, rule }) {
  const area = target.querySelector(rule.selector);
  const font = area?.querySelector("font[color]");
  const color = font?.getAttribute("color") ?? "";

  if (!area) {
    return {
      id: rule.id,
      label: rule.label,
      status: "skip",
      message: `${rule.selector} が見つかりません`,
    };
  }

  if (!font) {
    return {
      id: rule.id,
      label: rule.label,
      status: "skip",
      message: "対象の font[color] はありません",
    };
  }

  const ok = isAllowedColor(color, rule.allowedColors);

  return {
    id: rule.id,
    label: rule.label,
    status: ok ? "ok" : "ng",
    message: ok
      ? `font[color] が指定色です（${color}）`
      : `font[color] が指定色ではありません（${color}）`,
  };
}

export function runFontColorChecks(target) {
  return {
    id: "fontColor",
    label: "文字色チェック",
    groups: [
      {
        id: "font-color-basic",
        label: "基本",
        items: fontColorTargets.map((rule) => checkFontColor({ target, rule })),
      },
    ],
  };
}
