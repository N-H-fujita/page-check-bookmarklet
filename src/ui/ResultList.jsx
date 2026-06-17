import React from "react";

function groupItemsByArea(items) {
  return items.reduce((groups, item) => {
    const areaId = item.areaId ?? "default";
    const areaLabel = item.areaLabel ?? "チェック結果";
    const group = groups.find((group) => group.areaId === areaId);

    if (group) {
      group.items.push(item);
      return groups;
    }

    return [
      ...groups,
      {
        areaId,
        areaLabel,
        items: [item],
      },
    ];
  }, []);
}

function getResultStatus(item) {
  if (item.status) {
    return item.status;
  }

  return item.ok ? "ok" : "ng";
}

function getStatusIcon(status) {
  switch (status) {
    case "ok":
      return "✅";
    case "ng":
      return "❌";
    case "skip":
      return "➖";
    default:
      return "❔";
  }
}

function ResultItems({ items }) {
  return (
    <ul className="bc-result-list">
      {items.map((item) => {
        const status = getResultStatus(item);

        return (
          <li key={item.id} className={`bc-result-item is-${status}`}>
            <div className="bc-result-label">
              <span>{getStatusIcon(status)}</span>
              <strong>{item.displayText ?? item.label}</strong>
            </div>
            <p className="bc-result-message">{item.message}</p>
          </li>
        );
      })}
    </ul>
  );
}

export default function ResultList({ items }) {
  if (!items.length) {
    return <p className="bc-empty">チェック項目はまだありません。</p>;
  }

  const hasArea = items.some((item) => item.areaId);

  if (!hasArea) {
    return <ResultItems items={items} />;
  }

  const areaGroups = groupItemsByArea(items);

  return (
    <div className="bc-area-result-groups">
      {areaGroups.map((group) => (
        <section className="bc-area-result-group" key={group.areaId}>
          <h4 className="bc-area-title">{group.areaLabel}</h4>
          <ResultItems items={group.items} />
        </section>
      ))}
    </div>
  );
};
