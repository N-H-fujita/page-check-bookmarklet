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
      textArea1: [
        {
          id: "free-shipping",
          label: "送料無料文言",
          expectedText: "送料は無料です。",
        },
      ],
    },
  },
  {
    id: "freshFood",
    label: "生もの",
    rules: {
      textArea2: [
        {
          id: "fresh-food-notice",
          label: "生もの注意文言",
          expectedText: "生ものですので、お早めにお召し上がりください。",
        },
        {
          id: "remote-island-notice",
          label: "離島販売不可文言",
          expectedText: "離島への販売は行っておりません。",
        },
      ],
    },
  },
  {
    id: "processedFood",
    label: "加工食品",
    rules: {
      textArea2: [
        {
          id: "expiration-notice",
          label: "賞味期限注意文言",
          expectedText: "賞味期限をご確認の上、早めにお召し上がりください。",
        },
      ],
      textArea3: [
        {
          id: "expiration-label",
          label: "賞味期限",
          expectedText: "賞味期限:",
        },
      ],
    },
  },
  {
    id: "alcohol",
    label: "お酒",
    rules: {
      textArea1: [
        {
          id: "alcohol-percent",
          label: "アルコール度数表示",
          expectedPattern: /アルコール度数\d+(\.\d+)?%です。/,
          expectedText: "アルコール度数〇%です。",
        },
      ],
      textArea2: [
        {
          id: "minor-prohibited",
          label: "未成年販売禁止文言",
          expectedText: "未成年への販売は法律で禁止されております。",
        },
      ],
    },
  },
];

function normalizeText(text) {
  return text.replace(/\s+/g, " ").trim();
}

function checkRule({ target, areaId, rule }) {
  const area = textAreas[areaId];
  const element = target.querySelector(area.selector);
  const text = normalizeText(element?.textContent ?? "");
  const ok = rule.expectedPattern
    ? rule.expectedPattern.test(text)
    : text.includes(rule.expectedText);

  return {
    id: `${areaId}-${rule.id}`,
    areaId,
    areaLabel: area.label,
    label: rule.label,
    displayText: rule.expectedText ? `「${rule.expectedText}」` : rule.label,
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
    rules.map((rule) => checkRule({ target, areaId, rule }))
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
};
