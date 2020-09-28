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

/* eslint-disable consistent-return */
const chalk = require('chalk');
const AppGenerator = require('generator-jhipster/generators/app');
const prompts = require('./prompts');

module.exports = class extends AppGenerator {
    constructor(args, opts) {
        super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint axon')}`);
        }

        this.configOptions = jhContext.configOptions || {};
    }

    get initializing() {
        const phaseFromJHipster = super._initializing();
        const myCustomPhaseSteps = {
            getBlueprintConfig() {
                this.applicationLanguage = this.blueprintConfig.get('applicationLanguage')
            }
        }

        return Object.assign(phaseFromJHipster, myCustomPhaseSteps);
    }

    get prompting() {
        const phaseFromJHipster = super._prompting();
        const myCustomPhaseSteps = {
            askForApplicationLanguage: prompts.askForApplicationLanguage,
            saveBlueprintConfig() {
                this.blueprintConfig.set('applicationLanguage', this.applicationLanguage);
            }
        }

        return Object.assign(phaseFromJHipster, myCustomPhaseSteps);
    }

    get configuring() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._configuring();
    }

    get default() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._default();
    }

    get writing() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._writing();
    }

    get install() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._install();
    }

    get end() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._end();
    }
};
