import { SENSITIVE_STRING } from "@smithy/smithy-client";
import { SNSServiceException as __BaseException } from "./SNSServiceException";
export class AuthorizationErrorException extends __BaseException {
    constructor(opts) {
        super({
            name: "AuthorizationErrorException",
            $fault: "client",
            ...opts,
        });
        this.name = "AuthorizationErrorException";
        this.$fault = "client";
        Object.setPrototypeOf(this, AuthorizationErrorException.prototype);
    }
}
export class InternalErrorException extends __BaseException {
    constructor(opts) {
        super({
            name: "InternalErrorException",
            $fault: "server",
            ...opts,
        });
        this.name = "InternalErrorException";
        this.$fault = "server";
        Object.setPrototypeOf(this, InternalErrorException.prototype);
    }
}
export class InvalidParameterException extends __BaseException {
    constructor(opts) {
        super({
            name: "InvalidParameterException",
            $fault: "client",
            ...opts,
        });
        this.name = "InvalidParameterException";
        this.$fault = "client";
        Object.setPrototypeOf(this, InvalidParameterException.prototype);
    }
}
export class NotFoundException extends __BaseException {
    constructor(opts) {
        super({
            name: "NotFoundException",
            $fault: "client",
            ...opts,
        });
        this.name = "NotFoundException";
        this.$fault = "client";
        Object.setPrototypeOf(this, NotFoundException.prototype);
    }
}
export class ThrottledException extends __BaseException {
    constructor(opts) {
        super({
            name: "ThrottledException",
            $fault: "client",
            ...opts,
        });
        this.name = "ThrottledException";
        this.$fault = "client";
        Object.setPrototypeOf(this, ThrottledException.prototype);
    }
}
export class FilterPolicyLimitExceededException extends __BaseException {
    constructor(opts) {
        super({
            name: "FilterPolicyLimitExceededException",
            $fault: "client",
            ...opts,
        });
        this.name = "FilterPolicyLimitExceededException";
        this.$fault = "client";
        Object.setPrototypeOf(this, FilterPolicyLimitExceededException.prototype);
    }
}
export class ReplayLimitExceededException extends __BaseException {
    constructor(opts) {
        super({
            name: "ReplayLimitExceededException",
            $fault: "client",
            ...opts,
        });
        this.name = "ReplayLimitExceededException";
        this.$fault = "client";
        Object.setPrototypeOf(this, ReplayLimitExceededException.prototype);
    }
}
export class SubscriptionLimitExceededException extends __BaseException {
    constructor(opts) {
        super({
            name: "SubscriptionLimitExceededException",
            $fault: "client",
            ...opts,
        });
        this.name = "SubscriptionLimitExceededException";
        this.$fault = "client";
        Object.setPrototypeOf(this, SubscriptionLimitExceededException.prototype);
    }
}
export const LanguageCodeString = {
    de_DE: "de-DE",
    en_GB: "en-GB",
    en_US: "en-US",
    es_419: "es-419",
    es_ES: "es-ES",
    fr_CA: "fr-CA",
    fr_FR: "fr-FR",
    it_IT: "it-IT",
    jp_JP: "ja-JP",
    kr_KR: "kr-KR",
    pt_BR: "pt-BR",
    zh_CN: "zh-CN",
    zh_TW: "zh-TW",
};
export class OptedOutException extends __BaseException {
    constructor(opts) {
        super({
            name: "OptedOutException",
            $fault: "client",
            ...opts,
        });
        this.name = "OptedOutException";
        this.$fault = "client";
        Object.setPrototypeOf(this, OptedOutException.prototype);
    }
}
export class UserErrorException extends __BaseException {
    constructor(opts) {
        super({
            name: "UserErrorException",
            $fault: "client",
            ...opts,
        });
        this.name = "UserErrorException";
        this.$fault = "client";
        Object.setPrototypeOf(this, UserErrorException.prototype);
    }
}
export class ConcurrentAccessException extends __BaseException {
    constructor(opts) {
        super({
            name: "ConcurrentAccessException",
            $fault: "client",
            ...opts,
        });
        this.name = "ConcurrentAccessException";
        this.$fault = "client";
        Object.setPrototypeOf(this, ConcurrentAccessException.prototype);
    }
}
export class InvalidSecurityException extends __BaseException {
    constructor(opts) {
        super({
            name: "InvalidSecurityException",
            $fault: "client",
            ...opts,
        });
        this.name = "InvalidSecurityException";
        this.$fault = "client";
        Object.setPrototypeOf(this, InvalidSecurityException.prototype);
    }
}
export class StaleTagException extends __BaseException {
    constructor(opts) {
        super({
            name: "StaleTagException",
            $fault: "client",
            ...opts,
        });
        this.name = "StaleTagException";
        this.$fault = "client";
        Object.setPrototypeOf(this, StaleTagException.prototype);
    }
}
export class TagLimitExceededException extends __BaseException {
    constructor(opts) {
        super({
            name: "TagLimitExceededException",
            $fault: "client",
            ...opts,
        });
        this.name = "TagLimitExceededException";
        this.$fault = "client";
        Object.setPrototypeOf(this, TagLimitExceededException.prototype);
    }
}
export class TagPolicyException extends __BaseException {
    constructor(opts) {
        super({
            name: "TagPolicyException",
            $fault: "client",
            ...opts,
        });
        this.name = "TagPolicyException";
        this.$fault = "client";
        Object.setPrototypeOf(this, TagPolicyException.prototype);
    }
}
export class TopicLimitExceededException extends __BaseException {
    constructor(opts) {
        super({
            name: "TopicLimitExceededException",
            $fault: "client",
            ...opts,
        });
        this.name = "TopicLimitExceededException";
        this.$fault = "client";
        Object.setPrototypeOf(this, TopicLimitExceededException.prototype);
    }
}
export class ResourceNotFoundException extends __BaseException {
    constructor(opts) {
        super({
            name: "ResourceNotFoundException",
            $fault: "client",
            ...opts,
        });
        this.name = "ResourceNotFoundException";
        this.$fault = "client";
        Object.setPrototypeOf(this, ResourceNotFoundException.prototype);
    }
}
export class InvalidStateException extends __BaseException {
    constructor(opts) {
        super({
            name: "InvalidStateException",
            $fault: "client",
            ...opts,
        });
        this.name = "InvalidStateException";
        this.$fault = "client";
        Object.setPrototypeOf(this, InvalidStateException.prototype);
    }
}
export const NumberCapability = {
    MMS: "MMS",
    SMS: "SMS",
    VOICE: "VOICE",
};
export const RouteType = {
    Premium: "Premium",
    Promotional: "Promotional",
    Transactional: "Transactional",
};
export class ValidationException extends __BaseException {
    constructor(opts) {
        super({
            name: "ValidationException",
            $fault: "client",
            ...opts,
        });
        this.name = "ValidationException";
        this.$fault = "client";
        Object.setPrototypeOf(this, ValidationException.prototype);
        this.Message = opts.Message;
    }
}
export const SMSSandboxPhoneNumberVerificationStatus = {
    Pending: "Pending",
    Verified: "Verified",
};
export class EndpointDisabledException extends __BaseException {
    constructor(opts) {
        super({
            name: "EndpointDisabledException",
            $fault: "client",
            ...opts,
        });
        this.name = "EndpointDisabledException";
        this.$fault = "client";
        Object.setPrototypeOf(this, EndpointDisabledException.prototype);
    }
}
export class InvalidParameterValueException extends __BaseException {
    constructor(opts) {
        super({
            name: "InvalidParameterValueException",
            $fault: "client",
            ...opts,
        });
        this.name = "InvalidParameterValueException";
        this.$fault = "client";
        Object.setPrototypeOf(this, InvalidParameterValueException.prototype);
    }
}
export class KMSAccessDeniedException extends __BaseException {
    constructor(opts) {
        super({
            name: "KMSAccessDeniedException",
            $fault: "client",
            ...opts,
        });
        this.name = "KMSAccessDeniedException";
        this.$fault = "client";
        Object.setPrototypeOf(this, KMSAccessDeniedException.prototype);
    }
}
export class KMSDisabledException extends __BaseException {
    constructor(opts) {
        super({
            name: "KMSDisabledException",
            $fault: "client",
            ...opts,
        });
        this.name = "KMSDisabledException";
        this.$fault = "client";
        Object.setPrototypeOf(this, KMSDisabledException.prototype);
    }
}
export class KMSInvalidStateException extends __BaseException {
    constructor(opts) {
        super({
            name: "KMSInvalidStateException",
            $fault: "client",
            ...opts,
        });
        this.name = "KMSInvalidStateException";
        this.$fault = "client";
        Object.setPrototypeOf(this, KMSInvalidStateException.prototype);
    }
}
export class KMSNotFoundException extends __BaseException {
    constructor(opts) {
        super({
            name: "KMSNotFoundException",
            $fault: "client",
            ...opts,
        });
        this.name = "KMSNotFoundException";
        this.$fault = "client";
        Object.setPrototypeOf(this, KMSNotFoundException.prototype);
    }
}
export class KMSOptInRequired extends __BaseException {
    constructor(opts) {
        super({
            name: "KMSOptInRequired",
            $fault: "client",
            ...opts,
        });
        this.name = "KMSOptInRequired";
        this.$fault = "client";
        Object.setPrototypeOf(this, KMSOptInRequired.prototype);
    }
}
export class KMSThrottlingException extends __BaseException {
    constructor(opts) {
        super({
            name: "KMSThrottlingException",
            $fault: "client",
            ...opts,
        });
        this.name = "KMSThrottlingException";
        this.$fault = "client";
        Object.setPrototypeOf(this, KMSThrottlingException.prototype);
    }
}
export class PlatformApplicationDisabledException extends __BaseException {
    constructor(opts) {
        super({
            name: "PlatformApplicationDisabledException",
            $fault: "client",
            ...opts,
        });
        this.name = "PlatformApplicationDisabledException";
        this.$fault = "client";
        Object.setPrototypeOf(this, PlatformApplicationDisabledException.prototype);
    }
}
export class BatchEntryIdsNotDistinctException extends __BaseException {
    constructor(opts) {
        super({
            name: "BatchEntryIdsNotDistinctException",
            $fault: "client",
            ...opts,
        });
        this.name = "BatchEntryIdsNotDistinctException";
        this.$fault = "client";
        Object.setPrototypeOf(this, BatchEntryIdsNotDistinctException.prototype);
    }
}
export class BatchRequestTooLongException extends __BaseException {
    constructor(opts) {
        super({
            name: "BatchRequestTooLongException",
            $fault: "client",
            ...opts,
        });
        this.name = "BatchRequestTooLongException";
        this.$fault = "client";
        Object.setPrototypeOf(this, BatchRequestTooLongException.prototype);
    }
}
export class EmptyBatchRequestException extends __BaseException {
    constructor(opts) {
        super({
            name: "EmptyBatchRequestException",
            $fault: "client",
            ...opts,
        });
        this.name = "EmptyBatchRequestException";
        this.$fault = "client";
        Object.setPrototypeOf(this, EmptyBatchRequestException.prototype);
    }
}
export class InvalidBatchEntryIdException extends __BaseException {
    constructor(opts) {
        super({
            name: "InvalidBatchEntryIdException",
            $fault: "client",
            ...opts,
        });
        this.name = "InvalidBatchEntryIdException";
        this.$fault = "client";
        Object.setPrototypeOf(this, InvalidBatchEntryIdException.prototype);
    }
}
export class TooManyEntriesInBatchRequestException extends __BaseException {
    constructor(opts) {
        super({
            name: "TooManyEntriesInBatchRequestException",
            $fault: "client",
            ...opts,
        });
        this.name = "TooManyEntriesInBatchRequestException";
        this.$fault = "client";
        Object.setPrototypeOf(this, TooManyEntriesInBatchRequestException.prototype);
    }
}
export class VerificationException extends __BaseException {
    constructor(opts) {
        super({
            name: "VerificationException",
            $fault: "client",
            ...opts,
        });
        this.name = "VerificationException";
        this.$fault = "client";
        Object.setPrototypeOf(this, VerificationException.prototype);
        this.Message = opts.Message;
        this.Status = opts.Status;
    }
}
export const CheckIfPhoneNumberIsOptedOutInputFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.phoneNumber && { phoneNumber: SENSITIVE_STRING }),
});
export const CreateSMSSandboxPhoneNumberInputFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.PhoneNumber && { PhoneNumber: SENSITIVE_STRING }),
});
export const DeleteSMSSandboxPhoneNumberInputFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.PhoneNumber && { PhoneNumber: SENSITIVE_STRING }),
});
export const PhoneNumberInformationFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.PhoneNumber && { PhoneNumber: SENSITIVE_STRING }),
});
export const ListOriginationNumbersResultFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.PhoneNumbers && {
        PhoneNumbers: obj.PhoneNumbers.map((item) => PhoneNumberInformationFilterSensitiveLog(item)),
    }),
});
export const ListPhoneNumbersOptedOutResponseFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.phoneNumbers && { phoneNumbers: SENSITIVE_STRING }),
});
export const SMSSandboxPhoneNumberFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.PhoneNumber && { PhoneNumber: SENSITIVE_STRING }),
});
export const ListSMSSandboxPhoneNumbersResultFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.PhoneNumbers && {
        PhoneNumbers: obj.PhoneNumbers.map((item) => SMSSandboxPhoneNumberFilterSensitiveLog(item)),
    }),
});
export const OptInPhoneNumberInputFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.phoneNumber && { phoneNumber: SENSITIVE_STRING }),
});
export const PublishInputFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.PhoneNumber && { PhoneNumber: SENSITIVE_STRING }),
});
export const VerifySMSSandboxPhoneNumberInputFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.PhoneNumber && { PhoneNumber: SENSITIVE_STRING }),
});
