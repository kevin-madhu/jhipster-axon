/**
 * Copyright 2020 the original author or authors from the Axipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
