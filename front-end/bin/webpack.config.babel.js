import Config, { environment } from 'webpack-config';

environment.setAll({
    env: () => process.env.NODE_ENV
});

export default new Config().extend('bin/webpack.[env].config.js');