/** Custom documentation */
interface ICustomDocumentation {
    /** The name of the documention */
    name: string;
    /** The files with the documentation */
    files: { [x: string]: IFile };
}

/** A file */
interface IFile {
    /** The title of the file */
    name: string;
    /** The filetype of the file */
    type: string;
    /** The content of the file */
    content: string;
    /** The path of the file in the repository */
    path: string;
}