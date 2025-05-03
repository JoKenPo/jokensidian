import React, { useState } from 'react'
import { MantineProvider, Flex, createTheme } from '@mantine/core'
import Sidebar from './components/Sidebar'
import EditorView from './components/EditorView'

import '@mantine/core/styles.css';

const mockFiles = ['intro.md', 'project.md', 'readme.md']
const mockContents: Record<string, string> = {
  'intro.md': '# Bem-vindo\nEste é o Jokensidian!',
  'project.md': '## Sobre o Projeto\nEste é um clone de Obsidian e Atom.',
  'readme.md': '# README\nAlgumas informações...',
}

const theme = createTheme({
  /** Put your mantine theme override here */
});

function App() {
  const [selectedFile, setSelectedFile] = useState(mockFiles[0])
  const [content, setContent] = useState(mockContents[mockFiles[0]])

  function handleSelectFile(file: string) {
    setSelectedFile(file)
    setContent(mockContents[file])
  }

  return (
    <MantineProvider
    // theme={theme}
    >
      <Flex>
        <Sidebar />
        <EditorView file={selectedFile} content={content} />
      </Flex>
    </MantineProvider>
  )
}

export default App
