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

const baseServerFiles = require('generator-jhipster/generators/server/files').serverFiles;
const writeFilesToDisk = require('generator-jhipster-kotlin/generators/server/files').writeFilesToDisk;
const axonConstants = require('../generator-axon-constants');

/**
 * The default is to use a file path string. It implies use of the template method.
 * For any other config an object { file:.., method:.., template:.. } can be used
 */
const serverFiles = {
    ...baseServerFiles,
    serverBuild: [
        ...baseServerFiles.serverBuild,
        {
            condition: generator => generator.buildTool === 'gradle',
            templates: [{ file: 'gradle/axon.gradle', useBluePrint: true }],
        },
    ],
};

/* eslint-disable no-template-curly-in-string */
function writeFiles() {
    return {

        writeFiles() {
            writeFilesToDisk(serverFiles, this, false,
                this.fetchFromInstalledJHipster('server/templates'));
        },

        modifyFiles() {
            if (this.buildTool === 'gradle') {
                this.addGradleProperty('axon_framework_version', axonConstants.AXON_VERSION);
                this.applyFromGradleScript('gradle/axon');
            }

            if (this.buildTool === 'maven') {
                this.addMavenProperty('axon-framework.version', axonConstants.AXON_VERSION);

                this.addMavenDependency(
                    'org.axonframework',
                    'axon-spring-boot-starter',
                    '${axon-framework.version}'
                );
            }
        },
    };
}

module.exports = {
    writeFiles,
    serverFiles,
};
