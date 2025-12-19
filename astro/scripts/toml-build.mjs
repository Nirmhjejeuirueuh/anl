import fs from "fs";
import path from "path";
import * as toml from "toml";

const configFilePath = path.resolve("./src/config/config.toml");
const outputDir = path.resolve("./.astro");
const outputFilePath = path.join(outputDir, "config.generated.json");

/**
 * Convert TOML → JSON once (for build time)
 */
function convertTomlToJson() {
  try {
    const content = fs.readFileSync(configFilePath, "utf8");
    const parsed = toml.parse(content);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputFilePath, JSON.stringify(parsed, null, 2), "utf8");
    console.log(`[toml-build] ✅ Generated ${outputFilePath}`);
  } catch (err) {
    console.error("[toml-build] ❌ Error converting TOML:", err.message);
    process.exit(1);
  }
}

convertTomlToJson();