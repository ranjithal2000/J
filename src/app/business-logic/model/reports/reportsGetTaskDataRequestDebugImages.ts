/**
 * reports
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * OpenAPI spec version: 999.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */



export interface ReportsGetTaskDataRequestDebugImages {
    /**
     * Max number of latest iterations for which to return debug images
     */
    iters?: number;
    /**
     * List of metrics and variants
     */
    metrics?: Array<object>;
}