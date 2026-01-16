module.exports = function (plop) {
    plop.setGenerator('component', {
        description: 'Create a reusable UI component',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Component name (e.g., PrimaryButton)',
            },
        ],
        actions: [
            {
                type: 'add',
                path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
                templateFile: '.agent/templates/plop/component/component.hbs',
            },
            {
                type: 'add',
                path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.module.css',
                templateFile: '.agent/templates/plop/component/styles.hbs',
            },
            {
                type: 'add',
                path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.test.tsx',
                templateFile: '.agent/templates/plop/component/test.hbs',
            },
        ],
    });
};
