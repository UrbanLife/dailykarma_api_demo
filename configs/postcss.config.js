module.exports = {
    plugins: [
        require('autoprefixer')({
            overrideBrowserslist: [
                'Android 2.3',
                'Android >= 4',
                'Chrome >= 35',
                'Firefox >= 31',
                'Explorer >= 10',
                'iOS >= 7',
                'Opera >= 12',
                'Safari >= 7.1'
            ]
        }),
    ]
};
