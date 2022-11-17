/**
 * @jest-environment jsdom
 */

import { describe, expect, test, jest } from "@jest/globals";
import * as readfileModule from "../src/readFiles";
import { CheckShortCut } from "../src/getShortcutProperties";

jest.mock("@thijmenos/filesystem", () => jest.fn());

describe("checkIfShortcut", () => {
  test("File is shortcut, return path", async () => {
    const shortcut =
      "<meta name='exeLocation' content='C/ProgramFiles/fileexplorer/file-explorer.html' />";

    jest.spyOn(readfileModule, "ReadFile").mockResolvedValue(shortcut);
    const input = "stringMustNotBeEmpty";

    const data = await CheckShortCut(input);

    expect(data).toBe("C/ProgramFiles/fileexplorer/file-explorer.html");
  });

  test("path is empty, throw error", async () => {
    const input = "";

    const output = await CheckShortCut(input);

    expect(output).toBeNull();
  });

  test("File is exe, return false", async () => {
    const exe =
      "<meta name='title' content='NoteBlock' /><meta name='iconLocation' content='C/OperatingSystem/Icons/ThijmenOsFileExplorer.svg' />";

    jest.spyOn(readfileModule, "ReadFile").mockResolvedValue(exe);
    const input = "stringMustNotBeEmpty";

    const output = await CheckShortCut(input);

    expect(output).toBeFalsy();
  });
});
