import { IconMetadataShape } from "@thijmenos/common";
import { ReadFile } from "./readFiles";

export async function GetShortcutProperties(
  path: string
): Promise<IconMetadataShape> {
  if (!path || !path.length) {
    return null;
  }

  const file = await ReadFile(path);
  const iconMetadata: IconMetadataShape = JSON.parse(file);

  return iconMetadata;
}
