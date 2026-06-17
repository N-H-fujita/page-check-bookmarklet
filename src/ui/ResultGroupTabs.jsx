import React, { useState } from "react";
import Tabs from "./Tabs";

export default function ResultGroupTabs({ groups, renderContent }) {
  const [activeGroupId, setActiveGroupId] = useState(groups[0]?.id);

  return (
    <>
      <Tabs
        tabs={groups}
        activeTab={activeGroupId}
        onChange={setActiveGroupId}
        classPrefix="bc-result-group"
      />

      <div className="bc-result-group-content">
        {renderContent(activeGroupId)}
      </div>
    </>
  );
};
