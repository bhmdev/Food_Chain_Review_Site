import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FoodChainTable from "./FoodChainTable";
import ReviewTable from "./ReviewTable";
import TabPanel from "./TabPanel";

const TableContainer = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} id="table-container" TabIndicatorProps={{style: {background: '#F4976C'}}}>
          <Tab label="Food Chains Table" />
          <Tab label="Reviews Table" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <FoodChainTable/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ReviewTable/>
      </TabPanel>
    </>
  );
}

export default TableContainer