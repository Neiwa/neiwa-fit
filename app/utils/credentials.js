const environment = process.env.NODE_ENV || 'production';

// eslint-disable-next-line global-require
export default require(`../../credentials.${environment}.json`);
