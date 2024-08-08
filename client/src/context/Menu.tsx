import React, { createContext, useContext, useRef, useState } from "react";
import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick";
import { Children } from "../types/ComponentsTypes";

const MenuContext = createContext<{
  openMenu: boolean;
  setOpenMenu: () => void;
  MenuRef: React.RefObject<HTMLUListElement>;
  buttonRef: React.RefObject<HTMLButtonElement>;
}>({
  openMenu: false,
  setOpenMenu: () => {},
  MenuRef: React.createRef<HTMLUListElement>(),
  buttonRef: React.createRef<HTMLButtonElement>(),
});
const useMenu = () => {
  return useContext(MenuContext);
};

const Options = styled.div`
  text-align: end;
  position: relative;
`;
const Button = styled.button`
  border: none;
  background: inherit;

  &:focus {
    outline: none;
  }
`;
const Option = styled.ul`
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: var(--color-grey-50);
  z-index: 8;
  width: 14rem;
  height: auto;
  right: 13px;
  top: 26px;
  border-radius: 10px;
  box-shadow: var(--shadow-lg);
`;

const Menu = ({ children }: Children) => {
  const MenuRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [openMenu, setOpenMenu] = useState(false);

  useOutsideClick(MenuRef, () => setOpenMenu(false), buttonRef);

  const handleBtnClick = () => {
    setOpenMenu((prev) => !prev);
  };

  return (
    <MenuContext.Provider
      value={{ openMenu, setOpenMenu: handleBtnClick, MenuRef, buttonRef }}
    >
      <Options>{children}</Options>
    </MenuContext.Provider>
  );
};
const Btn = ({ children }: Children) => {
  const { setOpenMenu, buttonRef } = useMenu();

  return (
    <Button ref={buttonRef} onClick={setOpenMenu}>
      {children}
    </Button>
  );
};
const List = ({ children, close }: Children & { close: boolean }) => {
  const { openMenu, MenuRef, setOpenMenu } = useMenu();
  return (
    openMenu && (
      <Option ref={MenuRef}>
        <div
          onClick={() => {
            close && setOpenMenu();
          }}
        >
          {children}
        </div>
      </Option>
    )
  );
};

Menu.List = List;
Menu.Btn = Btn;

export default Menu;
