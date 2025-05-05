// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  onFocusSearch: (callback: () => void) => ipcRenderer.on('focus-search-input', callback),
  loadMarkdownFile: () => ipcRenderer.invoke('load-markdown'),
  saveMarkdownFile: (content: string) => ipcRenderer.invoke('save-markdown', content),
})
