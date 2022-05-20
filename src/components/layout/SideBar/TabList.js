import React from "react";
import TabItem from "./TabItem";
const TabList = (props) => {
  const tabItems = props.tabItems.map((tab, index) => (
    <TabItem
      index={index}
      key={index}
      link={tab.link}
      title={tab.title}
      icon={tab.icon}
    />
  ));
  return <ul>{tabItems}</ul>;
};

export default TabList;
