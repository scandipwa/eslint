/**
 * @fileoverview Create a configuration file for your component in favor to declaring configuration right inside of it.
 * @author Jegors Batovs
 */

const extractDeclaration = (declarationOrExport) => {
    if (declarationOrExport.type.includes('Export')) {
        return declarationOrExport.declaration;
    }

    return declarationOrExport;
};

const prohibitedOnLevelOne = [
    'Literal'
];

module.exports = {
    meta: {
        docs: {
            description:
                'Create a configuration file for your component in favor to declaring configuration right inside of it.',
            category: 'Coding standard',
            recommended: true,
        },
    },

    create: (context) => ({
        Program(node) {
            const { body } = node;
            body.forEach((declarationOrExport) => {
                const declaration = extractDeclaration(declarationOrExport);

                // Only variables are prohibited
                if (!declaration || declaration.type !== 'VariableDeclaration') {
                    return;
                }

                // Process all first level declarations
                declaration.declarations.forEach((declarator) => {
                    if (prohibitedOnLevelOne.includes(declarator.init.type)) {
                        context.report({
                            node: declarationOrExport,
                            message: 'Move the configuration constants to .config file',
                        });
                    }
                });
            });
        },
    }),
};