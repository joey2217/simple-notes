import { contextBridge, ipcRenderer } from 'electron/renderer'

contextBridge.exposeInMainWorld('electronAPI', {
  closeScreenshot: () => ipcRenderer.invoke('CLOSE_SCREENSHOT'),
})

function addListener(channel: string, callback: (...args: any[]) => void) {
  const listener = (_event: Electron.IpcRendererEvent, ...args: any[]) =>
    callback(...args)
  ipcRenderer.on(channel, listener)
  return () => ipcRenderer.off(channel, listener)
}

contextBridge.exposeInMainWorld('messageAPI', {
  onScreenshot: (callback: (thumbnailURL:string ) => void) => addListener('SCREENSHOT', callback),
})
