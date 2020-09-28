const chalk = require('chalk');
const generatorDefaults = require('../generator-axon-defaults').defaultConfig;

module.exports = {
    askForApplicationLanguage,
};

async function askForApplicationLanguage() {
    if (this.existingProject) return;

    const applicationLanguageChoices = [
        {
            value: 'java',
            name: 'Java',
        },
        {
            value: 'kotlin',
            name: 'Kotlin (recommended)',
        },
    ];

    const answers = await this.prompt([
        {
            type: 'list',
            name: 'applicationLanguage',
            message: `In Which ${chalk.yellow('*language*')} would you like to generate your application ?`,
            choices: applicationLanguageChoices,
            default: generatorDefaults.applicationLanguage,
        },
    ]);
    this.applicationLanguage = this.jhipsterConfig.applicationLanguage = answers.applicationLanguage;
}
