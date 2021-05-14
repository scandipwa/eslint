const constructMessage = require('./messages.js');


function withCapitalizedInitial(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

// "types" in file name that must be included as part of the class name.
const REQUIRE_INCLUDE_TYPE = [
    "component"
]

function getNamePartsFromFilename(filename) {
    const namePartsWithExtension = filename.split(".");
    return namePartsWithExtension.slice(0, -1);
}

function shouldClassNameBeEnforced(filename) {
    return filename != "index.js"
}

function getExpectedClassNameFromFilename(filename) {
    const parts = getNamePartsFromFilename(filename);

    if(parts.length > 1) {
        const [baseName, type] = parts;
        return withCapitalizedInitial(baseName) + withCapitalizedInitial(type);
    }

    const [baseName] = parts;
    return withCapitalizedInitial(baseName);
}

function getUnexpectedNameMessage(filename, expectedName, actualName) {
    const error = `In Scandi, class names need to be based on the file name. Since the filename is ${filename} the class name should be ${expectedName}.`;
    const help = `To fix this error, rename ${actualName} to ${expectedName}.`;
    const documentationLink = "https://github.com/scandipwa/eslint/blob/master/docs/rules/derived-class-names.md"

    return constructMessage(error, help, documentationLink)
}

module.exports = {
    shouldClassNameBeEnforced,
    getExpectedClassNameFromFilename,
    getUnexpectedNameMessage
}