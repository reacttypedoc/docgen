import chalk from "chalk";
import commander from "commander";
import fs from "fs";
import path from "path";
import ts from "typescript";
import generateDocumentation from "./generateDoc";

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

(() => {
    let options: IOptions =
        commander
            .version("0.0.1")
            .usage("[options] <path>")
            .option("-o --out [path]", "Path to the output directory")
            .parse(process.argv)
            .opts();

    let inputPath = commander.args[0] as (string | undefined);

    // Get the project uri
    let projectPath = inputPath === undefined ? process.cwd() : path.resolve(process.cwd(), inputPath);

    let outDir: string;
    if (options.out === undefined) {
        console.log(chalk`{yellow Warning: There was no out directory specified, defaulting to 'docs'}`);
        outDir = path.resolve(process.cwd(), "docs");
    } else {
        outDir = path.resolve(process.cwd(), options.out);
    }

    // Make sure the files exist
    if (!fs.existsSync(path.resolve(projectPath))) {
        console.log(chalk`{red Error: Directory '${projectPath}' does not exist}`);
        process.exit(1);
    }

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

/**
 * Expand a list of input files.
 *
 * Searches for directories in the input files list and replaces them with a
 * listing of all TypeScript files within them. One may use the ```--exclude``` option
 * to filter out files with a pattern.
 *
 * @param inputFiles  The list of files that should be expanded.
 * @returns  The list of input files with expanded directories.
 */
function expandInputFiles(directory: string): string[] {
    let files: string[] = [];

    function add(dirname: string) {
        fs.readdirSync(dirname).forEach((file) => {
            const realpath = path.join(dirname, file);
            if (fs.statSync(realpath).isDirectory()) {
                add(realpath);
            } else if (/\.tsx?$/.test(realpath)) {
                files.push(realpath);
            }
        });
    }

    add(directory);

    return files;
}