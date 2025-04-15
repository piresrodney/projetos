import React from "react";
import { Link } from "react-router-dom";
import { NavBarListProps, OptionNavBar } from "./NavBarList.types";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartSimple,
  faFile,
  faHouse,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./NavBarList.css";

const handleOptionList = (logged: boolean): OptionNavBar[] => {
  return logged
    ? [
        {
          text: "Home",
          icon: <FontAwesomeIcon icon={faHouse} />,
          path: "/home",
        },
        {
          text: "Cadastrar ativo",
          icon: <FontAwesomeIcon icon={faChartSimple} />,
          path: "/",
        },
      ]
    : [
        {
          text: "Fazer login",
          path: "/",
          icon: <FontAwesomeIcon icon={faUser} />,
        },
        {
          text: "Cadastrar",
          icon: <FontAwesomeIcon icon={faFile} />,
          path: "/newuser",
        },
      ];
};

const NavBarList: React.FC<NavBarListProps> = ({ toggleList, userLogged }) => {
  return (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleList(false)}>
      <List>
        {handleOptionList(userLogged).map((item) => (
          <Link to={item.path}>
            <ListItem key={item.text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <Link to={"/contact"}>
        <ListItemButton>
          <ListItemIcon>
            <FontAwesomeIcon icon={faPhone} />
          </ListItemIcon>
          <ListItemText primary="Contato" />
        </ListItemButton>
      </Link>
    </Box>
  );
};

export default NavBarList;
