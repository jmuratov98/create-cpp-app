module.exports = name => ({
    name: name,
    children: [
        {
            name: name,
            children: [
                {
                    name: 'include',
                    children: [{
                        name: name
                    }]
                },
                {
                    name: 'src'
                }
            ]
        },
        {
            name: 'sandbox',
            children: [
                {
                    name: 'include',
                    children: [{
                        name: 'sandbox'
                    }]
                },
                {
                    name: 'src'
                }
            ]
        },
        {
            name: '.vscode'
        }
    ]
});