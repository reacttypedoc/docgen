/** The documentation json output */
interface IDocumentation {
    /** Meta information about the docgen */
    meta: IMeta;

    /** Custom documentation pages mapped to their path name */
    custom: { [x: string]: ICustomDocumentation };

    /** The classes */
    classes: IClass[];

    /** TODO: */
    // interfaces: IInterface[];
    // enums: IEnum[];
    // functions: IFunction[];
}

/** Meta information about the docgen */
interface IMeta {
    /** The version of the docgen */
    version: string;
    /** The date the documentation was generated */
    date: number;
}