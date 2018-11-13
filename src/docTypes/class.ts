// TODO: Create class interface
interface IClass {
    /** The name of the class */
    name: string;
    /** The description of the class */
    description: string;
    /** The classes this class extends */
    extends: string[];
    /** The classes constructs */
    constructs: IClassConstruct[];

    /** The meta information about the class */
    meta: IClassMeta;
}

interface IClassMeta {
    /** The line of the file the class is on */
    line: number;
    /** The file that the class is declared in */
    file: string;
    /** The path to the file */
    path: string;
}

interface IClassConstruct {
    /** The name of the constructor */
    name: string;
    /** The parameters */
    params: IParameters[];
}