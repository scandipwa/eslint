/**
 * @fileoverview Class name must match the name of the file it is declared in.
 * @author Jegors Batovs
 */

const {getFilenameFromPath} = require("../util/path.js");
const {shouldClassNameBeEnforced, getExpectedClassNameFromFilename, getUnexpectedNameMessage} = require("../util/derived-class-name.js");

module.exports = {
    meta: {
        docs: {
            description: 'Class name must match the name of the file it is declared in.',
            category: 'Coding standard',
            recommended: true
        },
        fixable: 'code'
    },

    create: context => ({
        ClassDeclaration(node) {
            const filePath = context.getFilename();
            const filename = getFilenameFromPath(filePath);

            if (!shouldClassNameBeEnforced(filename)) {
                return;
            }

            const expectedName = getExpectedClassNameFromFilename(filename);
            const actualName = node.id.name;

            if (expectedName !== actualName) {
                const { id: { loc } } = node;
                context.report({
                    loc,
                    message: getUnexpectedNameMessage(filename, expectedName, actualName),
                    fix: fixer => fixer.replaceText(node.id, expectedName)
                });
            }
        }
    })
};
