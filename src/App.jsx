import React, { useState } from "react";
import Tabs from "./ui/Tabs";
import ResultGroupTabs from "./ui/ResultGroupTabs";
import ResultList from "./ui/ResultList";

export default function App({ onClose, results }) {
  const [activeTab, setActiveTab] = useState(results[0]?.id);

  const activeResult = results.find((result) => result.id === activeTab);

  return (
    <div className="bc-modal">

      {/* ヘッダー */}
      <div className="bc-header">
        <h2 className="bc-title">ページチェック</h2>

        <button className="bc-close-button" onClick={onClose}>
          ×
        </button>
      </div>

      {/* タブ */}
      <Tabs tabs={results} activeTab={activeTab} onChange={setActiveTab} />

      {/* コンテンツ */}
      <div className="bc-content">
        {activeResult?.groups?.length > 1
          ? (
            <ResultGroupTabs
              groups={activeResult.groups}
              renderContent={(activeGroupId) => {
                const group = activeResult.groups.find((group) => group.id === activeGroupId);
                return <ResultList items={group?.items ?? []} />;
              }}
            />
          ) : (
            <ResultList items={activeResult?.groups?.[0]?.items ?? []} />
          )
        }
      </div>
    </div>
  );
};
