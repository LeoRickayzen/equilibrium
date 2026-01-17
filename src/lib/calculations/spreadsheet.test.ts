import { describe, it, expect } from "vitest";
import { buildSpreadsheet } from "./spreadsheet";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import type { SpreadsheetInputs, YearlyRow } from "./types";

interface ScenarioData {
  description: string;
  inputs: SpreadsheetInputs;
  expected: YearlyRow[];
}

describe("buildSpreadsheet", () => {
  it("should correctly calculate spreadsheet", () => {
    const scenariosDir = join(__dirname, "__test-scenarios__");
    const scenarioFolders = readdirSync(scenariosDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name)
      .sort();

    expect(scenarioFolders.length).toBeGreaterThan(0);

    scenarioFolders.forEach((folderName) => {
      const scenarioPath = join(scenariosDir, folderName, "scenario.json");
      const scenarioData: ScenarioData = JSON.parse(
        readFileSync(scenarioPath, "utf-8")
      );

      const result = buildSpreadsheet(scenarioData.inputs);

      expect(
        result,
        `${scenarioData.description}: should return correct number of rows`
      ).toHaveLength(scenarioData.expected.length);

      scenarioData.expected.forEach((expectedRow, index) => {
        const actualRow = result[index];
        expect(
          actualRow,
          `${scenarioData.description}: row ${index + 1} (year ${expectedRow.year}) should match exactly`
        ).toEqual(expectedRow);
      });
    });
  });
});
