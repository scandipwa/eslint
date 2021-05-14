const assert = require("assert");

const {withCapitalizedInitial, getNamePartsFromFilename, getExpectedClassNameFromFilename} = require('./derived-class-name.js');

describe("getExpectedClassNameFromFilename", ()=>{
    it("should correctly return the expected component class name", ()=>{
        assert.strictEqual(
            getExpectedClassNameFromFilename("Header.component.js"),
            "HeaderComponent"
        )
    })

    it("should correctly return the expected dispatcher class name", ()=>{
        assert.strictEqual(
            getExpectedClassNameFromFilename("Breadcrumbs.dispatcher.js"),
            "BreadcrumbsDispatcher"
        )
    })

    it("should correctly return the expected query class name", ()=>{
        assert.strictEqual(
            getExpectedClassNameFromFilename("Category.query.js"),
            "CategoryQuery"
        )
    })

    it("should work when the filename indicates no component type", ()=>{
        assert.strictEqual(
            getExpectedClassNameFromFilename("test.js"),
            "Test"
        )
    })
})