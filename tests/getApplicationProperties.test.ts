/**
 * @jest-environment jsdom
 */

import { describe, expect, test, jest } from "@jest/globals";
import * as readfileModule from "../src/readFiles";
import * as checkIfShortcutModule from "../src/getShortcutProperties";
import GetApplicationProperties from "../src/getApplicationProperties";
import { ApplicationMetaDataObject } from "@thijmen-os/common";

jest.mock("@thijmen-os/filesystem", () => jest.fn());

const fileToRead = `<head>
<meta name='title' content='NoteBlock' />
<meta name='iconLocation' content='C/OperatingSystem/Icons/thijmen-osFileExplorer.svg' />
<meta name='mimeTypes' content='txt' />
</head>`;

describe("GetApplicationProperties", () => {
  test("Get app properties", async () => {
    jest.spyOn(checkIfShortcutModule, "CheckShortCut").mockResolvedValue(false);
    jest.spyOn(readfileModule, "ReadFile").mockResolvedValue(fileToRead);

    const input = "cantBeEmpty";

    const result = await GetApplicationProperties(input);
    const expected: ApplicationMetaDataObject = {
      applicationIdentifier: undefined,
      exeLocation: input,
      iconLocation: "C/OperatingSystem/Icons/thijmen-osFileExplorer.svg",
      mimeTypes: "txt",
      title: "NoteBlock",
    };

    expect(result).toStrictEqual(expected);
  });
});
