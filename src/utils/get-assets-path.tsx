import { app } from "electron";
import path from "path";

const resPath = app.isPackaged
    ? path.resolve(process.resourcesPath, "assets")
    : path.resolve(app.getAppPath(), "src/assets");

export default (resourceName: string) => {
    return path.resolve(resPath, resourceName);
};
