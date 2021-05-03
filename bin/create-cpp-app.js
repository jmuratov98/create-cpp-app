#!/usr/bin/env node

const { program } = require('commander');
const inquirer = require('inquirer');
const path = require('path');
const simpleGit = require('simple-git');

const { version } = require('../package.json');
const { isDirEmpty, loadTemplate, write, createFolderStructure } = require('./utils');

function createAndLoadTemplate(templateName, fileName, dest, locals = {}) {
    const file = loadTemplate(templateName, fileName);
    write(dest, file.render(locals));
}

function createAppStructure({ name, dir, lang }) {
    const FOLDER_STRUCTURE = require('./folder-structure')(name);
    createFolderStructure(FOLDER_STRUCTURE, [dir]);

    const WORKSPACE_DIR = path.join(dir, name);
    const PROJECT_DIR = path.join(dir, name, name);
    const SANDBOX_DIR = path.join(dir, name, 'sandbox');
    const PRJ_INCLUDE_DIR = path.join(PROJECT_DIR, 'include');
    const VSCODE_DIR = path.join(dir, name, '.vscode');
    [
        // Common files that should be in C or C++ projects
        { template: 'common', fileName: 'common.h', filepath: path.join(PRJ_INCLUDE_DIR, name, 'common.h'), locals: { prjname: name } },
        { template: 'common', fileName: 'defines.h', filepath: path.join(PRJ_INCLUDE_DIR, name, 'defines.h'), locals: { lang: lang } },
        { template: 'common', fileName: 'platform_detection.h', filepath: path.join(PRJ_INCLUDE_DIR, name, 'platform_detection.h'), locals: {} },

        // VSCode files:
        // TODO: Ask user if .vscode or premake or cmake
        { template: 'vscode', fileName: 'c_cpp_properties.json', filepath: path.join(VSCODE_DIR, 'c_cpp_properties.json'), locals: { prjname: name } },
        { template: 'vscode', fileName: 'launch.json', filepath: path.join(VSCODE_DIR, 'launch.json'), locals: {} },
        { template: 'vscode', fileName: 'tasks.json', filepath: path.join(VSCODE_DIR, 'tasks.json'), locals: { prjname: name } },

        { template: 'vscode', fileName: 'build-all.bat', filepath: path.join(WORKSPACE_DIR, 'build.bat'), locals: { prjname: name } },
        { template: 'vscode', fileName: 'build-app.bat', filepath: path.join(PROJECT_DIR, 'build.bat'), locals: { prjname: name, lang: lang } },
        { template: 'vscode', fileName: 'build-sandbox.bat', filepath: path.join(SANDBOX_DIR, 'build.bat'), locals: { prjname: name, lang: lang } }
    ].forEach(({ template, fileName, filepath, locals }) => {
        createAndLoadTemplate(template, fileName, filepath, locals);
    });

}

function parseLang(lang) {
    switch (lang) {
        case 'c':
        case 'C':
            return 'c';
        case 'c++':
        case 'C++':
        case 'cpp':
        case 'Cpp':
            return 'cpp';
        default:
            return null;
    }
}

function parse(opts) {
    return {
        name: opts.name,
        dir: opts.dir || false,
        lang: parseLang(opts.lang),
        git: opts.git || false,
        force: opts.force || false,
    };
}

async function promptForMissingArgs(opts) {
    const questions = [];

    if(!opts.name) {
        questions.push({
            type: 'input',
            name: 'name',
            message: 'Name your application?'
        });
    }

    if(!opts.dir) {
        questions.push({
            type: 'input',
            name: 'name',
            message: 'Which directory? (Leave empty for ".")'
        });
    }

    if(!opts.lang) {
        questions.push({
            type: 'list',
            name: 'lang',
            message: 'Please choose which language',
            choices: ['C', 'C++'],
            default: 'C++'
        });
    }

    if(!opts.git) {
        questions.push({
            type: 'confirm',
            name: 'git',
            message: 'Initialize a git repository',
            default: false
        });
    }

    const answers = await inquirer.prompt(questions);
    return {
        ...opts,
        name: opts.name || answers.name,
        dir: opts.dir || answers.dir || '.',
        lang: opts.lang || parseLang(answers.lang),
        git: opts.git || answers.git,
    }
}

async function main(argv) {
    program
        .name('create-cpp-app')
        .version(version, '-v, --version')
        .usage('[options]')
        .option('-g, --git', 'creates a git repository (TODO)')
        .option('-l, --lang [lang]', 'c or c++ (defaults to c++) TODO)')
        .option('-n, --name [name]', 'name of your project')
        .option('-d, --dir [directory]', 'directory where the project will be placed')
        .option('-f, --force', 'forces to create a new project in an existant directory')
        .parse(argv);

    let template
    template = parse(program.opts());
    template = await promptForMissingArgs(template);

    if (isDirEmpty(template.name) || template.force) {
        createAppStructure(template);
    } else {
        // TODO: Later
    }

    if(template.git) {
        const git = simpleGit(path.join(template.dir, template.name))
        try {
            await git
                .init()
                .add('./*')
                .commit('Initial Commit')
        } catch (e) {
            throw e;
        }
    }
}

main(process.argv);
