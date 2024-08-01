import { nativeImage } from 'electron'
import winIconImg from './assets/icon32.png'
import appImg from './assets/app.png'
import appleIconImg from './assets/appleIcon.png'
import logoutImg from './assets/logout.png'
import iconImg from './assets/icon192.png'

/**
 * @see https://cn.vitejs.dev/config/build-options.html#build-assetsinlinelimit
 * build.lib 全为内联
 * 小于4kB 的导入或引用资源将内联为 base64 编码，使用createFromDataURL
 * #3b82f6
 * tray icon 16 * 16
 */

export const winIcon = nativeImage.createFromDataURL(winIconImg)

export const appleIcon = nativeImage.createFromDataURL(appleIconImg) // 16 *16

export const icon = nativeImage.createFromDataURL(iconImg)

export const appIcon = process.platform === 'darwin' ? appleIcon : winIcon

export const trayAppIcon = nativeImage.createFromDataURL(appImg)

export const logoutIcon = nativeImage.createFromDataURL(logoutImg)
