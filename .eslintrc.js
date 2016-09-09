module.exports = {
    "extends": "eslint:recommended",
    "env": {
        "browser": true,
        "jquery": true,
        "commonjs": false,
        "node": false
    },
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
        ],
        "no-console":0,
	    "no-unused-vars": [
		    "error",
		    { "varsIgnorePattern": "colors" }
	    ]

    },
    "globals": {
        "buildRangeCollum": true,
        "fillAdvancedSearchOptions": true,
	    "importData": true,
	    "defineEvents": true
    },
};