/* <Class Documentation>

  <Class Description>
    These are general utilities that can be used by every class

  <Method Descriptions>
    UpdateTime(): Get the current time and formats it.
    GenerateUUID(): Generates a UUID
    ReadFile(): This method calls the file system to read a specific file
    CheckShortcut(): This method checks if a .thijm file is a shortcut or an actual executable
    GetAppProperties(): This method extract the properties of an application. For example icon location or mimetypes

*/

import { OpenFile } from "@thijmenos/filesystem";
import {
  Path,
  ApplicationMetaData,
  ApplicationMetaDataFields,
  ApplicationMetaDataObject,
} from "@thijmenos/common/types";

export function UpdateTime(): string {
  const currentDate = new Date();
  const currentTime = currentDate.getHours() + ":" + currentDate.getMinutes();

  return currentDate.toDateString() + " " + currentTime;
}

export function GenerateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
    const random = (Math.random() * 16) | 0;
    const value = char === "x" ? random : (random % 4) + 8;
    return value.toString(16);
  });
}

export async function GetAppProperties(
  appLocation: string
): Promise<ApplicationMetaData> {
  let appPath: string = appLocation;
  const isShortCut = await CheckShortCut(appLocation);
  if (isShortCut) appPath = isShortCut as string;

  const tmp = document.createElement("html") as HTMLElement;
  const fileContent = await ReadFile(appPath);
  tmp.innerHTML = fileContent.substring(0, fileContent.indexOf("</head>"));

  const results: ApplicationMetaDataObject = {
    applicationIdentifier: "",
    exeLocation: "",
    iconLocation: "",
    mimeTypes: [],
    title: "",
  };

  for (const value in ApplicationMetaDataFields) {
    if (isNaN(Number(value))) {
      results[value as ApplicationMetaDataFields] = tmp
        .querySelector(`meta[name='${value}']`)
        ?.getAttribute("content") as string;
    }
  }

  results.exeLocation = appPath;

  return results;
}

async function CheckShortCut(path: string): Promise<Path | boolean> {
  const tmp = document.createElement("html") as HTMLElement;
  tmp.innerHTML = await ReadFile(path);

  const isShortCut = tmp
    .querySelector("meta[name='exeLocation']")
    ?.getAttribute("content") as string;

  if (isShortCut) return isShortCut;

  return false;
}

async function ReadFile(path: string): Promise<string> {
  return await OpenFile(path);
}
