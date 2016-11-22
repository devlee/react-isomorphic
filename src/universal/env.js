export const env = process.env.NODE_ENV || 'development';

export const isDev = env === 'development';

export const isClient = process.env.CLIENT === 'true';
