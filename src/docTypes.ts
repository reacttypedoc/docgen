interface IMember {
    name: string;
    fileName: string;
    location: [number, number];
}

interface IClass extends IMember {
    constructor: IFunction;
    methods: IFunction[];
}

interface IFunction {
    name?: string;
    returnType: string;
    parameters: IParameter[];
}

interface IParameter {
    name: string;
    rest: boolean;
    optional: boolean;
    default?: string | number;
}

interface IDocumentation {
    classes: IClass[];
    // interfaces: IInterface[];
    // enums: IEnum[];
    // functions: IFunction[];
}