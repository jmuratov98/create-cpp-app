#!/usr/bin/env node

const { program } = require('commander');
const path = require('path');

const { version } = require('../package.json');
const { isDirEmpty, loadTemplate, write, createFolderStructure } = require('./utils');

function createAndLoadTemplate(templateName, fileName, dest, locals = {}) {
    const file = loadTemplate(templateName, fileName);
    write( dest, file.render(locals) );
}

function createAppStructure(name) {
    const FOLDER_STRUCTURE = require('./folder-structure')(name);
    createFolderStructure(FOLDER_STRUCTURE);
   
    const PRJ_INCLUDE_DIR = path.join(name, name, 'include');
    const VSCODE_DIR = path.join(name, '.vscode');
    [
        { template: 'cpp', fileName: 'common.h', filepath: path.join(PRJ_INCLUDE_DIR, name, 'common.h'), locals: { prjname: name } },
        { template: 'cpp', fileName: 'defines.h', filepath: path.join(PRJ_INCLUDE_DIR, name, 'defines.h'), locals: { lang: 'cpp' } },
        { template: 'cpp', fileName: 'platform_detection.h', filepath: path.join(PRJ_INCLUDE_DIR, name, 'platform_detection.h'), locals: {} },

        // VSCode files:
        // TODO: Ask user if .vscode or premake or cmake
        { template: 'vscode', fileName: 'c_cpp_properties.json', filepath: path.join(VSCODE_DIR, 'c_cpp_properties.json'), locals: { prjname: name } },
        { template: 'vscode', fileName: 'launch.json', filepath: path.join(VSCODE_DIR, 'launch.json'), locals: {} },
        { template: 'vscode', fileName: 'tasks.json', filepath: path.join(VSCODE_DIR, 'tasks.json'), locals: { prjname: name } },

        { template: 'vscode', fileName: 'build-all.bat', filepath: path.join(name, 'build.bat'), locals: { prjname: name } },
        { template: 'vscode', fileName: 'build-app.bat', filepath: path.join(name, name, 'build.bat'), locals: { prjname: name } },
        { template: 'vscode', fileName: 'build-sandbox.bat', filepath: path.join(name, 'sandbox', 'build.bat'), locals: { prjname: name } }
    ].forEach(({ template, fileName, filepath, locals }) => {
        createAndLoadTemplate( template, fileName, filepath, locals );
    });

}

function parse(opts) {
    switch(opts.lang) {
        case 'c':
            break;
        case 'c++':
        case 'cpp':
        default:
            break;
    }

    if(isDirEmpty(opts.name)) {
        createAppStructure(opts.name)
    } else {
         // TODO: Later
    }
}

function main(argv) {
    program
        .name('create-cpp-app')
        .version(version, '-v, --version')
        .usage('[options] [dir]')
        .option('-g, --git', 'creates a git repository (TODO)')
        .option('-l, --lang <lang>', 'c or c++ (defaults to c++) TODO)')
        .option('-n, --name <name>', 'name of your project')
        .parse(argv);

    parse(program.opts());
}

main(process.argv);
