"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const commander_1 = tslib_1.__importDefault(require("commander"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const typescript_1 = tslib_1.__importDefault(require("typescript"));
const generateDoc_1 = tslib_1.__importDefault(require("./generateDoc"));
(() => {
    let options = commander_1.default
        .version("0.0.1")
        .usage("[options] <path>")
        .option("-o --out [path]", "Path to the output directory")
        .parse(process.argv)
        .opts();
    let inputPath = commander_1.default.args[0];
    let projectPath = inputPath === undefined ? process.cwd() : path_1.default.resolve(process.cwd(), inputPath);
    let outDir;
    if (options.out === undefined) {
        console.log(chalk_1.default `{yellow Warning: There was no out directory specified, defaulting to 'docs'}`);
        outDir = path_1.default.resolve(process.cwd(), "docs");
    }
    else {
        outDir = path_1.default.resolve(process.cwd(), options.out);
    }
    if (!fs_1.default.existsSync(path_1.default.resolve(projectPath))) {
        console.log(chalk_1.default `{red Error: Directory '${projectPath}' does not exist}`);
        process.exit(1);
    }
    let tsconfigPath = typescript_1.default.findConfigFile(projectPath, (s) => typescript_1.default.sys.fileExists(s), "tsconfig.json");
    if (tsconfigPath === undefined) {
        console.log(chalk_1.default `{red Error: Could not find a valid 'tsconfig.json'.}`);
        process.exit(1);
        return;
    }
    let configSource = typescript_1.default.readJsonConfigFile(tsconfigPath, (s) => typescript_1.default.sys.readFile(s));
    let parsedConfig = typescript_1.default.parseJsonSourceFileConfigFileContent(configSource, {
        fileExists: (s) => typescript_1.default.sys.fileExists(s),
        readDirectory: (s) => typescript_1.default.sys.readDirectory(s),
        readFile: (s) => typescript_1.default.sys.readFile(s),
        useCaseSensitiveFileNames: typescript_1.default.sys.useCaseSensitiveFileNames
    }, projectPath, undefined, "tsconfig.json", undefined);
    let files = expandInputFiles(projectPath);
    console.log(chalk_1.default `{green Using TypeScript {blue v${typescript_1.default.version}}}`);
    console.log(chalk_1.default `{green Using config file {blue ${tsconfigPath}}}`);
    let out = generateDoc_1.default(files, parsedConfig.options);
    console.log(JSON.stringify(out, null, 4));
})();
function expandInputFiles(directory) {
    let files = [];
    function add(dirname) {
        fs_1.default.readdirSync(dirname).forEach((file) => {
            const realpath = path_1.default.join(dirname, file);
            if (fs_1.default.statSync(realpath).isDirectory()) {
                add(realpath);
            }
            else if (/\.tsx?$/.test(realpath)) {
                files.push(realpath);
            }
        });
    }
    add(directory);
    return files;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMERBQTBCO0FBQzFCLGtFQUFrQztBQUNsQyxvREFBb0I7QUFDcEIsd0RBQXdCO0FBQ3hCLG9FQUE0QjtBQUM1Qix3RUFBa0Q7QUFjbEQsQ0FBQyxHQUFHLEVBQUU7SUFFRixJQUFJLE9BQU8sR0FDUCxtQkFBUztTQUNKLE9BQU8sQ0FBQyxPQUFPLENBQUM7U0FDaEIsS0FBSyxDQUFDLGtCQUFrQixDQUFDO1NBQ3pCLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSw4QkFBOEIsQ0FBQztTQUN6RCxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztTQUNuQixJQUFJLEVBQUUsQ0FBQztJQUVoQixJQUFJLFNBQVMsR0FBRyxtQkFBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQXlCLENBQUM7SUFHMUQsSUFBSSxXQUFXLEdBQUcsU0FBUyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxjQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUVuRyxJQUFJLE1BQWMsQ0FBQztJQUNuQixJQUFJLE9BQU8sQ0FBQyxHQUFHLEtBQUssU0FBUyxFQUFFO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBSyxDQUFBLDhFQUE4RSxDQUFDLENBQUM7UUFDakcsTUFBTSxHQUFHLGNBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBQ2hEO1NBQU07UUFDSCxNQUFNLEdBQUcsY0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3JEO0lBR0QsSUFBSSxDQUFDLFlBQUUsQ0FBQyxV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