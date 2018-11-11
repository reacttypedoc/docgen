"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const typescript_1 = tslib_1.__importDefault(require("typescript"));
function generateDocumentation(fileNames, options) {
    let program = typescript_1.default.createProgram(fileNames, options);
    let checker = program.getTypeChecker();
    let classes = [];
    for (let sourceFile of program.getSourceFiles()) {
        if (!sourceFile.isDeclarationFile) {
            console.log(chalk_1.default `{yellow.bold Reading types of file} {yellow '${sourceFile.fileName}'}`);
            typescript_1.default.forEachChild(sourceFile, (node) => {
                if (typescript_1.default.isClassDeclaration(node) && node.name !== undefined) {
                }
                console.log(typescript_1.default.SyntaxKind[node.kind]);
            });
        }
    }
    return {
        classes
    };
}
exports.default = generateDocumentation;
function isNodeExported(node) {
    return ((typescript_1.default.getCombinedModifierFlags(node) & typescript_1.default.ModifierFlags.Export) !== 0 ||
        (node.parent.kind === typescript_1.default.SyntaxKind.SourceFile));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVEb2MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZ2VuZXJhdGVEb2MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMERBQTBCO0FBQzFCLG9FQUE0QjtBQWE1QixTQUF3QixxQkFBcUIsQ0FBQyxTQUFtQixFQUFFLE9BQTJCO0lBQzFGLElBQUksT0FBTyxHQUFHLG9CQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNuRCxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsY0FBYyxFQUFFLENBQUM7SUFFdkMsSUFBSSxPQUFPLEdBQWEsRUFBRSxDQUFDO0lBRTNCLEtBQUssSUFBSSxVQUFVLElBQUksT0FBTyxDQUFDLGNBQWMsRUFBRSxFQUFFO1FBQzdDLElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLEVBQUU7WUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFLLENBQUEsZ0RBQWdELFVBQVUsQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDO1lBRTFGLG9CQUFFLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNqQyxJQUFJLG9CQUFFLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7aUJBRTNEO2dCQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUMsQ0FBQyxDQUFDLENBQUM7U0FDTjtLQUNKO0lBRUQsT0FBTztRQUNILE9BQU87S0FDVixDQUFDO0FBRU4sQ0FBQztBQXZCRCx3Q0F1QkM7QUFFRCxTQUFTLGNBQWMsQ0FBQyxJQUFhO0lBQ2pDLE9BQU8sQ0FDSCxDQUFDLG9CQUFFLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLEdBQUcsb0JBQUUsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNuRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLG9CQUFFLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUNsRCxDQUFDO0FBQ04sQ0FBQyJ9