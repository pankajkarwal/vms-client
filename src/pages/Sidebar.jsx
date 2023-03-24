import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import menuList from "../utils/MenuList";
import { Link } from "react-router-dom";
class Sidebar extends React.Component {
  render() {
    return (
      <List>
        {menuList.map((item, index) => (
          <ListItem button key={item.title}>
          
            <Link to={item.path} >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
            </Link>
            <Link to={item.path} ><ListItemText primary={item.title} /> </Link>
          </ListItem>
        ))}
      </List>

    );
  }
}

export default Sidebar;
