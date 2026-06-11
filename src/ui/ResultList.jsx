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

function ResultItems({ items }) {
  return (
    <ul className="bc-result-list">
      {items.map((item) => (
        <li
          key={item.id}
          className={`bc-result-item ${item.ok ? "is-ok" : "is-ng"}`}
        >
          <div className="bc-result-label">
            <span>{item.ok ? "✅" : "❌"}</span>
            <strong>{item.displayText ?? item.label}</strong>
          </div>
          <p className="bc-result-message">{item.message}</p>
        </li>
      ))}
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
