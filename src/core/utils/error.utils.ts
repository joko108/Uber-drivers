import { ValidationError } from "../types/validation-error";

// Оборачивает список ошибок в единый формат ответа: { errorMessage: [...] }
export const createErrorMessages = (
    errors: ValidationError[]
): { errorMessage: ValidationError[] } => {
    return { errorMessage: errors };
};
