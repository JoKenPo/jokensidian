import { IconBulb, IconCheckbox, IconFile, IconFolder, IconPlus, IconSearch, IconUser } from '@tabler/icons-react';
import {
  ActionIcon,
  Badge,
  Box,
  Code,
  Group,
  Text,
  TextInput,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import classes from './index.module.css';
import React, { SyntheticEvent } from 'react';
import UserButton from '../UserButton';
import { FileData } from '@/App';

interface SidebarProps {
  fileList: FileData[]
  onSelect: (fileId: string) => void
}

const links = [
  { icon: IconBulb, label: 'Activity', notifications: 3 },
  { icon: IconCheckbox, label: 'Tasks', notifications: 4 },
  { icon: IconUser, label: 'Contacts' },
];

const files = [
  { type: 'file', label: 'Sales' },
  { type: 'file', label: 'Deliveries' },
  { type: 'file', label: 'Discounts' },
  { type: 'file', label: 'Profits' },
  { type: 'file', label: 'Reports' },
  { type: 'file', label: 'Orders' },
  { type: 'file', label: 'Events' },
  { type: 'file', label: 'Debts' },
  { type: 'file', label: 'Customers' },
];


export function NavbarSearch({ fileList, onSelect }: SidebarProps) {

  function handleSelectFile(event: SyntheticEvent, fileId: string) {
    event.preventDefault()
    onSelect(fileId)
  }

  const mainLinks = links.map((link) => (
    <UnstyledButton key={link.label} className={classes.mainLink}>
      <div className={classes.mainLinkInner}>
        <link.icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
        <span>{link.label}</span>
      </div>
      {link.notifications && (
        <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
          {link.notifications}
        </Badge>
      )}
    </UnstyledButton>
  ));

  const fileLinks = fileList.map((file) => (
    <a
      href="#"
      onClick={(event) => handleSelectFile(event, file.id)}
      key={file.name}
      className={classes.fileLink}
    >
      <Box component="span" mr={4} fz={16}>
        {/* {file.emoji} */}
        {
          file.type === 'folder' ?
            <IconFolder size={20} stroke={1.5} /> :
            <IconFile size={20} stroke={1.5} />
        }
      </Box>{' '}
      <Box component="span">
        {file.name}
      </Box>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.section}>
        <UserButton />
      </div>

      <TextInput
        placeholder="Search"
        size="xs"
        leftSection={<IconSearch size={12} stroke={1.5} />}
        rightSectionWidth={70}
        rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
        styles={{ section: { pointerEvents: 'none' } }}
        mb="sm"
      />

      <div className={classes.section}>
        <div className={classes.mainLinks}>{mainLinks}</div>
      </div>

      <div className={classes.section}>
        <Group className={classes.filesHeader} justify="space-between">
          <Text size="xs" fw={500} c="dimmed">
            Files
          </Text>
          <Tooltip label="Create file" withArrow position="right">
            <ActionIcon variant="default" size={18}>
              <IconPlus size={12} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
        </Group>
        <div className={classes.files}>{fileLinks}</div>
      </div>
    </nav>
  );
}

export default NavbarSearch