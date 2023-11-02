import React from "react";
import classes from "./Navbar.module.css";
import { MantineLogo } from "@mantine/ds";
import { Container, Group, Burger, Drawer, Stack } from "@mantine/core";
import useLinks from "./useLinks";
import { DrawerContext } from "../../Contexts/drawerContext";
import { Switch } from '@mantine/core';
import { useThemeStore } from "../../store/ThemeStore";

const Navbar = () => {
  const { opened, toggle } = React.useContext(DrawerContext);
  const [items] = useLinks();
  const {darkMode, toggleDarkMode} = useThemeStore((state)=>state)

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <MantineLogo size={28} />
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>
        <Switch checked={darkMode} onChange={toggleDarkMode} label="Light/Dark Mode" />
        <Burger hiddenFrom="xs" opened={opened} onClick={toggle} />
        <Drawer
          withCloseButton={true}
          opened={opened}
          size="100%"
          onClose={toggle}
        >
          <Stack>{items}</Stack>
        </Drawer>
      </Container>
    </header>
  );
};

export default Navbar;
