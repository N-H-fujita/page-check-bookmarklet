const textAreas = {
  textArea1: {
    label: "商品説明",
    selector: ".textArea1",
  },
  textArea2: {
    label: "注意事項",
    selector: ".textArea2",
  },
  textArea3: {
    label: "その他",
    selector: ".textArea3",
  },
};

const textCheckGroups = [
  {
    id: "common",
    label: "共通文言",
    rules: {
      textArea1: ["送料は無料です。"],
    },
  },
  {
    id: "freshFood",
    label: "生もの",
    rules: {
      textArea2: [
        "生ものですので、お早めにお召し上がりください。",
        "離島への販売は行っておりません。",
      ],
    },
  },
  {
    id: "processedFood",
    label: "加工食品",
    rules: {
      textArea2: ["賞味期限をご確認の上、早めにお召し上がりください。"],
      textArea3: ["賞味期限:"],
    },
  },
  {
    id: "alcohol",
    label: "お酒",
    rules: {
      textArea1: [/アルコール度数\d+(\.\d+)?%です。/],
      textArea2: ["未成年への販売は法律で禁止されております。"],
    },
  },
];

function normalizeText(text) {
  return text.replace(/\s+/g, " ").trim();
}

function getDisplayText(rule) {
  if (rule instanceof RegExp) {
    return "アルコール度数〇%です。";
  }

  return `「${rule}」`;
}

function checkTextRule({ text, rule }) {
  if (rule instanceof RegExp) {
    return rule.test(text);
  }

  return text.includes(normalizeText(rule));
}

function checkRule({ target, areaId, rule, index }) {
  const area = textAreas[areaId];
  const element = target.querySelector(area.selector);
  const text = normalizeText(element?.textContent ?? "");
  const ok = checkTextRule({ text, rule });
  const displayText = getDisplayText(rule);

  return {
    id: `${areaId}-${index}-${displayText}`,
    areaId,
    areaLabel: area.label,
    displayText,
    ok,
    message: !element
      ? `${area.selector} が見つかりません`
      : ok
        ? "指定エリア内に対象のテキストがあります"
        : "指定エリア内に対象のテキストがありません",
  };
}

function runGroupChecks({ target, group }) {
  return Object.entries(group.rules).flatMap(([areaId, rules]) =>
    rules.map((rule, index) => checkRule({ target, areaId, rule, index }))
  );
}

export function runTextChecks(target) {
  return {
    id: "text",
    label: "文言チェック",
    groups: textCheckGroups.map((group) => ({
      id: group.id,
      label: group.label,
      items: runGroupChecks({ target, group }),
    })),
  };
}
