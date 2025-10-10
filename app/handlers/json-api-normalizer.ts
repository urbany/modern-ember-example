import { dasherize, singularize } from '@warp-drive/utilities/string';
import camelCaseKeys from '../utils/camel-case-keys';
import type {
  RequestContext,
  StructuredDataDocument,
} from '@warp-drive/core/types/request';
import type { Handler, NextFn } from '@warp-drive/core/request';
import type {
  ExistingResourceObject,
  JsonApiDocument,
} from '@warp-drive/core/types/spec/json-api-raw';

export const JSONAPINormalizer: Handler = {
  request<T>(context: RequestContext, next: NextFn<T>) {
    return next(context.request).then((document: StructuredDataDocument<T>) => {
      if (
        document.response &&
        typeof document.response === 'object' &&
        'content' in document.response
      ) {
        const response = document.response as { content: JsonApiDocument };
        response.content = normalizeResponse(response.content);
      }
      return document;
    });
  },
};

function normalizeResponse(content: JsonApiDocument): JsonApiDocument {
  if (Array.isArray(content.included))
    content.included = content.included.map(normalizeResource);

  if (content.data && Array.isArray(content.data)) {
    content.data = content.data.map(normalizeResource);
  } else if (content.data) {
    content.data = normalizeResource(content.data);
  }

  return content;
}

function normalizeResource(
  rawResource: ExistingResourceObject
): ExistingResourceObject {
  rawResource.type = dasherize(singularize(rawResource.type));
  rawResource.attributes = camelCaseKeys(rawResource.attributes);
  return rawResource;

  // const resource = {};
  // fix keys
  // fix type
  // fix urls
  // copy over anything else
  // return resource;
}
