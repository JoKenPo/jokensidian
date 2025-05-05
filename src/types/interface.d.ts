export interface IElectronAPI {
  onFocusSearch: (callback: () => void) => void,
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}