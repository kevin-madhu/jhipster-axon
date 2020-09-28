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
