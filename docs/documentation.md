### ------------------Project Description----------------------

1. #### Project have below dependencies ----

- **@emotion/react**
- **@emotion/styled**
- **@fontsource/roboto**
- **@mui/base**
- **@mui/icons-material**
- **@mui/lab**
- **@mui/material**
- **@mui/styled-engine-sc**
- **@mui/system**
- **axios**
- **formik**
- **jason-server**
- **react**
- **react-dom**
- **react-router-dom**
- **styled-components**
- **yup**

#### Development rules ----

1. You can not use any function, variable before defining it. (functions are globally hosted even you can't do it because of the eslint strict rules)
2. No unused var -- you can not leave unused code in any file.

-----------Error and Solutions-------------------------

### Problem : " for no-extraneous dependencies error" :

      in command palette (win-> crl + shift + p) run->  ESLint: Restart ESLint Server
      this will restart eslint server and vscode won't show extraneous dep. error


### Problem: “import/no-unresolved”-----

Solution: Inside the project directory, open a terminal and install eslint-import-resolver-typescript package

```javascript
npm install eslint-import-resolver-typescript --save-dev
```

in .eslintrc.cjs add a new property settings, and add below line of code.

```javascript
 settings: {
   'import/resolver': {
     alias: {
       map: [['@', './src']],
       extensions: ['.js', '.jsx', '.ts', '.tsx'],
     },
   },
 },
```

### Problem:

          setting path alias for clean path names while importing any components or module added path alias in tsconfig.json and vite.config.js installed package "path" as dev dependency

           ts was unable to find types for "path" module

solution:
added "@types/node" as dev dependency and enabled node types in tsconfig.json

### Problem:

           setting up eslint, prettier, and airbnb ts style guide

-           tsconfig.json used by typescript compiler and vscode
-          added typescript compiler option rules
-          added files/directories in include array to type check
        eslintrc.cjs
          used by eslint and vscode eslint extension to enforce eslint or any configured style guide rules
          added airbnb style guide rule files in extends array
          modified parserOptions for additional configuration
        .prettierrc
            used by prettier vscode extension and prettier
            added .prettierrc config to be used by prettier to format code files

        problem: eslint not working after adding rules.
        solution: restart vs code

        problem: ts unable to find types for vite-plugin-eslint
        effects: no effects yet.
        solution: unresolved
