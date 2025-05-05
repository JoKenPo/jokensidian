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
import React, { SyntheticEvent, useState } from 'react';
import UserButton from '../UserButton';
import { FileData } from '@/App';
import SearchInput from '../SearchInput';

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

  const [list, setList] = useState(fileList)

  function handleSelectFile(event: SyntheticEvent, fileId: string) {
    event.preventDefault()
    onSelect(fileId)
  }

  function handleSearchFile(searchText: string) {
    const searchList = fileList.filter((file) => file.name.includes(searchText))
    if (searchList.length > 0) setList(searchList)
  }

  // const mainLinks = links.map((link) => (
  //   <UnstyledButton key={link.label} className={classes.mainLink}>
  //     <div className={classes.mainLinkInner}>
  //       <link.icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
  //       <span>{link.label}</span>
  //     </div>
  //     {link.notifications && (
  //       <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
  //         {link.notifications}
  //       </Badge>
  //     )}
  //   </UnstyledButton>
  // ));

  const fileLinks = list.map((file) => (
    <a
      href="#"
      onClick={(event) => handleSelectFile(event, file.id)}
      key={file.name}
      className={classes.fileLink}
    >
      {
        file.type === 'folder' ?
          <IconFolder size={20} stroke={1.5} /> :
          <IconFile size={20} stroke={1.5} />
      }
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

      <SearchInput
        onSearch={handleSearchFile}
      />

      {/* <div className={classes.section}>
        <div className={classes.mainLinks}>{mainLinks}</div>
      </div> */}

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
        <div className={classes.mainLinks}>{fileLinks}</div>
      </div>
    </nav>
  );
}

export default NavbarSearch
