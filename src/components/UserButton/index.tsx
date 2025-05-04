import React from 'react'
import { IconChevronRight } from '@tabler/icons-react';
import { Avatar, Group, Text, UnstyledButton } from '@mantine/core';

import classes from './index.module.css';

export function UserButton() {
  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <Avatar
          src="https://avatars.githubusercontent.com/u/3427820?v=4"
          radius="xl"
        />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            Eduardo Almeida
          </Text>

          <Text c="dimmed" size="xs" className={classes.userEmail}>
            eduardo.almeida.job@gmail.com
          </Text>
        </div>

        <IconChevronRight size={14} stroke={1.5} />
      </Group>
    </UnstyledButton>
  );
}

export default UserButton