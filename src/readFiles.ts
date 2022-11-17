import { OpenFile } from "@thijmenos/filesystem";

export async function ReadFile(path: string): Promise<string> {
  return await OpenFile(path);
}
