import React, { useState } from 'react'
import { MantineProvider, Flex, createTheme } from '@mantine/core'
import Sidebar from './components/Sidebar'
import EditorView from './components/EditorView'

import '@mantine/core/styles.css';

export interface FileData {
  id: string;
  type: 'file' | 'folder';
  name: string;
  content: string;
}

const mockFiles = [
  {
    id: 'intro.md',
    name: "intro.md",
    content: '# Bem-vindo\nEste é o Jokensidian!',
    type: "file",
  },
  {
    id: "project.md",
    name: "project.md",
    content: '## Sobre o Projeto\nEste é um clone de Obsidian e Atom.',
    type: "file",
  },
  {
    id: "readme.md",
    name: "readme.md",
    content: '# README\nAlgumas informações...',
    type: "file",
  }
] as FileData[]

const theme = createTheme({
  /** Put your mantine theme override here */
});

function App() {
  const [selectedFile, setSelectedFile] = useState(mockFiles[0])

  function handleSelectFile(fileId: string) {
    const foundFile = mockFiles.find(file => file.id === fileId);
    if (foundFile) {
      setSelectedFile(foundFile);
    } else {
      setSelectedFile(mockFiles[0]);
    }
  }

  return (
    <MantineProvider
      defaultColorScheme="dark"
    // theme={theme}
    >
      <Flex className='main'>
        <Sidebar fileList={mockFiles} onSelect={handleSelectFile} />
        <Flex direction='column' className='content'>
          <EditorView file={selectedFile} />
        </Flex>
      </Flex>
    </MantineProvider>
  )
}

export default App
