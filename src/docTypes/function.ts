interface IParameters {
    /** The name of the parameter */
    name: string;
    /** The description of the parameter */
    description?: string;
    /** If the parameter is optional or not */
    optional: boolean;
    /** If the parameter takes the rest of the parameters */
    rest: boolean;
    /** The type of the parameter */
    type: string;
    /** The default value of the parameter */
    default: string;
}