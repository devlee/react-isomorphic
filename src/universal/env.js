export const env = process.env.NODE_ENV || 'development';

export const isDev = String(env) === 'development';

export const isClient = String(process.env.CLIENT) === 'true';
