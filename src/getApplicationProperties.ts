// import {
//   ApplicationMetaData,
//   ApplicationMetaDataFields,
//   ApplicationMetaDataObject,
// } from "@thijmenos/common";
// import { GetShortcutProperties } from "./checkIfShortcut";
// import { ReadFile } from "./readFiles";

// export default async function GetAppProperties(
//   appLocation: string
// ): Promise<ApplicationMetaData> {
//   const metaDataFileName = "thijmenos.appsettings.json";
//   const iconMetadata = await GetShortcutProperties(appLocation);

//   const fileContent = await ReadFile(appPath);
//   tmp.innerHTML = fileContent.substring(0, fileContent.indexOf("</head>"));

//   const results: ApplicationMetaDataObject = {
//     applicationIdentifier: "",
//     exeLocation: "",
//     iconLocation: "",
//     mimeTypes: [],
//     title: "",
//   };

//   for (const value in ApplicationMetaDataFields) {
//     if (isNaN(Number(value))) {
//       results[value as ApplicationMetaDataFields] = tmp
//         .querySelector(`meta[name='${value}']`)
//         ?.getAttribute("content") as string;
//     }
//   }

//   results.exeLocation = appPath;

//   return results;
// }
