import { parseXmlBody as parseBody, parseXmlErrorBody as parseErrorBody } from "@aws-sdk/core";
import { HttpRequest as __HttpRequest } from "@smithy/protocol-http";
import { collectBody, decorateServiceException as __decorateServiceException, expectNonNull as __expectNonNull, expectString as __expectString, extendedEncodeURIComponent as __extendedEncodeURIComponent, getArrayIfSingleItem as __getArrayIfSingleItem, parseBoolean as __parseBoolean, parseRfc3339DateTimeWithOffset as __parseRfc3339DateTimeWithOffset, withBaseException, } from "@smithy/smithy-client";
import { AuthorizationErrorException, BatchEntryIdsNotDistinctException, BatchRequestTooLongException, ConcurrentAccessException, EmptyBatchRequestException, EndpointDisabledException, FilterPolicyLimitExceededException, InternalErrorException, InvalidBatchEntryIdException, InvalidParameterException, InvalidParameterValueException, InvalidSecurityException, InvalidStateException, KMSAccessDeniedException, KMSDisabledException, KMSInvalidStateException, KMSNotFoundException, KMSOptInRequired, KMSThrottlingException, NotFoundException, OptedOutException, PlatformApplicationDisabledException, ReplayLimitExceededException, ResourceNotFoundException, StaleTagException, SubscriptionLimitExceededException, TagLimitExceededException, TagPolicyException, ThrottledException, TooManyEntriesInBatchRequestException, TopicLimitExceededException, UserErrorException, ValidationException, VerificationException, } from "../models/models_0";
import { SNSServiceException as __BaseException } from "../models/SNSServiceException";
export const se_AddPermissionCommand = async (input, context) => {
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
        ...se_AddPermissionInput(input, context),
        [_A]: _AP,
        [_V]: _,
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_CheckIfPhoneNumberIsOptedOutCommand = async (input, context) => {
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
        ...se_CheckIfPhoneNumberIsOptedOutInput(input, context),
        [_A]: _CIPNIOO,
        [_V]: _,
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_ConfirmSubscriptionCommand = async (input, context) => {
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
        ...se_ConfirmSubscriptionInput(input, context),
        [_A]: _CS,
        [_V]: _,
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_CreatePlatformApplicationCommand = async (input, context) => {
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
        ...se_CreatePlatformApplicationInput(input, context),
        [_A]: _CPA,
        [_V]: _,
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_CreatePlatformEndpointCommand = async (input, context) => {
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
        ...se_CreatePlatformEndpointInput(input, context),
        [_A]: _CPE,
        [_V]: _,
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_CreateSMSSandboxPhoneNumberCommand = async (input, context) => {
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
        ...se_CreateSMSSandboxPhoneNumberInput(input, context),
        [_A]: _CSMSSPN,
        [_V]: _,
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_CreateTopicCommand = async (input, context) => {
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
        ...se_CreateTopicInput(input, context),
        [_A]: _CT,
        [_V]: _,
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_DeleteEndpointCommand = async (input, context) => {
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
        ...se_DeleteEndpointInput(input, context),
        [_A]: _DE,
        [_V]: _,
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_DeletePlatformApplicationCommand = async (input, context) => {
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
        ...se_DeletePlatformApplicationInput(input, context),
        [_A]: _DPA,
        [_V]: _,
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_DeleteSMSSandboxPhoneNumberCommand = async (input, context) => {
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
        ...se_DeleteSMSSandboxPhoneNumberInput(input, context),
        [_A]: _DSMSSPN,
        [_V]: _,
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_DeleteTopicCommand = async (input, context) => {
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
        ...se_DeleteTopicInput(input, context),
        [_A]: _DT,
        [_V]: _,
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_GetDataProtectionPolicyCommand = async (input, context) => {
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
        ...se_GetDataProtectionPolicyInput(input, context),
        [_A]: _GDPP,
        [_V]: _,
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_GetEndpointAttributesCommand = async (input, context) => {
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
        ...se_GetEndpointAttributesInput(input, context),
        [_A]: _GEA,
        [_V]: _,
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_GetPlatformApplicationAttributesCommand = async (input, context) => {
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
        ...se_GetPlatformApplicationAttributesInput(input, context),
        [_A]: _GPAA,
        [_V]: _,
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_GetSMSAttributesCommand = async (input, context) => {
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
        ...se_GetSMSAttributesInput(input, context),
        [_A]: _GSMSA,
        [_V]: _,
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_GetSMSSandboxAccountStatusCommand = async (input, context) => {
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
        ...se_GetSMSSandboxAccountStatusInput(input, context),
        [_A]: _GSMSSAS,
        [_V]: _,
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_GetSubscriptionAttributesCommand = async (input, context) => {
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
        ...se_GetSubscriptionAttributesInput(input, context),
        [_A]: _GSA,
        [_V]: _,
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_GetTopicAttributesCommand = async (input, context) => {
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
        ...se_GetTopicAttributesInput(input, context),
        [_A]: _GTA,
        [_V]: _,
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_ListEndpointsByPlatformApplicationCommand = async (input, context) => {
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
        ...se_ListEndpointsByPlatformApplicationInput(input, context),
        [_A]: _LEBPA,
        [_V]: _,
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_ListOriginationNumbersCommand = async (input, context) => {
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
        ...se_ListOriginationNumbersRequest(input, context),
        [_A]: _LON,
        [_V]: _,
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_ListPhoneNumbersOptedOutCommand = async (input, context) => {
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
        ...se_ListPhoneNumbersOptedOutInput(input, context),
        [_A]: _LPNOO,
        [_V]: _,
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_ListPlatformApplicationsCommand = async (input, context) => {
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
        ...se_ListPlatformApplicationsInput(input, context),
        [_A]: _LPA,
        [_V]: _,
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_ListSMSSandboxPhoneNumbersCommand = async (input, context) => {
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
        ...se_ListSMSSandboxPhoneNumbersInput(input, context),
        [_A]: _LSMSSPN,
        [_V]: _,
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_ListSubscriptionsCommand = async (input, context) => {
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
        ...se_ListSubscriptionsInput(input, context),
        [_A]: _LS,
        [_V]: _,
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_ListSubscriptionsByTopicCommand = async (input, context) => {
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
        ...se_ListSubscriptionsByTopicInput(input, context),
        [_A]: _LSBT,
        [_V]: _,
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_ListTagsForResourceCommand = async (input, context) => {
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
        ...se_ListTagsForResourceRequest(input, context),
        [_A]: _LTFR,
        [_V]: _,
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_ListTopicsCommand = async (input, context) => {
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
        ...se_ListTopicsInput(input, context),
        [_A]: _LT,
        [_V]: _,
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_OptInPhoneNumberCommand = async (input, context) => {
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
        ...se_OptInPhoneNumberInput(input, context),
        [_A]: _OIPN,
        [_V]: _,
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_PublishCommand = async (input, context) => {
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
        ...se_PublishInput(input, context),
        [_A]: _P,
        [_V]: _,
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_PublishBatchCommand = async (input, context) => {
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
        ...se_PublishBatchInput(input, context),
        [_A]: _PB,
        [_V]: _,
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_PutDataProtectionPolicyCommand = async (input, context) => {
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
        ...se_PutDataProtectionPolicyInput(input, context),
        [_A]: _PDPP,
        [_V]: _,
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_RemovePermissionCommand = async (input, context) => {
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
        ...se_RemovePermissionInput(input, context),
        [_A]: _RP,
        [_V]: _,
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_SetEndpointAttributesCommand = async (input, context) => {
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
        ...se_SetEndpointAttributesInput(input, context),
        [_A]: _SEA,
        [_V]: _,
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_SetPlatformApplicationAttributesCommand = async (input, context) => {
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
        ...se_SetPlatformApplicationAttributesInput(input, context),
        [_A]: _SPAA,
        [_V]: _,
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_SetSMSAttributesCommand = async (input, context) => {
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
        ...se_SetSMSAttributesInput(input, context),
        [_A]: _SSMSA,
        [_V]: _,
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_SetSubscriptionAttributesCommand = async (input, context) => {
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
        ...se_SetSubscriptionAttributesInput(input, context),
        [_A]: _SSA,
        [_V]: _,
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_SetTopicAttributesCommand = async (input, context) => {
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
        ...se_SetTopicAttributesInput(input, context),
        [_A]: _STA,
        [_V]: _,
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_SubscribeCommand = async (input, context) => {
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
        ...se_SubscribeInput(input, context),
        [_A]: _S,
        [_V]: _,
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_TagResourceCommand = async (input, context) => {
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
        ...se_TagResourceRequest(input, context),
        [_A]: _TR,
        [_V]: _,
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_UnsubscribeCommand = async (input, context) => {
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
        ...se_UnsubscribeInput(input, context),
        [_A]: _U,
        [_V]: _,
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_UntagResourceCommand = async (input, context) => {
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
        ...se_UntagResourceRequest(input, context),
        [_A]: _UR,
        [_V]: _,
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const se_VerifySMSSandboxPhoneNumberCommand = async (input, context) => {
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
        ...se_VerifySMSSandboxPhoneNumberInput(input, context),
        [_A]: _VSMSSPN,
        [_V]: _,
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
export const de_AddPermissionCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return response;
};
export const de_CheckIfPhoneNumberIsOptedOutCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = de_CheckIfPhoneNumberIsOptedOutResponse(data.CheckIfPhoneNumberIsOptedOutResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_ConfirmSubscriptionCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = de_ConfirmSubscriptionResponse(data.ConfirmSubscriptionResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_CreatePlatformApplicationCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = de_CreatePlatformApplicationResponse(data.CreatePlatformApplicationResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_CreatePlatformEndpointCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = de_CreateEndpointResponse(data.CreatePlatformEndpointResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_CreateSMSSandboxPhoneNumberCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = de_CreateSMSSandboxPhoneNumberResult(data.CreateSMSSandboxPhoneNumberResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_CreateTopicCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = de_CreateTopicResponse(data.CreateTopicResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_DeleteEndpointCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return response;
};
export const de_DeletePlatformApplicationCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return response;
};
export const de_DeleteSMSSandboxPhoneNumberCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = de_DeleteSMSSandboxPhoneNumberResult(data.DeleteSMSSandboxPhoneNumberResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_DeleteTopicCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return response;
};
export const de_GetDataProtectionPolicyCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = de_GetDataProtectionPolicyResponse(data.GetDataProtectionPolicyResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_GetEndpointAttributesCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = de_GetEndpointAttributesResponse(data.GetEndpointAttributesResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_GetPlatformApplicationAttributesCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = de_GetPlatformApplicationAttributesResponse(data.GetPlatformApplicationAttributesResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_GetSMSAttributesCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = de_GetSMSAttributesResponse(data.GetSMSAttributesResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_GetSMSSandboxAccountStatusCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = de_GetSMSSandboxAccountStatusResult(data.GetSMSSandboxAccountStatusResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_GetSubscriptionAttributesCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = de_GetSubscriptionAttributesResponse(data.GetSubscriptionAttributesResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_GetTopicAttributesCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = de_GetTopicAttributesResponse(data.GetTopicAttributesResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_ListEndpointsByPlatformApplicationCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = de_ListEndpointsByPlatformApplicationResponse(data.ListEndpointsByPlatformApplicationResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_ListOriginationNumbersCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = de_ListOriginationNumbersResult(data.ListOriginationNumbersResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_ListPhoneNumbersOptedOutCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = de_ListPhoneNumbersOptedOutResponse(data.ListPhoneNumbersOptedOutResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_ListPlatformApplicationsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = de_ListPlatformApplicationsResponse(data.ListPlatformApplicationsResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_ListSMSSandboxPhoneNumbersCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = de_ListSMSSandboxPhoneNumbersResult(data.ListSMSSandboxPhoneNumbersResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_ListSubscriptionsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = de_ListSubscriptionsResponse(data.ListSubscriptionsResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_ListSubscriptionsByTopicCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = de_ListSubscriptionsByTopicResponse(data.ListSubscriptionsByTopicResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_ListTagsForResourceCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = de_ListTagsForResourceResponse(data.ListTagsForResourceResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_ListTopicsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = de_ListTopicsResponse(data.ListTopicsResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_OptInPhoneNumberCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = de_OptInPhoneNumberResponse(data.OptInPhoneNumberResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_PublishCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = de_PublishResponse(data.PublishResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_PublishBatchCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = de_PublishBatchResponse(data.PublishBatchResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_PutDataProtectionPolicyCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return response;
};
export const de_RemovePermissionCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return response;
};
export const de_SetEndpointAttributesCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return response;
};
export const de_SetPlatformApplicationAttributesCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return response;
};
export const de_SetSMSAttributesCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = de_SetSMSAttributesResponse(data.SetSMSAttributesResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_SetSubscriptionAttributesCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return response;
};
export const de_SetTopicAttributesCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return response;
};
export const de_SubscribeCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = de_SubscribeResponse(data.SubscribeResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_TagResourceCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = de_TagResourceResponse(data.TagResourceResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_UnsubscribeCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return response;
};
export const de_UntagResourceCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = de_UntagResourceResponse(data.UntagResourceResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
export const de_VerifySMSSandboxPhoneNumberCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = de_VerifySMSSandboxPhoneNumberResult(data.VerifySMSSandboxPhoneNumberResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_CommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadQueryErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AuthorizationError":
        case "com.amazonaws.sns#AuthorizationErrorException":
            throw await de_AuthorizationErrorExceptionRes(parsedOutput, context);
        case "InternalError":
        case "com.amazonaws.sns#InternalErrorException":
            throw await de_InternalErrorExceptionRes(parsedOutput, context);
        case "InvalidParameter":
        case "com.amazonaws.sns#InvalidParameterException":
            throw await de_InvalidParameterExceptionRes(parsedOutput, context);
        case "NotFound":
        case "com.amazonaws.sns#NotFoundException":
            throw await de_NotFoundExceptionRes(parsedOutput, context);
        case "Throttled":
        case "com.amazonaws.sns#ThrottledException":
            throw await de_ThrottledExceptionRes(parsedOutput, context);
        case "FilterPolicyLimitExceeded":
        case "com.amazonaws.sns#FilterPolicyLimitExceededException":
            throw await de_FilterPolicyLimitExceededExceptionRes(parsedOutput, context);
        case "ReplayLimitExceeded":
        case "com.amazonaws.sns#ReplayLimitExceededException":
            throw await de_ReplayLimitExceededExceptionRes(parsedOutput, context);
        case "SubscriptionLimitExceeded":
        case "com.amazonaws.sns#SubscriptionLimitExceededException":
            throw await de_SubscriptionLimitExceededExceptionRes(parsedOutput, context);
        case "OptedOut":
        case "com.amazonaws.sns#OptedOutException":
            throw await de_OptedOutExceptionRes(parsedOutput, context);
        case "UserError":
        case "com.amazonaws.sns#UserErrorException":
            throw await de_UserErrorExceptionRes(parsedOutput, context);
        case "ConcurrentAccess":
        case "com.amazonaws.sns#ConcurrentAccessException":
            throw await de_ConcurrentAccessExceptionRes(parsedOutput, context);
        case "InvalidSecurity":
        case "com.amazonaws.sns#InvalidSecurityException":
            throw await de_InvalidSecurityExceptionRes(parsedOutput, context);
        case "StaleTag":
        case "com.amazonaws.sns#StaleTagException":
            throw await de_StaleTagExceptionRes(parsedOutput, context);
        case "TagLimitExceeded":
        case "com.amazonaws.sns#TagLimitExceededException":
            throw await de_TagLimitExceededExceptionRes(parsedOutput, context);
        case "TagPolicy":
        case "com.amazonaws.sns#TagPolicyException":
            throw await de_TagPolicyExceptionRes(parsedOutput, context);
        case "TopicLimitExceeded":
        case "com.amazonaws.sns#TopicLimitExceededException":
            throw await de_TopicLimitExceededExceptionRes(parsedOutput, context);
        case "ResourceNotFound":
        case "com.amazonaws.sns#ResourceNotFoundException":
            throw await de_ResourceNotFoundExceptionRes(parsedOutput, context);
        case "InvalidState":
        case "com.amazonaws.sns#InvalidStateException":
            throw await de_InvalidStateExceptionRes(parsedOutput, context);
        case "ValidationException":
        case "com.amazonaws.sns#ValidationException":
            throw await de_ValidationExceptionRes(parsedOutput, context);
        case "EndpointDisabled":
        case "com.amazonaws.sns#EndpointDisabledException":
            throw await de_EndpointDisabledExceptionRes(parsedOutput, context);
        case "KMSAccessDenied":
        case "com.amazonaws.sns#KMSAccessDeniedException":
            throw await de_KMSAccessDeniedExceptionRes(parsedOutput, context);
        case "KMSDisabled":
        case "com.amazonaws.sns#KMSDisabledException":
            throw await de_KMSDisabledExceptionRes(parsedOutput, context);
        case "KMSInvalidState":
        case "com.amazonaws.sns#KMSInvalidStateException":
            throw await de_KMSInvalidStateExceptionRes(parsedOutput, context);
        case "KMSNotFound":
        case "com.amazonaws.sns#KMSNotFoundException":
            throw await de_KMSNotFoundExceptionRes(parsedOutput, context);
        case "KMSOptInRequired":
        case "com.amazonaws.sns#KMSOptInRequired":
            throw await de_KMSOptInRequiredRes(parsedOutput, context);
        case "KMSThrottling":
        case "com.amazonaws.sns#KMSThrottlingException":
            throw await de_KMSThrottlingExceptionRes(parsedOutput, context);
        case "ParameterValueInvalid":
        case "com.amazonaws.sns#InvalidParameterValueException":
            throw await de_InvalidParameterValueExceptionRes(parsedOutput, context);
        case "PlatformApplicationDisabled":
        case "com.amazonaws.sns#PlatformApplicationDisabledException":
            throw await de_PlatformApplicationDisabledExceptionRes(parsedOutput, context);
        case "BatchEntryIdsNotDistinct":
        case "com.amazonaws.sns#BatchEntryIdsNotDistinctException":
            throw await de_BatchEntryIdsNotDistinctExceptionRes(parsedOutput, context);
        case "BatchRequestTooLong":
        case "com.amazonaws.sns#BatchRequestTooLongException":
            throw await de_BatchRequestTooLongExceptionRes(parsedOutput, context);
        case "EmptyBatchRequest":
        case "com.amazonaws.sns#EmptyBatchRequestException":
            throw await de_EmptyBatchRequestExceptionRes(parsedOutput, context);
        case "InvalidBatchEntryId":
        case "com.amazonaws.sns#InvalidBatchEntryIdException":
            throw await de_InvalidBatchEntryIdExceptionRes(parsedOutput, context);
        case "TooManyEntriesInBatchRequest":
        case "com.amazonaws.sns#TooManyEntriesInBatchRequestException":
            throw await de_TooManyEntriesInBatchRequestExceptionRes(parsedOutput, context);
        case "VerificationException":
        case "com.amazonaws.sns#VerificationException":
            throw await de_VerificationExceptionRes(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            return throwDefaultError({
                output,
                parsedBody: parsedBody.Error,
                errorCode,
            });
    }
};
const de_AuthorizationErrorExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = de_AuthorizationErrorException(body.Error, context);
    const exception = new AuthorizationErrorException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const de_BatchEntryIdsNotDistinctExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = de_BatchEntryIdsNotDistinctException(body.Error, context);
    const exception = new BatchEntryIdsNotDistinctException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const de_BatchRequestTooLongExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = de_BatchRequestTooLongException(body.Error, context);
    const exception = new BatchRequestTooLongException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const de_ConcurrentAccessExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = de_ConcurrentAccessException(body.Error, context);
    const exception = new ConcurrentAccessException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const de_EmptyBatchRequestExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = de_EmptyBatchRequestException(body.Error, context);
    const exception = new EmptyBatchRequestException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const de_EndpointDisabledExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = de_EndpointDisabledException(body.Error, context);
    const exception = new EndpointDisabledException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const de_FilterPolicyLimitExceededExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = de_FilterPolicyLimitExceededException(body.Error, context);
    const exception = new FilterPolicyLimitExceededException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const de_InternalErrorExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = de_InternalErrorException(body.Error, context);
    const exception = new InternalErrorException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const de_InvalidBatchEntryIdExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = de_InvalidBatchEntryIdException(body.Error, context);
    const exception = new InvalidBatchEntryIdException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const de_InvalidParameterExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = de_InvalidParameterException(body.Error, context);
    const exception = new InvalidParameterException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const de_InvalidParameterValueExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = de_InvalidParameterValueException(body.Error, context);
    const exception = new InvalidParameterValueException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const de_InvalidSecurityExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = de_InvalidSecurityException(body.Error, context);
    const exception = new InvalidSecurityException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const de_InvalidStateExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = de_InvalidStateException(body.Error, context);
    const exception = new InvalidStateException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const de_KMSAccessDeniedExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = de_KMSAccessDeniedException(body.Error, context);
    const exception = new KMSAccessDeniedException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const de_KMSDisabledExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = de_KMSDisabledException(body.Error, context);
    const exception = new KMSDisabledException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const de_KMSInvalidStateExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = de_KMSInvalidStateException(body.Error, context);
    const exception = new KMSInvalidStateException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const de_KMSNotFoundExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = de_KMSNotFoundException(body.Error, context);
    const exception = new KMSNotFoundException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const de_KMSOptInRequiredRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = de_KMSOptInRequired(body.Error, context);
    const exception = new KMSOptInRequired({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const de_KMSThrottlingExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = de_KMSThrottlingException(body.Error, context);
    const exception = new KMSThrottlingException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const de_NotFoundExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = de_NotFoundException(body.Error, context);
    const exception = new NotFoundException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const de_OptedOutExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = de_OptedOutException(body.Error, context);
    const exception = new OptedOutException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const de_PlatformApplicationDisabledExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = de_PlatformApplicationDisabledException(body.Error, context);
    const exception = new PlatformApplicationDisabledException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const de_ReplayLimitExceededExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = de_ReplayLimitExceededException(body.Error, context);
    const exception = new ReplayLimitExceededException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const de_ResourceNotFoundExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = de_ResourceNotFoundException(body.Error, context);
    const exception = new ResourceNotFoundException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const de_StaleTagExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = de_StaleTagException(body.Error, context);
    const exception = new StaleTagException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const de_SubscriptionLimitExceededExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = de_SubscriptionLimitExceededException(body.Error, context);
    const exception = new SubscriptionLimitExceededException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const de_TagLimitExceededExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = de_TagLimitExceededException(body.Error, context);
    const exception = new TagLimitExceededException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const de_TagPolicyExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = de_TagPolicyException(body.Error, context);
    const exception = new TagPolicyException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const de_ThrottledExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = de_ThrottledException(body.Error, context);
    const exception = new ThrottledException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const de_TooManyEntriesInBatchRequestExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = de_TooManyEntriesInBatchRequestException(body.Error, context);
    const exception = new TooManyEntriesInBatchRequestException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const de_TopicLimitExceededExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = de_TopicLimitExceededException(body.Error, context);
    const exception = new TopicLimitExceededException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const de_UserErrorExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = de_UserErrorException(body.Error, context);
    const exception = new UserErrorException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const de_ValidationExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = de_ValidationException(body.Error, context);
    const exception = new ValidationException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const de_VerificationExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = de_VerificationException(body.Error, context);
    const exception = new VerificationException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return __decorateServiceException(exception, body);
};
const se_ActionsList = (input, context) => {
    const entries = {};
    let counter = 1;
    for (const entry of input) {
        if (entry === null) {
            continue;
        }
        entries[`member.${counter}`] = entry;
        counter++;
    }
    return entries;
};
const se_AddPermissionInput = (input, context) => {
    const entries = {};
    if (input[_TA] != null) {
        entries[_TA] = input[_TA];
    }
    if (input[_L] != null) {
        entries[_L] = input[_L];
    }
    if (input[_AWSAI] != null) {
        const memberEntries = se_DelegatesList(input[_AWSAI], context);
        if (input[_AWSAI]?.length === 0) {
            entries.AWSAccountId = [];
        }
        Object.entries(memberEntries).forEach(([key, value]) => {
            const loc = `AWSAccountId.${key}`;
            entries[loc] = value;
        });
    }
    if (input[_AN] != null) {
        const memberEntries = se_ActionsList(input[_AN], context);
        if (input[_AN]?.length === 0) {
            entries.ActionName = [];
        }
        Object.entries(memberEntries).forEach(([key, value]) => {
            const loc = `ActionName.${key}`;
            entries[loc] = value;
        });
    }
    return entries;
};
const se_CheckIfPhoneNumberIsOptedOutInput = (input, context) => {
    const entries = {};
    if (input[_pN] != null) {
        entries[_pN] = input[_pN];
    }
    return entries;
};
const se_ConfirmSubscriptionInput = (input, context) => {
    const entries = {};
    if (input[_TA] != null) {
        entries[_TA] = input[_TA];
    }
    if (input[_T] != null) {
        entries[_T] = input[_T];
    }
    if (input[_AOU] != null) {
        entries[_AOU] = input[_AOU];
    }
    return entries;
};
const se_CreatePlatformApplicationInput = (input, context) => {
    const entries = {};
    if (input[_N] != null) {
        entries[_N] = input[_N];
    }
    if (input[_Pl] != null) {
        entries[_Pl] = input[_Pl];
    }
    if (input[_At] != null) {
        const memberEntries = se_MapStringToString(input[_At], context);
        Object.entries(memberEntries).forEach(([key, value]) => {
            const loc = `Attributes.${key}`;
            entries[loc] = value;
        });
    }
    return entries;
};
const se_CreatePlatformEndpointInput = (input, context) => {
    const entries = {};
    if (input[_PAA] != null) {
        entries[_PAA] = input[_PAA];
    }
    if (input[_T] != null) {
        entries[_T] = input[_T];
    }
    if (input[_CUD] != null) {
        entries[_CUD] = input[_CUD];
    }
    if (input[_At] != null) {
        const memberEntries = se_MapStringToString(input[_At], context);
        Object.entries(memberEntries).forEach(([key, value]) => {
            const loc = `Attributes.${key}`;
            entries[loc] = value;
        });
    }
    return entries;
};
const se_CreateSMSSandboxPhoneNumberInput = (input, context) => {
    const entries = {};
    if (input[_PN] != null) {
        entries[_PN] = input[_PN];
    }
    if (input[_LC] != null) {
        entries[_LC] = input[_LC];
    }
    return entries;
};
const se_CreateTopicInput = (input, context) => {
    const entries = {};
    if (input[_N] != null) {
        entries[_N] = input[_N];
    }
    if (input[_At] != null) {
        const memberEntries = se_TopicAttributesMap(input[_At], context);
        Object.entries(memberEntries).forEach(([key, value]) => {
            const loc = `Attributes.${key}`;
            entries[loc] = value;
        });
    }
    if (input[_Ta] != null) {
        const memberEntries = se_TagList(input[_Ta], context);
        if (input[_Ta]?.length === 0) {
            entries.Tags = [];
        }
        Object.entries(memberEntries).forEach(([key, value]) => {
            const loc = `Tags.${key}`;
            entries[loc] = value;
        });
    }
    if (input[_DPP] != null) {
        entries[_DPP] = input[_DPP];
    }
    return entries;
};
const se_DelegatesList = (input, context) => {
    const entries = {};
    let counter = 1;
    for (const entry of input) {
        if (entry === null) {
            continue;
        }
        entries[`member.${counter}`] = entry;
        counter++;
    }
    return entries;
};
const se_DeleteEndpointInput = (input, context) => {
    const entries = {};
    if (input[_EA] != null) {
        entries[_EA] = input[_EA];
    }
    return entries;
};
const se_DeletePlatformApplicationInput = (input, context) => {
    const entries = {};
    if (input[_PAA] != null) {
        entries[_PAA] = input[_PAA];
    }
    return entries;
};
const se_DeleteSMSSandboxPhoneNumberInput = (input, context) => {
    const entries = {};
    if (input[_PN] != null) {
        entries[_PN] = input[_PN];
    }
    return entries;
};
const se_DeleteTopicInput = (input, context) => {
    const entries = {};
    if (input[_TA] != null) {
        entries[_TA] = input[_TA];
    }
    return entries;
};
const se_GetDataProtectionPolicyInput = (input, context) => {
    const entries = {};
    if (input[_RA] != null) {
        entries[_RA] = input[_RA];
    }
    return entries;
};
const se_GetEndpointAttributesInput = (input, context) => {
    const entries = {};
    if (input[_EA] != null) {
        entries[_EA] = input[_EA];
    }
    return entries;
};
const se_GetPlatformApplicationAttributesInput = (input, context) => {
    const entries = {};
    if (input[_PAA] != null) {
        entries[_PAA] = input[_PAA];
    }
    return entries;
};
const se_GetSMSAttributesInput = (input, context) => {
    const entries = {};
    if (input[_a] != null) {
        const memberEntries = se_ListString(input[_a], context);
        if (input[_a]?.length === 0) {
            entries.attributes = [];
        }
        Object.entries(memberEntries).forEach(([key, value]) => {
            const loc = `attributes.${key}`;
            entries[loc] = value;
        });
    }
    return entries;
};
const se_GetSMSSandboxAccountStatusInput = (input, context) => {
    const entries = {};
    return entries;
};
const se_GetSubscriptionAttributesInput = (input, context) => {
    const entries = {};
    if (input[_SA] != null) {
        entries[_SA] = input[_SA];
    }
    return entries;
};
const se_GetTopicAttributesInput = (input, context) => {
    const entries = {};
    if (input[_TA] != null) {
        entries[_TA] = input[_TA];
    }
    return entries;
};
const se_ListEndpointsByPlatformApplicationInput = (input, context) => {
    const entries = {};
    if (input[_PAA] != null) {
        entries[_PAA] = input[_PAA];
    }
    if (input[_NT] != null) {
        entries[_NT] = input[_NT];
    }
    return entries;
};
const se_ListOriginationNumbersRequest = (input, context) => {
    const entries = {};
    if (input[_NT] != null) {
        entries[_NT] = input[_NT];
    }
    if (input[_MR] != null) {
        entries[_MR] = input[_MR];
    }
    return entries;
};
const se_ListPhoneNumbersOptedOutInput = (input, context) => {
    const entries = {};
    if (input[_nT] != null) {
        entries[_nT] = input[_nT];
    }
    return entries;
};
const se_ListPlatformApplicationsInput = (input, context) => {
    const entries = {};
    if (input[_NT] != null) {
        entries[_NT] = input[_NT];
    }
    return entries;
};
const se_ListSMSSandboxPhoneNumbersInput = (input, context) => {
    const entries = {};
    if (input[_NT] != null) {
        entries[_NT] = input[_NT];
    }
    if (input[_MR] != null) {
        entries[_MR] = input[_MR];
    }
    return entries;
};
const se_ListString = (input, context) => {
    const entries = {};
    let counter = 1;
    for (const entry of input) {
        if (entry === null) {
            continue;
        }
        entries[`member.${counter}`] = entry;
        counter++;
    }
    return entries;
};
const se_ListSubscriptionsByTopicInput = (input, context) => {
    const entries = {};
    if (input[_TA] != null) {
        entries[_TA] = input[_TA];
    }
    if (input[_NT] != null) {
        entries[_NT] = input[_NT];
    }
    return entries;
};
const se_ListSubscriptionsInput = (input, context) => {
    const entries = {};
    if (input[_NT] != null) {
        entries[_NT] = input[_NT];
    }
    return entries;
};
const se_ListTagsForResourceRequest = (input, context) => {
    const entries = {};
    if (input[_RA] != null) {
        entries[_RA] = input[_RA];
    }
    return entries;
};
const se_ListTopicsInput = (input, context) => {
    const entries = {};
    if (input[_NT] != null) {
        entries[_NT] = input[_NT];
    }
    return entries;
};
const se_MapStringToString = (input, context) => {
    const entries = {};
    let counter = 1;
    Object.keys(input)
        .filter((key) => input[key] != null)
        .forEach((key) => {
        entries[`entry.${counter}.key`] = key;
        entries[`entry.${counter}.value`] = input[key];
        counter++;
    });
    return entries;
};
const se_MessageAttributeMap = (input, context) => {
    const entries = {};
    let counter = 1;
    Object.keys(input)
        .filter((key) => input[key] != null)
        .forEach((key) => {
        entries[`entry.${counter}.Name`] = key;
        const memberEntries = se_MessageAttributeValue(input[key], context);
        Object.entries(memberEntries).forEach(([key, value]) => {
            entries[`entry.${counter}.Value.${key}`] = value;
        });
        counter++;
    });
    return entries;
};
const se_MessageAttributeValue = (input, context) => {
    const entries = {};
    if (input[_DTa] != null) {
        entries[_DTa] = input[_DTa];
    }
    if (input[_SV] != null) {
        entries[_SV] = input[_SV];
    }
    if (input[_BV] != null) {
        entries[_BV] = context.base64Encoder(input[_BV]);
    }
    return entries;
};
const se_OptInPhoneNumberInput = (input, context) => {
    const entries = {};
    if (input[_pN] != null) {
        entries[_pN] = input[_pN];
    }
    return entries;
};
const se_PublishBatchInput = (input, context) => {
    const entries = {};
    if (input[_TA] != null) {
        entries[_TA] = input[_TA];
    }
    if (input[_PBRE] != null) {
        const memberEntries = se_PublishBatchRequestEntryList(input[_PBRE], context);
        if (input[_PBRE]?.length === 0) {
            entries.PublishBatchRequestEntries = [];
        }
        Object.entries(memberEntries).forEach(([key, value]) => {
            const loc = `PublishBatchRequestEntries.${key}`;
            entries[loc] = value;
        });
    }
    return entries;
};
const se_PublishBatchRequestEntry = (input, context) => {
    const entries = {};
    if (input[_I] != null) {
        entries[_I] = input[_I];
    }
    if (input[_M] != null) {
        entries[_M] = input[_M];
    }
    if (input[_Su] != null) {
        entries[_Su] = input[_Su];
    }
    if (input[_MS] != null) {
        entries[_MS] = input[_MS];
    }
    if (input[_MA] != null) {
        const memberEntries = se_MessageAttributeMap(input[_MA], context);
        Object.entries(memberEntries).forEach(([key, value]) => {
            const loc = `MessageAttributes.${key}`;
            entries[loc] = value;
        });
    }
    if (input[_MDI] != null) {
        entries[_MDI] = input[_MDI];
    }
    if (input[_MGI] != null) {
        entries[_MGI] = input[_MGI];
    }
    return entries;
};
const se_PublishBatchRequestEntryList = (input, context) => {
    const entries = {};
    let counter = 1;
    for (const entry of input) {
        if (entry === null) {
            continue;
        }
        const memberEntries = se_PublishBatchRequestEntry(entry, context);
        Object.entries(memberEntries).forEach(([key, value]) => {
            entries[`member.${counter}.${key}`] = value;
        });
        counter++;
    }
    return entries;
};
const se_PublishInput = (input, context) => {
    const entries = {};
    if (input[_TA] != null) {
        entries[_TA] = input[_TA];
    }
    if (input[_TAa] != null) {
        entries[_TAa] = input[_TAa];
    }
    if (input[_PN] != null) {
        entries[_PN] = input[_PN];
    }
    if (input[_M] != null) {
        entries[_M] = input[_M];
    }
    if (input[_Su] != null) {
        entries[_Su] = input[_Su];
    }
    if (input[_MS] != null) {
        entries[_MS] = input[_MS];
    }
    if (input[_MA] != null) {
        const memberEntries = se_MessageAttributeMap(input[_MA], context);
        Object.entries(memberEntries).forEach(([key, value]) => {
            const loc = `MessageAttributes.${key}`;
            entries[loc] = value;
        });
    }
    if (input[_MDI] != null) {
        entries[_MDI] = input[_MDI];
    }
    if (input[_MGI] != null) {
        entries[_MGI] = input[_MGI];
    }
    return entries;
};
const se_PutDataProtectionPolicyInput = (input, context) => {
    const entries = {};
    if (input[_RA] != null) {
        entries[_RA] = input[_RA];
    }
    if (input[_DPP] != null) {
        entries[_DPP] = input[_DPP];
    }
    return entries;
};
const se_RemovePermissionInput = (input, context) => {
    const entries = {};
    if (input[_TA] != null) {
        entries[_TA] = input[_TA];
    }
    if (input[_L] != null) {
        entries[_L] = input[_L];
    }
    return entries;
};
const se_SetEndpointAttributesInput = (input, context) => {
    const entries = {};
    if (input[_EA] != null) {
        entries[_EA] = input[_EA];
    }
    if (input[_At] != null) {
        const memberEntries = se_MapStringToString(input[_At], context);
        Object.entries(memberEntries).forEach(([key, value]) => {
            const loc = `Attributes.${key}`;
            entries[loc] = value;
        });
    }
    return entries;
};
const se_SetPlatformApplicationAttributesInput = (input, context) => {
    const entries = {};
    if (input[_PAA] != null) {
        entries[_PAA] = input[_PAA];
    }
    if (input[_At] != null) {
        const memberEntries = se_MapStringToString(input[_At], context);
        Object.entries(memberEntries).forEach(([key, value]) => {
            const loc = `Attributes.${key}`;
            entries[loc] = value;
        });
    }
    return entries;
};
const se_SetSMSAttributesInput = (input, context) => {
    const entries = {};
    if (input[_a] != null) {
        const memberEntries = se_MapStringToString(input[_a], context);
        Object.entries(memberEntries).forEach(([key, value]) => {
            const loc = `attributes.${key}`;
            entries[loc] = value;
        });
    }
    return entries;
};
const se_SetSubscriptionAttributesInput = (input, context) => {
    const entries = {};
    if (input[_SA] != null) {
        entries[_SA] = input[_SA];
    }
    if (input[_ANt] != null) {
        entries[_ANt] = input[_ANt];
    }
    if (input[_AV] != null) {
        entries[_AV] = input[_AV];
    }
    return entries;
};
const se_SetTopicAttributesInput = (input, context) => {
    const entries = {};
    if (input[_TA] != null) {
        entries[_TA] = input[_TA];
    }
    if (input[_ANt] != null) {
        entries[_ANt] = input[_ANt];
    }
    if (input[_AV] != null) {
        entries[_AV] = input[_AV];
    }
    return entries;
};
const se_SubscribeInput = (input, context) => {
    const entries = {};
    if (input[_TA] != null) {
        entries[_TA] = input[_TA];
    }
    if (input[_Pr] != null) {
        entries[_Pr] = input[_Pr];
    }
    if (input[_E] != null) {
        entries[_E] = input[_E];
    }
    if (input[_At] != null) {
        const memberEntries = se_SubscriptionAttributesMap(input[_At], context);
        Object.entries(memberEntries).forEach(([key, value]) => {
            const loc = `Attributes.${key}`;
            entries[loc] = value;
        });
    }
    if (input[_RSA] != null) {
        entries[_RSA] = input[_RSA];
    }
    return entries;
};
const se_SubscriptionAttributesMap = (input, context) => {
    const entries = {};
    let counter = 1;
    Object.keys(input)
        .filter((key) => input[key] != null)
        .forEach((key) => {
        entries[`entry.${counter}.key`] = key;
        entries[`entry.${counter}.value`] = input[key];
        counter++;
    });
    return entries;
};
const se_Tag = (input, context) => {
    const entries = {};
    if (input[_K] != null) {
        entries[_K] = input[_K];
    }
    if (input[_Va] != null) {
        entries[_Va] = input[_Va];
    }
    return entries;
};
const se_TagKeyList = (input, context) => {
    const entries = {};
    let counter = 1;
    for (const entry of input) {
        if (entry === null) {
            continue;
        }
        entries[`member.${counter}`] = entry;
        counter++;
    }
    return entries;
};
const se_TagList = (input, context) => {
    const entries = {};
    let counter = 1;
    for (const entry of input) {
        if (entry === null) {
            continue;
        }
        const memberEntries = se_Tag(entry, context);
        Object.entries(memberEntries).forEach(([key, value]) => {
            entries[`member.${counter}.${key}`] = value;
        });
        counter++;
    }
    return entries;
};
const se_TagResourceRequest = (input, context) => {
    const entries = {};
    if (input[_RA] != null) {
        entries[_RA] = input[_RA];
    }
    if (input[_Ta] != null) {
        const memberEntries = se_TagList(input[_Ta], context);
        if (input[_Ta]?.length === 0) {
            entries.Tags = [];
        }
        Object.entries(memberEntries).forEach(([key, value]) => {
            const loc = `Tags.${key}`;
            entries[loc] = value;
        });
    }
    return entries;
};
const se_TopicAttributesMap = (input, context) => {
    const entries = {};
    let counter = 1;
    Object.keys(input)
        .filter((key) => input[key] != null)
        .forEach((key) => {
        entries[`entry.${counter}.key`] = key;
        entries[`entry.${counter}.value`] = input[key];
        counter++;
    });
    return entries;
};
const se_UnsubscribeInput = (input, context) => {
    const entries = {};
    if (input[_SA] != null) {
        entries[_SA] = input[_SA];
    }
    return entries;
};
const se_UntagResourceRequest = (input, context) => {
    const entries = {};
    if (input[_RA] != null) {
        entries[_RA] = input[_RA];
    }
    if (input[_TK] != null) {
        const memberEntries = se_TagKeyList(input[_TK], context);
        if (input[_TK]?.length === 0) {
            entries.TagKeys = [];
        }
        Object.entries(memberEntries).forEach(([key, value]) => {
            const loc = `TagKeys.${key}`;
            entries[loc] = value;
        });
    }
    return entries;
};
const se_VerifySMSSandboxPhoneNumberInput = (input, context) => {
    const entries = {};
    if (input[_PN] != null) {
        entries[_PN] = input[_PN];
    }
    if (input[_OTP] != null) {
        entries[_OTP] = input[_OTP];
    }
    return entries;
};
const de_AuthorizationErrorException = (output, context) => {
    const contents = {};
    if (output[_m] != null) {
        contents[_m] = __expectString(output[_m]);
    }
    return contents;
};
const de_BatchEntryIdsNotDistinctException = (output, context) => {
    const contents = {};
    if (output[_m] != null) {
        contents[_m] = __expectString(output[_m]);
    }
    return contents;
};
const de_BatchRequestTooLongException = (output, context) => {
    const contents = {};
    if (output[_m] != null) {
        contents[_m] = __expectString(output[_m]);
    }
    return contents;
};
const de_BatchResultErrorEntry = (output, context) => {
    const contents = {};
    if (output[_I] != null) {
        contents[_I] = __expectString(output[_I]);
    }
    if (output[_C] != null) {
        contents[_C] = __expectString(output[_C]);
    }
    if (output[_M] != null) {
        contents[_M] = __expectString(output[_M]);
    }
    if (output[_SF] != null) {
        contents[_SF] = __parseBoolean(output[_SF]);
    }
    return contents;
};
const de_BatchResultErrorEntryList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return de_BatchResultErrorEntry(entry, context);
    });
};
const de_CheckIfPhoneNumberIsOptedOutResponse = (output, context) => {
    const contents = {};
    if (output[_iOO] != null) {
        contents[_iOO] = __parseBoolean(output[_iOO]);
    }
    return contents;
};
const de_ConcurrentAccessException = (output, context) => {
    const contents = {};
    if (output[_m] != null) {
        contents[_m] = __expectString(output[_m]);
    }
    return contents;
};
const de_ConfirmSubscriptionResponse = (output, context) => {
    const contents = {};
    if (output[_SA] != null) {
        contents[_SA] = __expectString(output[_SA]);
    }
    return contents;
};
const de_CreateEndpointResponse = (output, context) => {
    const contents = {};
    if (output[_EA] != null) {
        contents[_EA] = __expectString(output[_EA]);
    }
    return contents;
};
const de_CreatePlatformApplicationResponse = (output, context) => {
    const contents = {};
    if (output[_PAA] != null) {
        contents[_PAA] = __expectString(output[_PAA]);
    }
    return contents;
};
const de_CreateSMSSandboxPhoneNumberResult = (output, context) => {
    const contents = {};
    return contents;
};
const de_CreateTopicResponse = (output, context) => {
    const contents = {};
    if (output[_TA] != null) {
        contents[_TA] = __expectString(output[_TA]);
    }
    return contents;
};
const de_DeleteSMSSandboxPhoneNumberResult = (output, context) => {
    const contents = {};
    return contents;
};
const de_EmptyBatchRequestException = (output, context) => {
    const contents = {};
    if (output[_m] != null) {
        contents[_m] = __expectString(output[_m]);
    }
    return contents;
};
const de_Endpoint = (output, context) => {
    const contents = {};
    if (output[_EA] != null) {
        contents[_EA] = __expectString(output[_EA]);
    }
    if (output.Attributes === "") {
        contents[_At] = {};
    }
    else if (output[_At] != null && output[_At][_e] != null) {
        contents[_At] = de_MapStringToString(__getArrayIfSingleItem(output[_At][_e]), context);
    }
    return contents;
};
const de_EndpointDisabledException = (output, context) => {
    const contents = {};
    if (output[_m] != null) {
        contents[_m] = __expectString(output[_m]);
    }
    return contents;
};
const de_FilterPolicyLimitExceededException = (output, context) => {
    const contents = {};
    if (output[_m] != null) {
        contents[_m] = __expectString(output[_m]);
    }
    return contents;
};
const de_GetDataProtectionPolicyResponse = (output, context) => {
    const contents = {};
    if (output[_DPP] != null) {
        contents[_DPP] = __expectString(output[_DPP]);
    }
    return contents;
};
const de_GetEndpointAttributesResponse = (output, context) => {
    const contents = {};
    if (output.Attributes === "") {
        contents[_At] = {};
    }
    else if (output[_At] != null && output[_At][_e] != null) {
        contents[_At] = de_MapStringToString(__getArrayIfSingleItem(output[_At][_e]), context);
    }
    return contents;
};
const de_GetPlatformApplicationAttributesResponse = (output, context) => {
    const contents = {};
    if (output.Attributes === "") {
        contents[_At] = {};
    }
    else if (output[_At] != null && output[_At][_e] != null) {
        contents[_At] = de_MapStringToString(__getArrayIfSingleItem(output[_At][_e]), context);
    }
    return contents;
};
const de_GetSMSAttributesResponse = (output, context) => {
    const contents = {};
    if (output.attributes === "") {
        contents[_a] = {};
    }
    else if (output[_a] != null && output[_a][_e] != null) {
        contents[_a] = de_MapStringToString(__getArrayIfSingleItem(output[_a][_e]), context);
    }
    return contents;
};
const de_GetSMSSandboxAccountStatusResult = (output, context) => {
    const contents = {};
    if (output[_IIS] != null) {
        contents[_IIS] = __parseBoolean(output[_IIS]);
    }
    return contents;
};
const de_GetSubscriptionAttributesResponse = (output, context) => {
    const contents = {};
    if (output.Attributes === "") {
        contents[_At] = {};
    }
    else if (output[_At] != null && output[_At][_e] != null) {
        contents[_At] = de_SubscriptionAttributesMap(__getArrayIfSingleItem(output[_At][_e]), context);
    }
    return contents;
};
const de_GetTopicAttributesResponse = (output, context) => {
    const contents = {};
    if (output.Attributes === "") {
        contents[_At] = {};
    }
    else if (output[_At] != null && output[_At][_e] != null) {
        contents[_At] = de_TopicAttributesMap(__getArrayIfSingleItem(output[_At][_e]), context);
    }
    return contents;
};
const de_InternalErrorException = (output, context) => {
    const contents = {};
    if (output[_m] != null) {
        contents[_m] = __expectString(output[_m]);
    }
    return contents;
};
const de_InvalidBatchEntryIdException = (output, context) => {
    const contents = {};
    if (output[_m] != null) {
        contents[_m] = __expectString(output[_m]);
    }
    return contents;
};
const de_InvalidParameterException = (output, context) => {
    const contents = {};
    if (output[_m] != null) {
        contents[_m] = __expectString(output[_m]);
    }
    return contents;
};
const de_InvalidParameterValueException = (output, context) => {
    const contents = {};
    if (output[_m] != null) {
        contents[_m] = __expectString(output[_m]);
    }
    return contents;
};
const de_InvalidSecurityException = (output, context) => {
    const contents = {};
    if (output[_m] != null) {
        contents[_m] = __expectString(output[_m]);
    }
    return contents;
};
const de_InvalidStateException = (output, context) => {
    const contents = {};
    if (output[_m] != null) {
        contents[_m] = __expectString(output[_m]);
    }
    return contents;
};
const de_KMSAccessDeniedException = (output, context) => {
    const contents = {};
    if (output[_m] != null) {
        contents[_m] = __expectString(output[_m]);
    }
    return contents;
};
const de_KMSDisabledException = (output, context) => {
    const contents = {};
    if (output[_m] != null) {
        contents[_m] = __expectString(output[_m]);
    }
    return contents;
};
const de_KMSInvalidStateException = (output, context) => {
    const contents = {};
    if (output[_m] != null) {
        contents[_m] = __expectString(output[_m]);
    }
    return contents;
};
const de_KMSNotFoundException = (output, context) => {
    const contents = {};
    if (output[_m] != null) {
        contents[_m] = __expectString(output[_m]);
    }
    return contents;
};
const de_KMSOptInRequired = (output, context) => {
    const contents = {};
    if (output[_m] != null) {
        contents[_m] = __expectString(output[_m]);
    }
    return contents;
};
const de_KMSThrottlingException = (output, context) => {
    const contents = {};
    if (output[_m] != null) {
        contents[_m] = __expectString(output[_m]);
    }
    return contents;
};
const de_ListEndpointsByPlatformApplicationResponse = (output, context) => {
    const contents = {};
    if (output.Endpoints === "") {
        contents[_En] = [];
    }
    else if (output[_En] != null && output[_En][_me] != null) {
        contents[_En] = de_ListOfEndpoints(__getArrayIfSingleItem(output[_En][_me]), context);
    }
    if (output[_NT] != null) {
        contents[_NT] = __expectString(output[_NT]);
    }
    return contents;
};
const de_ListOfEndpoints = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return de_Endpoint(entry, context);
    });
};
const de_ListOfPlatformApplications = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return de_PlatformApplication(entry, context);
    });
};
const de_ListOriginationNumbersResult = (output, context) => {
    const contents = {};
    if (output[_NT] != null) {
        contents[_NT] = __expectString(output[_NT]);
    }
    if (output.PhoneNumbers === "") {
        contents[_PNh] = [];
    }
    else if (output[_PNh] != null && output[_PNh][_me] != null) {
        contents[_PNh] = de_PhoneNumberInformationList(__getArrayIfSingleItem(output[_PNh][_me]), context);
    }
    return contents;
};
const de_ListPhoneNumbersOptedOutResponse = (output, context) => {
    const contents = {};
    if (output.phoneNumbers === "") {
        contents[_pNh] = [];
    }
    else if (output[_pNh] != null && output[_pNh][_me] != null) {
        contents[_pNh] = de_PhoneNumberList(__getArrayIfSingleItem(output[_pNh][_me]), context);
    }
    if (output[_nT] != null) {
        contents[_nT] = __expectString(output[_nT]);
    }
    return contents;
};
const de_ListPlatformApplicationsResponse = (output, context) => {
    const contents = {};
    if (output.PlatformApplications === "") {
        contents[_PA] = [];
    }
    else if (output[_PA] != null && output[_PA][_me] != null) {
        contents[_PA] = de_ListOfPlatformApplications(__getArrayIfSingleItem(output[_PA][_me]), context);
    }
    if (output[_NT] != null) {
        contents[_NT] = __expectString(output[_NT]);
    }
    return contents;
};
const de_ListSMSSandboxPhoneNumbersResult = (output, context) => {
    const contents = {};
    if (output.PhoneNumbers === "") {
        contents[_PNh] = [];
    }
    else if (output[_PNh] != null && output[_PNh][_me] != null) {
        contents[_PNh] = de_SMSSandboxPhoneNumberList(__getArrayIfSingleItem(output[_PNh][_me]), context);
    }
    if (output[_NT] != null) {
        contents[_NT] = __expectString(output[_NT]);
    }
    return contents;
};
const de_ListSubscriptionsByTopicResponse = (output, context) => {
    const contents = {};
    if (output.Subscriptions === "") {
        contents[_Sub] = [];
    }
    else if (output[_Sub] != null && output[_Sub][_me] != null) {
        contents[_Sub] = de_SubscriptionsList(__getArrayIfSingleItem(output[_Sub][_me]), context);
    }
    if (output[_NT] != null) {
        contents[_NT] = __expectString(output[_NT]);
    }
    return contents;
};
const de_ListSubscriptionsResponse = (output, context) => {
    const contents = {};
    if (output.Subscriptions === "") {
        contents[_Sub] = [];
    }
    else if (output[_Sub] != null && output[_Sub][_me] != null) {
        contents[_Sub] = de_SubscriptionsList(__getArrayIfSingleItem(output[_Sub][_me]), context);
    }
    if (output[_NT] != null) {
        contents[_NT] = __expectString(output[_NT]);
    }
    return contents;
};
const de_ListTagsForResourceResponse = (output, context) => {
    const contents = {};
    if (output.Tags === "") {
        contents[_Ta] = [];
    }
    else if (output[_Ta] != null && output[_Ta][_me] != null) {
        contents[_Ta] = de_TagList(__getArrayIfSingleItem(output[_Ta][_me]), context);
    }
    return contents;
};
const de_ListTopicsResponse = (output, context) => {
    const contents = {};
    if (output.Topics === "") {
        contents[_To] = [];
    }
    else if (output[_To] != null && output[_To][_me] != null) {
        contents[_To] = de_TopicsList(__getArrayIfSingleItem(output[_To][_me]), context);
    }
    if (output[_NT] != null) {
        contents[_NT] = __expectString(output[_NT]);
    }
    return contents;
};
const de_MapStringToString = (output, context) => {
    return output.reduce((acc, pair) => {
        if (pair["value"] === null) {
            return acc;
        }
        acc[pair["key"]] = __expectString(pair["value"]);
        return acc;
    }, {});
};
const de_NotFoundException = (output, context) => {
    const contents = {};
    if (output[_m] != null) {
        contents[_m] = __expectString(output[_m]);
    }
    return contents;
};
const de_NumberCapabilityList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return __expectString(entry);
    });
};
const de_OptedOutException = (output, context) => {
    const contents = {};
    if (output[_m] != null) {
        contents[_m] = __expectString(output[_m]);
    }
    return contents;
};
const de_OptInPhoneNumberResponse = (output, context) => {
    const contents = {};
    return contents;
};
const de_PhoneNumberInformation = (output, context) => {
    const contents = {};
    if (output[_CA] != null) {
        contents[_CA] = __expectNonNull(__parseRfc3339DateTimeWithOffset(output[_CA]));
    }
    if (output[_PN] != null) {
        contents[_PN] = __expectString(output[_PN]);
    }
    if (output[_St] != null) {
        contents[_St] = __expectString(output[_St]);
    }
    if (output[_ICC] != null) {
        contents[_ICC] = __expectString(output[_ICC]);
    }
    if (output[_RT] != null) {
        contents[_RT] = __expectString(output[_RT]);
    }
    if (output.NumberCapabilities === "") {
        contents[_NC] = [];
    }
    else if (output[_NC] != null && output[_NC][_me] != null) {
        contents[_NC] = de_NumberCapabilityList(__getArrayIfSingleItem(output[_NC][_me]), context);
    }
    return contents;
};
const de_PhoneNumberInformationList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return de_PhoneNumberInformation(entry, context);
    });
};
const de_PhoneNumberList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return __expectString(entry);
    });
};
const de_PlatformApplication = (output, context) => {
    const contents = {};
    if (output[_PAA] != null) {
        contents[_PAA] = __expectString(output[_PAA]);
    }
    if (output.Attributes === "") {
        contents[_At] = {};
    }
    else if (output[_At] != null && output[_At][_e] != null) {
        contents[_At] = de_MapStringToString(__getArrayIfSingleItem(output[_At][_e]), context);
    }
    return contents;
};
const de_PlatformApplicationDisabledException = (output, context) => {
    const contents = {};
    if (output[_m] != null) {
        contents[_m] = __expectString(output[_m]);
    }
    return contents;
};
const de_PublishBatchResponse = (output, context) => {
    const contents = {};
    if (output.Successful === "") {
        contents[_Suc] = [];
    }
    else if (output[_Suc] != null && output[_Suc][_me] != null) {
        contents[_Suc] = de_PublishBatchResultEntryList(__getArrayIfSingleItem(output[_Suc][_me]), context);
    }
    if (output.Failed === "") {
        contents[_F] = [];
    }
    else if (output[_F] != null && output[_F][_me] != null) {
        contents[_F] = de_BatchResultErrorEntryList(__getArrayIfSingleItem(output[_F][_me]), context);
    }
    return contents;
};
const de_PublishBatchResultEntry = (output, context) => {
    const contents = {};
    if (output[_I] != null) {
        contents[_I] = __expectString(output[_I]);
    }
    if (output[_MI] != null) {
        contents[_MI] = __expectString(output[_MI]);
    }
    if (output[_SN] != null) {
        contents[_SN] = __expectString(output[_SN]);
    }
    return contents;
};
const de_PublishBatchResultEntryList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return de_PublishBatchResultEntry(entry, context);
    });
};
const de_PublishResponse = (output, context) => {
    const contents = {};
    if (output[_MI] != null) {
        contents[_MI] = __expectString(output[_MI]);
    }
    if (output[_SN] != null) {
        contents[_SN] = __expectString(output[_SN]);
    }
    return contents;
};
const de_ReplayLimitExceededException = (output, context) => {
    const contents = {};
    if (output[_m] != null) {
        contents[_m] = __expectString(output[_m]);
    }
    return contents;
};
const de_ResourceNotFoundException = (output, context) => {
    const contents = {};
    if (output[_m] != null) {
        contents[_m] = __expectString(output[_m]);
    }
    return contents;
};
const de_SetSMSAttributesResponse = (output, context) => {
    const contents = {};
    return contents;
};
const de_SMSSandboxPhoneNumber = (output, context) => {
    const contents = {};
    if (output[_PN] != null) {
        contents[_PN] = __expectString(output[_PN]);
    }
    if (output[_St] != null) {
        contents[_St] = __expectString(output[_St]);
    }
    return contents;
};
const de_SMSSandboxPhoneNumberList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return de_SMSSandboxPhoneNumber(entry, context);
    });
};
const de_StaleTagException = (output, context) => {
    const contents = {};
    if (output[_m] != null) {
        contents[_m] = __expectString(output[_m]);
    }
    return contents;
};
const de_SubscribeResponse = (output, context) => {
    const contents = {};
    if (output[_SA] != null) {
        contents[_SA] = __expectString(output[_SA]);
    }
    return contents;
};
const de_Subscription = (output, context) => {
    const contents = {};
    if (output[_SA] != null) {
        contents[_SA] = __expectString(output[_SA]);
    }
    if (output[_O] != null) {
        contents[_O] = __expectString(output[_O]);
    }
    if (output[_Pr] != null) {
        contents[_Pr] = __expectString(output[_Pr]);
    }
    if (output[_E] != null) {
        contents[_E] = __expectString(output[_E]);
    }
    if (output[_TA] != null) {
        contents[_TA] = __expectString(output[_TA]);
    }
    return contents;
};
const de_SubscriptionAttributesMap = (output, context) => {
    return output.reduce((acc, pair) => {
        if (pair["value"] === null) {
            return acc;
        }
        acc[pair["key"]] = __expectString(pair["value"]);
        return acc;
    }, {});
};
const de_SubscriptionLimitExceededException = (output, context) => {
    const contents = {};
    if (output[_m] != null) {
        contents[_m] = __expectString(output[_m]);
    }
    return contents;
};
const de_SubscriptionsList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return de_Subscription(entry, context);
    });
};
const de_Tag = (output, context) => {
    const contents = {};
    if (output[_K] != null) {
        contents[_K] = __expectString(output[_K]);
    }
    if (output[_Va] != null) {
        contents[_Va] = __expectString(output[_Va]);
    }
    return contents;
};
const de_TagLimitExceededException = (output, context) => {
    const contents = {};
    if (output[_m] != null) {
        contents[_m] = __expectString(output[_m]);
    }
    return contents;
};
const de_TagList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return de_Tag(entry, context);
    });
};
const de_TagPolicyException = (output, context) => {
    const contents = {};
    if (output[_m] != null) {
        contents[_m] = __expectString(output[_m]);
    }
    return contents;
};
const de_TagResourceResponse = (output, context) => {
    const contents = {};
    return contents;
};
const de_ThrottledException = (output, context) => {
    const contents = {};
    if (output[_m] != null) {
        contents[_m] = __expectString(output[_m]);
    }
    return contents;
};
const de_TooManyEntriesInBatchRequestException = (output, context) => {
    const contents = {};
    if (output[_m] != null) {
        contents[_m] = __expectString(output[_m]);
    }
    return contents;
};
const de_Topic = (output, context) => {
    const contents = {};
    if (output[_TA] != null) {
        contents[_TA] = __expectString(output[_TA]);
    }
    return contents;
};
const de_TopicAttributesMap = (output, context) => {
    return output.reduce((acc, pair) => {
        if (pair["value"] === null) {
            return acc;
        }
        acc[pair["key"]] = __expectString(pair["value"]);
        return acc;
    }, {});
};
const de_TopicLimitExceededException = (output, context) => {
    const contents = {};
    if (output[_m] != null) {
        contents[_m] = __expectString(output[_m]);
    }
    return contents;
};
const de_TopicsList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return de_Topic(entry, context);
    });
};
const de_UntagResourceResponse = (output, context) => {
    const contents = {};
    return contents;
};
const de_UserErrorException = (output, context) => {
    const contents = {};
    if (output[_m] != null) {
        contents[_m] = __expectString(output[_m]);
    }
    return contents;
};
const de_ValidationException = (output, context) => {
    const contents = {};
    if (output[_M] != null) {
        contents[_M] = __expectString(output[_M]);
    }
    return contents;
};
const de_VerificationException = (output, context) => {
    const contents = {};
    if (output[_M] != null) {
        contents[_M] = __expectString(output[_M]);
    }
    if (output[_St] != null) {
        contents[_St] = __expectString(output[_St]);
    }
    return contents;
};
const de_VerifySMSSandboxPhoneNumberResult = (output, context) => {
    const contents = {};
    return contents;
};
const deserializeMetadata = (output) => ({
    httpStatusCode: output.statusCode,
    requestId: output.headers["x-amzn-requestid"] ?? output.headers["x-amzn-request-id"] ?? output.headers["x-amz-request-id"],
    extendedRequestId: output.headers["x-amz-id-2"],
    cfId: output.headers["x-amz-cf-id"],
});
const collectBodyString = (streamBody, context) => collectBody(streamBody, context).then((body) => context.utf8Encoder(body));
const throwDefaultError = withBaseException(__BaseException);
const buildHttpRpcRequest = async (context, headers, path, resolvedHostname, body) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const contents = {
        protocol,
        hostname,
        port,
        method: "POST",
        path: basePath.endsWith("/") ? basePath.slice(0, -1) + path : basePath + path,
        headers,
    };
    if (resolvedHostname !== undefined) {
        contents.hostname = resolvedHostname;
    }
    if (body !== undefined) {
        contents.body = body;
    }
    return new __HttpRequest(contents);
};
const SHARED_HEADERS = {
    "content-type": "application/x-www-form-urlencoded",
};
const _ = "2010-03-31";
const _A = "Action";
const _AN = "ActionName";
const _ANt = "AttributeName";
const _AOU = "AuthenticateOnUnsubscribe";
const _AP = "AddPermission";
const _AV = "AttributeValue";
const _AWSAI = "AWSAccountId";
const _At = "Attributes";
const _BV = "BinaryValue";
const _C = "Code";
const _CA = "CreatedAt";
const _CIPNIOO = "CheckIfPhoneNumberIsOptedOut";
const _CPA = "CreatePlatformApplication";
const _CPE = "CreatePlatformEndpoint";
const _CS = "ConfirmSubscription";
const _CSMSSPN = "CreateSMSSandboxPhoneNumber";
const _CT = "CreateTopic";
const _CUD = "CustomUserData";
const _DE = "DeleteEndpoint";
const _DPA = "DeletePlatformApplication";
const _DPP = "DataProtectionPolicy";
const _DSMSSPN = "DeleteSMSSandboxPhoneNumber";
const _DT = "DeleteTopic";
const _DTa = "DataType";
const _E = "Endpoint";
const _EA = "EndpointArn";
const _En = "Endpoints";
const _F = "Failed";
const _GDPP = "GetDataProtectionPolicy";
const _GEA = "GetEndpointAttributes";
const _GPAA = "GetPlatformApplicationAttributes";
const _GSA = "GetSubscriptionAttributes";
const _GSMSA = "GetSMSAttributes";
const _GSMSSAS = "GetSMSSandboxAccountStatus";
const _GTA = "GetTopicAttributes";
const _I = "Id";
const _ICC = "Iso2CountryCode";
const _IIS = "IsInSandbox";
const _K = "Key";
const _L = "Label";
const _LC = "LanguageCode";
const _LEBPA = "ListEndpointsByPlatformApplication";
const _LON = "ListOriginationNumbers";
const _LPA = "ListPlatformApplications";
const _LPNOO = "ListPhoneNumbersOptedOut";
const _LS = "ListSubscriptions";
const _LSBT = "ListSubscriptionsByTopic";
const _LSMSSPN = "ListSMSSandboxPhoneNumbers";
const _LT = "ListTopics";
const _LTFR = "ListTagsForResource";
const _M = "Message";
const _MA = "MessageAttributes";
const _MDI = "MessageDeduplicationId";
const _MGI = "MessageGroupId";
const _MI = "MessageId";
const _MR = "MaxResults";
const _MS = "MessageStructure";
const _N = "Name";
const _NC = "NumberCapabilities";
const _NT = "NextToken";
const _O = "Owner";
const _OIPN = "OptInPhoneNumber";
const _OTP = "OneTimePassword";
const _P = "Publish";
const _PA = "PlatformApplications";
const _PAA = "PlatformApplicationArn";
const _PB = "PublishBatch";
const _PBRE = "PublishBatchRequestEntries";
const _PDPP = "PutDataProtectionPolicy";
const _PN = "PhoneNumber";
const _PNh = "PhoneNumbers";
const _Pl = "Platform";
const _Pr = "Protocol";
const _RA = "ResourceArn";
const _RP = "RemovePermission";
const _RSA = "ReturnSubscriptionArn";
const _RT = "RouteType";
const _S = "Subscribe";
const _SA = "SubscriptionArn";
const _SEA = "SetEndpointAttributes";
const _SF = "SenderFault";
const _SN = "SequenceNumber";
const _SPAA = "SetPlatformApplicationAttributes";
const _SSA = "SetSubscriptionAttributes";
const _SSMSA = "SetSMSAttributes";
const _STA = "SetTopicAttributes";
const _SV = "StringValue";
const _St = "Status";
const _Su = "Subject";
const _Sub = "Subscriptions";
const _Suc = "Successful";
const _T = "Token";
const _TA = "TopicArn";
const _TAa = "TargetArn";
const _TK = "TagKeys";
const _TR = "TagResource";
const _Ta = "Tags";
const _To = "Topics";
const _U = "Unsubscribe";
const _UR = "UntagResource";
const _V = "Version";
const _VSMSSPN = "VerifySMSSandboxPhoneNumber";
const _Va = "Value";
const _a = "attributes";
const _e = "entry";
const _iOO = "isOptedOut";
const _m = "message";
const _me = "member";
const _nT = "nextToken";
const _pN = "phoneNumber";
const _pNh = "phoneNumbers";
const buildFormUrlencodedString = (formEntries) => Object.entries(formEntries)
    .map(([key, value]) => __extendedEncodeURIComponent(key) + "=" + __extendedEncodeURIComponent(value))
    .join("&");
const loadQueryErrorCode = (output, data) => {
    if (data.Error?.Code !== undefined) {
        return data.Error.Code;
    }
    if (output.statusCode == 404) {
        return "NotFound";
    }
};
