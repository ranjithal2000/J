/**
 * models
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * OpenAPI spec version: 2.13
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import { ModelsPublishManyResponseFailed } from '././modelsPublishManyResponseFailed';
import { ModelsDeleteManyResponseSucceeded } from '././modelsDeleteManyResponseSucceeded';


export interface ModelsDeleteManyResponse {
    succeeded?: Array<ModelsDeleteManyResponseSucceeded>;
    failed?: Array<ModelsPublishManyResponseFailed>;
}