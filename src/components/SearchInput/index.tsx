import React, { useEffect } from 'react';
import { IconSearch } from '@tabler/icons-react';
import {
  Code,
  TextInput,
} from '@mantine/core';
import classes from './index.module.css';
// import { ipcRenderer } from 'electron';

interface SearchInputProps {
  onSearch: (searchText: string) => void
}


export function SearchInput({ onSearch }: SearchInputProps) {

  useEffect(() => {
    // ipcRenderer.on('focus-search-input', () => {
    //   console.log(' asdalksdm')
    //   const input = document.getElementById('searchInput') as HTMLInputElement | null;
    //   input?.focus();
    // })
    window?.electronAPI?.onFocusSearch(() => {
      const input = document.getElementById('searchInput') as HTMLInputElement | null;
      input?.focus();
    });
  }, []);

  function handleSearchFile(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault()
    onSearch(event.target.value)
  }

  return (
    <TextInput
      id='searchInput'
      placeholder="Search"
      size="xs"
      leftSection={<IconSearch size={12} stroke={1.5} />}
      rightSectionWidth={70}
      rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
      styles={{ section: { pointerEvents: 'none' } }}
      mb="sm"
      onChange={(event) => handleSearchFile(event)}
    />
  );
}

export default SearchInput