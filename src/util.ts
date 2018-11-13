import fs from "fs";
import path from "path";

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
export function expandInputFiles(directory: string): string[] {
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