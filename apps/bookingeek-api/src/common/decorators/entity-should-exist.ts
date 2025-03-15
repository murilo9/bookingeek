import { SetMetadata, applyDecorators } from '@nestjs/common';

/**
 * This decorator allows the usage of the EntityExistsGuard.
 * @param idRequestParam The param of the entity ID in the route
 * @param entityCollection The collection to be fetched at the database
 * @param entityName The name of the entity (to show the 404 message)
 * @returns
 */
export const EntityShouldExist = (
  idOrSlugRequestParam: string,
  entityCollection: string,
  entityName: string,
) =>
  applyDecorators(
    SetMetadata('idOrSlugRequestParam', idOrSlugRequestParam),
    SetMetadata('entityCollection', entityCollection),
    SetMetadata('entityName', entityName),
  );
