
import  { type  UserWithoutHashPasswords } from 'shared/build/index.js';

declare module 'fastify' {
    interface FastifyRequest {
        user?: UserWithoutHashPasswords;
        rawBody?: string | null;
        fileBuffer?: FileUploadRequestDto;
    }
}