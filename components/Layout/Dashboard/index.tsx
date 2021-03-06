import {
  AppShell,
  Box,
  Burger,
  Group,
  Header,
  MediaQuery,
  Navbar,
  Text,
  ThemeIcon,
  UnstyledButton,
  useMantineTheme,
  createStyles,
  Container,
  Divider,
  Menu,
  Avatar,
  Indicator,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import React from "react";
import {
  Mailbox,
  Archive,
  Settings,
  ChevronDown,
  Logout,
  Link,
} from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[2]
    }`,
  },

  mainSection: {
    paddingBottom: theme.spacing.sm,
  },

  userMenu: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  user: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    },
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  userActive: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },

  tabs: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  tabsList: {
    borderBottom: "0 !important",
  },

  tabControl: {
    fontWeight: 500,
    height: 38,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    },
  },

  tabControlActive: {
    borderColor: `${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2]
    } !important`,
  },
}));

type Props = {
  children: React.ReactNode;
  user: any;
};

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  path: string;
}

function MainLink({ icon, color, label, path }: MainLinkProps) {
  const router = useRouter();
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
        backgroundColor:
          router.pathname === path
            ? theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0]
            : undefined,

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
      onClick={() => router.push(path)}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}
const data = [
  { icon: <Mailbox size={16} />, color: "blue", label: "Keep", path: "/" },
  // { icon: <Bell size={16} />, color: "violet", label: "Reminders" },
  { icon: <Link size={16} />, color: "teal", label: "Links", path: "/links" },
  {
    icon: <Archive size={16} />,
    color: "red",
    label: "Archives",
    path: "/archives",
  },
  {
    icon: <Settings size={16} />,
    color: "orange",
    label: "Settings",
    path: "/settings",
  },
];
function DashboardLayout({ children, user }: Props) {
  const router = useRouter();
  const theme = useMantineTheme();
  const [opened, setOpened] = React.useState(false);
  const { classes, cx } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = React.useState(false);
  const [userId] = useLocalStorage({
    key: "userId",
  });
  return (
    <AppShell
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 250 }}
        >
          <Navbar.Section grow>
            {data.map(({ icon, color, label, path }) => (
              <MainLink
                key={label}
                icon={icon}
                color={color}
                label={label}
                path={path}
              />
            ))}
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={70} p="md">
          <Container className={classes.mainSection}>
            <Group position="apart">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                  <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    size="sm"
                    mr="xl"
                  />
                </MediaQuery>
                <Indicator inline label="pre-alpha" offset={-4} size={12}>
                  <Text onClick={() => router.push("/")}>keeppt</Text>
                </Indicator>
              </div>
              <Menu
                size={260}
                placement="end"
                transition="pop-top-right"
                className={classes.userMenu}
                onClose={() => setUserMenuOpened(false)}
                onOpen={() => setUserMenuOpened(true)}
                control={
                  <UnstyledButton
                    className={cx(classes.user, {
                      [classes.userActive]: userMenuOpened,
                    })}
                  >
                    <Group spacing={7}>
                      <Avatar
                        radius="xl"
                        size={30}
                        src={`https://vercel.com/api/www/avatar/${userId}?&s=120`}
                      />
                      <ChevronDown size={12} />
                    </Group>
                  </UnstyledButton>
                }
              >
                <Menu.Label>Settings</Menu.Label>
                <Menu.Item
                  onClick={() => router.push("/settings")}
                  icon={<Settings size={14} />}
                >
                  Account settings
                </Menu.Item>

                <Divider />

                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item
                  onClick={() => router.push("/api/logout")}
                  color="red"
                  icon={<Logout size={14} />}
                >
                  Logout
                </Menu.Item>
              </Menu>
            </Group>
          </Container>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}

export default DashboardLayout;
