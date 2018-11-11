import chalk from "chalk";
import ts from "typescript";

interface IDocEntry {
    name?: string;
    fileName?: string;
    documentation?: string;
    type?: string;
    entryType?: string;
    constructors?: IDocEntry[];
    parameters?: IDocEntry[];
    returnType?: string;
}

export default function generateDocumentation(fileNames: string[], options: ts.CompilerOptions): IDocumentation {
    let program = ts.createProgram(fileNames, options);
    let checker = program.getTypeChecker();

    let classes: IClass[] = [];

    for (let sourceFile of program.getSourceFiles()) {
        if (!sourceFile.isDeclarationFile) {
            console.log(chalk`{yellow.bold Reading types of file} {yellow '${sourceFile.fileName}'}`);

            ts.forEachChild(sourceFile, (node) => {
                if (ts.isClassDeclaration(node) && node.name !== undefined) {

                }
                console.log(ts.SyntaxKind[node.kind]);
            });
        }
    }

    return {
        classes
    };

}

function isNodeExported(node: ts.Node): boolean {
    return (
        (ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Export) !== 0 ||
        (node.parent.kind === ts.SyntaxKind.SourceFile)
    );
}

//     let output: IDocEntry[] = [];

//     for (const sourceFile of program.getSourceFiles()) {
//         if (!sourceFile.isDeclarationFile) {
//             // Walk the tree to search for classes
//             ts.forEachChild(sourceFile, visit);
//         }
//     }

//     return output;

//     /** visit nodes finding exported classes */
//     function visit(node: ts.Node) {
//         // Only consider exported nodes
//         if (!isNodeExported(node)) {
//             return;
//         }

//         if (ts.isClassDeclaration(node) && node.name !== undefined) {
//             // This is a top level class, get its symbol
//             let symbol = checker.getSymbolAtLocation(node.name);
//             if (symbol !== undefined) {
//                 output.push({... serializeClass(symbol), fileName: node.getSourceFile().fileName, entryType: "class"});
//             }
//             // No need to walk any further, class expressions/inner declarations
//             // cannot be exported
//         } else if (ts.isEnumDeclaration(node)) {
//             // This is an interface, get its symbol
//             let symbol = checker.getSymbolAtLocation(node.name);
//             if (symbol !== undefined) {
//                 output.push({... serializeEnum(symbol), fileName: node.getSourceFile().fileName, entryType: "enum"});
//             }
//         } else if (ts.isModuleDeclaration(node)) {
//             // This is a namespace, visit its children
//             ts.forEachChild(node, visit);
//         }
//     }

//     /** Serialize a symbol into a json object */
//     function serializeSymbol(symbol: ts.Symbol): IDocEntry {
//         return {
//             documentation: ts.displayPartsToString(symbol.getDocumentationComment(checker)),
//             name: symbol.getName(),
//             type: checker.typeToString(
//                 checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration)
//             )
//         };
//     }

//     /** Serialize a class symbol information */
//     function serializeEnum(symbol: ts.Symbol) {
//         let details = serializeSymbol(symbol);

//         return details;
//     }

//     /** Serialize a class symbol information */
//     function serializeClass(symbol: ts.Symbol) {
//         let details = serializeSymbol(symbol);

//         // Get the construct signatures
//         let constructorType = checker.getTypeOfSymbolAtLocation(
//             symbol,
//             symbol.valueDeclaration
//         );
//         details.constructors = constructorType
//             .getConstructSignatures()
//             .map(serializeSignature);
//         return details;
//     }

//     /** Serialize a signature (call or construct) */
//     function serializeSignature(signature: ts.Signature) {
//         return {
//             documentation: ts.displayPartsToString(signature.getDocumentationComment(checker)),
//             parameters: signature.parameters.map(serializeSymbol),
//             returnType: checker.typeToString(signature.getReturnType()),
//         };
//     }

//     /** True if this is visible outside this file, false otherwise */
//     function isNodeExported(node: ts.Node): boolean {
//         return (
//             // tslint:disable-next-line: no-any
//             (ts.getCombinedModifierFlags(node as any) & ts.ModifierFlags.Export) !== 0 ||
//             (node.parent.kind === ts.SyntaxKind.SourceFile)
//         );
//     }
// }