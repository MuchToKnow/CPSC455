import * as React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import WifiIcon from '@material-ui/icons/Wifi';
import BatteryChargingFullIcon from '@material-ui/icons/BatteryChargingFull';
import LockIcon from '@material-ui/icons/Lock';

function FeatureList(props) {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <WifiIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Free Wifi" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <BatteryChargingFullIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Charging for EVs" secondary="Additional fees apply" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <LockIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Safe Parking" />
      </ListItem>
    </List>
  );
};

export default FeatureList;
