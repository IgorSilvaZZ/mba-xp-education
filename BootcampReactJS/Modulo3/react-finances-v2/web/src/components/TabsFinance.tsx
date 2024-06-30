import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { FinancesTable } from "./FinancesTable";
import { DetailsFinance } from "./DetailsFinance";

import { IExpenses } from "../interfaces/IExpenses";

import "react-tabs/style/react-tabs.css";
import { Box } from "@mui/material";

interface TabsFinancesProps {
  allExpenses: IExpenses[];
}

export const TabsFinances = ({ allExpenses }: TabsFinancesProps) => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  function handleTabSelected(tabIndex: number) {
    setSelectedTab(tabIndex);
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs selectedIndex={selectedTab} onSelect={handleTabSelected}>
        <TabList>
          <Tab>Resumo</Tab>
          <Tab>Detalhes</Tab>
        </TabList>

        <TabPanel>
          <DetailsFinance />
        </TabPanel>

        <TabPanel>
          <FinancesTable allExpenses={allExpenses} />
        </TabPanel>
      </Tabs>
    </Box>
  );
};
