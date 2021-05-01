# create-cpp-app #
C++ project template generator

## Getting Started ##
### Installation ###
1. Download the repository
2. After relocating to this repository via the terminal run `npm i -g` to gloablly install the CLI

For later: Add this to be a npm package

### Creating a C++ project ###
```bash
create-cpp-app --name my-app
```

### Folder Structure ###
```
my-app
│   README.md
│   build.bat
│
└───.vscode
│   │   c_cpp_properties.json
│   │   launch.json
│   │   tasks.json
│
└───sandbox
│   │   include/sandbox/
│   │   src/
│   
└───my-app
    │   include/my-app/
    │   src/
```

my-app builds into a shared lib which gets linked with sandbox

## Next Up ##
- Add Premake/CMake configurations
- Choose between C/C++ projects
- Make this work for Apple products and Linux Distros
