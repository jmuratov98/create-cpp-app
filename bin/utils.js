const fs = require('fs');
const path = require('path');
const ejs = require('ejs')
const util = require('util');

function mkdir (base, dir) {
    const loc = path.join(base, dir);

    console.log('   \x1b[36mcreate\x1b[0m : ' + loc + path.sep)
    fs.mkdirSync(loc);
}

function createFolderStructureRec(struct, root = ['.']) {
    mkdir(path.join(...root), struct.name);
    if(!struct.children) return;
    struct.children.forEach((folder) => {
        createFolderStructureRec(folder, [...root, struct.name]);
    });
}

module.exports = {
    isDirEmpty: function (prjname) {
        return !fs.existsSync( path.resolve(prjname) );
    },

    write: function (dest, fileContent) {
        fs.writeFileSync(dest, fileContent);
        console.log('   \x1b[36mcreate\x1b[0m : ' + dest);
    },

    loadTemplate: function(template, file) {
        const content = fs.readFileSync(path.join(__dirname, '..', 'templates', template, file), 'utf-8');
        const render = (locals) => {
            return ejs.render(content, locals, { escape: util.inspect });
        }

        return { render }
    },

    createFolderStructure: function(structure) {
        createFolderStructureRec(structure);
    },

    mkdir
}