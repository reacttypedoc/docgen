import chalk from "chalk";
import commander from "commander";
import fs from "fs";
import inquirer from "inquirer";
import path from "path";
import ts from "typescript";
import generateDocumentation from "./generateDoc";
import { expandInputFiles } from "./util";

// Declaration for types of the arguments
export interface IOptions {
    out?: string;
}

export interface ITSConfig {
    compilerOptions: ts.CompilerOptions;
    files: string[];
    include: string[];
    exclude: string[];
}

// Show pallate
let styles = [
    "bold", "dim", "italic", "underline", "inverse", "strikethrough", "black",
    "red", "green", "yellow", "blue", "magenta", "cyan", "white", "gray", "bgBlack",
    "bgRed", "bgGreen", "bgYellow", "bgBlue", "bgMagenta", "bgCyan", "bgWhite",
];
console.log(styles.map(x => chalk`{${x} ${x}}`).join(" "));

// TODO: gIT intEgrATION AND INQUIRERE
(async () => {
    let options: IOptions =
        commander
            .version("0.0.1")
            .usage("[options] <path>")
            // .option("-o --out [path]", "Path to the output directory")
            .parse(process.argv)
            .opts();

    let rawPath = commander.args[0] as (string | undefined);

    // Get the project uri
    let projectPath = rawPath === undefined ? process.cwd() : path.resolve(process.cwd(), rawPath);

    // let outDir: string;
    // if (options.out === undefined) {
    //     console.log(chalk`{yellow Warning: There was no out directory specified, defaulting to 'docs'}`);
    //     outDir = path.resolve(process.cwd(), "docs");
    // } else {
    //     outDir = path.resolve(process.cwd(), options.out);
    // }

    // Make sure the files exist
    if (!fs.existsSync(path.resolve(projectPath))) {
        console.log(chalk`{red Error: Directory '${projectPath}' does not exist}`);
        process.exit(1);
        return;
    } else {
        console.log(chalk`{green Using project directory {blue '${projectPath}'}}`);
    }

    enum OutputType {
        Bundled,
        JSON,
        Branch
    }
    interface IPromptResult {
        outputType: "bundled";
    }
    let promptResults = await inquirer.prompt<IPromptResult>([
        {
            choices: [
                {
                    name: "Bundled (single version)",
                    value: OutputType.Bundled
                },
                {
                    name: "Single JSON file with the documentation",
                    value: OutputType.JSON
                },
                {
                    name: "In a 'docs' branch (Must be hosted on github)",
                    value: OutputType.Branch
                }
            ],
            message: "How should the documentation be outputed",
            name: "outputType",
            type: "list",
        }
    ]);
    console.log(promptResults);

    console.log(docsBranch.name());
    console.log(remote.name(), remote.url());
    console.log(repository.path());

    // TODO: FINISH GIT INTEGRATION
    return;

    let tsconfigPath = ts.findConfigFile(projectPath, (s) => ts.sys.fileExists(s), "tsconfig.json");

    if (tsconfigPath === undefined) {
        console.log(chalk`{red Error: Could not find a valid 'tsconfig.json'.}`);
        process.exit(1);
        return;
    }

    // Read config file and get compiler options
    // let { compilerOptions } = ts.readConfigFile(tsconfigPath, (s) => ts.sys.readFile(s)).config as ITSConfig;

    let configSource = ts.readJsonConfigFile(tsconfigPath, (s) => ts.sys.readFile(s));
    let parsedConfig = ts.parseJsonSourceFileConfigFileContent(configSource, {
        fileExists: (s) => ts.sys.fileExists(s),
        readDirectory: (s) => ts.sys.readDirectory(s),
        readFile: (s) => ts.sys.readFile(s),
        useCaseSensitiveFileNames: ts.sys.useCaseSensitiveFileNames
    }, projectPath, undefined, "tsconfig.json", undefined);

    let files = expandInputFiles(projectPath);

    console.log(chalk`{green Using TypeScript {blue v${ts.version}}}`);
    console.log(chalk`{green Using config file {blue ${tsconfigPath}}}`);

    // TODO: GIT INTEGRATION
    let out = generateDocumentation(files, parsedConfig.options);

    console.log(JSON.stringify(out, null, 4));
})();