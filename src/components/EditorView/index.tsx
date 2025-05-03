import React from 'react'
import { ScrollArea, Text, Paper } from '@mantine/core'
import { marked } from 'marked'

interface EditorViewProps {
  file: string
  content: string
}

function EditorView({ file, content }: EditorViewProps) {
  return (
    <ScrollArea style={{ height: '100%' }} p="md">
      <Text size="xl" fw={700} mb="md">
        {file}
      </Text>
      <Paper withBorder p="md" radius="md">
        <div
          dangerouslySetInnerHTML={{ __html: marked(content) }}
          style={{ lineHeight: 1.6 }}
        />
      </Paper>
    </ScrollArea>
  )
}

export default EditorView
