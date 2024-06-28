import { useState } from "react";

import { Box } from "@mui/material";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { FinancesTable } from "./FinancesTable";
import { DetailsFinance } from "./DetailsFinance";

import { IExpenses } from "../interfaces/IExpenses";

interface TabsFinancesProps {
  allExpenses: IExpenses[];
}

export const TabsFinances = ({ allExpenses }: TabsFinancesProps) => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  function handleTabSelected(tabIndex: number) {
    setSelectedTab(tabIndex);
  }

  return (
    <>
      <Box>
        <Tabs selectedIndex={selectedTab} onSelect={handleTabSelected}>
          <TabList>
            <Tab>Resumo</Tab>
            <Tab>Detalhes</Tab>
          </TabList>

          <TabPanel>
            <FinancesTable allExpenses={allExpenses} />
          </TabPanel>

          <TabPanel>
            <DetailsFinance />
          </TabPanel>
        </Tabs>
      </Box>
      <TabPanel></TabPanel>
    </>
  );
};
