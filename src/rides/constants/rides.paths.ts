// Базовый путь модуля поездок (задается при подключении роутера в setup-app).
export const RIDES_PATH = '/api/rides';

// Относительные под-маршруты внутри роутера поездок.
export const RIDES_ROUTES = {
    ROOT: '',
    BY_ID: '/:id',
} as const;
