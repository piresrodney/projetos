import { ReactNode } from "react";

export interface NavBarListProps {
  toggleList: (newOpen: boolean) => () => void;
  userLogged: boolean;
}

export interface OptionNavBar {
  text: string;
  icon: ReactNode;
  path: string;
}
