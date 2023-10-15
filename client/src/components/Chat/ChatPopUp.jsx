import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import Chat from "./Chat";
import Participants from "./Participants";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={index === 0 ? { marginTop: "auto" } : {}}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const ChatPopUp = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="chat-modal">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example">
          <Tab label="Chat" />
          <Tab label="Participants" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Chat />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Participants />
      </TabPanel>
    </div>
  );
};

export default ChatPopUp;
