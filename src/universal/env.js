const pwa = process.env.PWA;

export const env = process.env.NODE_ENV || 'development';

export const isPwa = String(pwa) === 'true';

export const isDev = String(env) === 'development';

export const isClient = String(process.env.CLIENT) === 'true';
