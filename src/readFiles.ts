import { OpenFile } from "@thijmen-os/filesystem";

export async function ReadFile(path: string): Promise<string> {
  return await OpenFile(path);
}
