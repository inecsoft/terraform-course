import { SQSServiceException as __BaseException } from "./SQSServiceException";
export class InvalidAddress extends __BaseException {
    constructor(opts) {
        super({
            name: "InvalidAddress",
            $fault: "client",
            ...opts,
        });
        this.name = "InvalidAddress";
        this.$fault = "client";
        Object.setPrototypeOf(this, InvalidAddress.prototype);
    }
}
export class InvalidSecurity extends __BaseException {
    constructor(opts) {
        super({
            name: "InvalidSecurity",
            $fault: "client",
            ...opts,
        });
        this.name = "InvalidSecurity";
        this.$fault = "client";
        Object.setPrototypeOf(this, InvalidSecurity.prototype);
    }
}
export class OverLimit extends __BaseException {
    constructor(opts) {
        super({
            name: "OverLimit",
            $fault: "client",
            ...opts,
        });
        this.name = "OverLimit";
        this.$fault = "client";
        Object.setPrototypeOf(this, OverLimit.prototype);
    }
}
export class QueueDoesNotExist extends __BaseException {
    constructor(opts) {
        super({
            name: "QueueDoesNotExist",
            $fault: "client",
            ...opts,
        });
        this.name = "QueueDoesNotExist";
        this.$fault = "client";
        Object.setPrototypeOf(this, QueueDoesNotExist.prototype);
    }
}
export class RequestThrottled extends __BaseException {
    constructor(opts) {
        super({
            name: "RequestThrottled",
            $fault: "client",
            ...opts,
        });
        this.name = "RequestThrottled";
        this.$fault = "client";
        Object.setPrototypeOf(this, RequestThrottled.prototype);
    }
}
export class UnsupportedOperation extends __BaseException {
    constructor(opts) {
        super({
            name: "UnsupportedOperation",
            $fault: "client",
            ...opts,
        });
        this.name = "UnsupportedOperation";
        this.$fault = "client";
        Object.setPrototypeOf(this, UnsupportedOperation.prototype);
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
export class MessageNotInflight extends __BaseException {
    constructor(opts) {
        super({
            name: "MessageNotInflight",
            $fault: "client",
            ...opts,
        });
        this.name = "MessageNotInflight";
        this.$fault = "client";
        Object.setPrototypeOf(this, MessageNotInflight.prototype);
    }
}
export class ReceiptHandleIsInvalid extends __BaseException {
    constructor(opts) {
        super({
            name: "ReceiptHandleIsInvalid",
            $fault: "client",
            ...opts,
        });
        this.name = "ReceiptHandleIsInvalid";
        this.$fault = "client";
        Object.setPrototypeOf(this, ReceiptHandleIsInvalid.prototype);
    }
}
export class BatchEntryIdsNotDistinct extends __BaseException {
    constructor(opts) {
        super({
            name: "BatchEntryIdsNotDistinct",
            $fault: "client",
            ...opts,
        });
        this.name = "BatchEntryIdsNotDistinct";
        this.$fault = "client";
        Object.setPrototypeOf(this, BatchEntryIdsNotDistinct.prototype);
    }
}
export class EmptyBatchRequest extends __BaseException {
    constructor(opts) {
        super({
            name: "EmptyBatchRequest",
            $fault: "client",
            ...opts,
        });
        this.name = "EmptyBatchRequest";
        this.$fault = "client";
        Object.setPrototypeOf(this, EmptyBatchRequest.prototype);
    }
}
export class InvalidBatchEntryId extends __BaseException {
    constructor(opts) {
        super({
            name: "InvalidBatchEntryId",
            $fault: "client",
            ...opts,
        });
        this.name = "InvalidBatchEntryId";
        this.$fault = "client";
        Object.setPrototypeOf(this, InvalidBatchEntryId.prototype);
    }
}
export class TooManyEntriesInBatchRequest extends __BaseException {
    constructor(opts) {
        super({
            name: "TooManyEntriesInBatchRequest",
            $fault: "client",
            ...opts,
        });
        this.name = "TooManyEntriesInBatchRequest";
        this.$fault = "client";
        Object.setPrototypeOf(this, TooManyEntriesInBatchRequest.prototype);
    }
}
export const QueueAttributeName = {
    All: "All",
    ApproximateNumberOfMessages: "ApproximateNumberOfMessages",
    ApproximateNumberOfMessagesDelayed: "ApproximateNumberOfMessagesDelayed",
    ApproximateNumberOfMessagesNotVisible: "ApproximateNumberOfMessagesNotVisible",
    ContentBasedDeduplication: "ContentBasedDeduplication",
    CreatedTimestamp: "CreatedTimestamp",
    DeduplicationScope: "DeduplicationScope",
    DelaySeconds: "DelaySeconds",
    FifoQueue: "FifoQueue",
    FifoThroughputLimit: "FifoThroughputLimit",
    KmsDataKeyReusePeriodSeconds: "KmsDataKeyReusePeriodSeconds",
    KmsMasterKeyId: "KmsMasterKeyId",
    LastModifiedTimestamp: "LastModifiedTimestamp",
    MaximumMessageSize: "MaximumMessageSize",
    MessageRetentionPeriod: "MessageRetentionPeriod",
    Policy: "Policy",
    QueueArn: "QueueArn",
    ReceiveMessageWaitTimeSeconds: "ReceiveMessageWaitTimeSeconds",
    RedriveAllowPolicy: "RedriveAllowPolicy",
    RedrivePolicy: "RedrivePolicy",
    SqsManagedSseEnabled: "SqsManagedSseEnabled",
    VisibilityTimeout: "VisibilityTimeout",
};
export class InvalidAttributeName extends __BaseException {
    constructor(opts) {
        super({
            name: "InvalidAttributeName",
            $fault: "client",
            ...opts,
        });
        this.name = "InvalidAttributeName";
        this.$fault = "client";
        Object.setPrototypeOf(this, InvalidAttributeName.prototype);
    }
}
export class InvalidAttributeValue extends __BaseException {
    constructor(opts) {
        super({
            name: "InvalidAttributeValue",
            $fault: "client",
            ...opts,
        });
        this.name = "InvalidAttributeValue";
        this.$fault = "client";
        Object.setPrototypeOf(this, InvalidAttributeValue.prototype);
    }
}
export class QueueDeletedRecently extends __BaseException {
    constructor(opts) {
        super({
            name: "QueueDeletedRecently",
            $fault: "client",
            ...opts,
        });
        this.name = "QueueDeletedRecently";
        this.$fault = "client";
        Object.setPrototypeOf(this, QueueDeletedRecently.prototype);
    }
}
export class QueueNameExists extends __BaseException {
    constructor(opts) {
        super({
            name: "QueueNameExists",
            $fault: "client",
            ...opts,
        });
        this.name = "QueueNameExists";
        this.$fault = "client";
        Object.setPrototypeOf(this, QueueNameExists.prototype);
    }
}
export class InvalidIdFormat extends __BaseException {
    constructor(opts) {
        super({
            name: "InvalidIdFormat",
            $fault: "client",
            ...opts,
        });
        this.name = "InvalidIdFormat";
        this.$fault = "client";
        Object.setPrototypeOf(this, InvalidIdFormat.prototype);
    }
}
export class PurgeQueueInProgress extends __BaseException {
    constructor(opts) {
        super({
            name: "PurgeQueueInProgress",
            $fault: "client",
            ...opts,
        });
        this.name = "PurgeQueueInProgress";
        this.$fault = "client";
        Object.setPrototypeOf(this, PurgeQueueInProgress.prototype);
    }
}
export class KmsAccessDenied extends __BaseException {
    constructor(opts) {
        super({
            name: "KmsAccessDenied",
            $fault: "client",
            ...opts,
        });
        this.name = "KmsAccessDenied";
        this.$fault = "client";
        Object.setPrototypeOf(this, KmsAccessDenied.prototype);
    }
}
export class KmsDisabled extends __BaseException {
    constructor(opts) {
        super({
            name: "KmsDisabled",
            $fault: "client",
            ...opts,
        });
        this.name = "KmsDisabled";
        this.$fault = "client";
        Object.setPrototypeOf(this, KmsDisabled.prototype);
    }
}
export class KmsInvalidKeyUsage extends __BaseException {
    constructor(opts) {
        super({
            name: "KmsInvalidKeyUsage",
            $fault: "client",
            ...opts,
        });
        this.name = "KmsInvalidKeyUsage";
        this.$fault = "client";
        Object.setPrototypeOf(this, KmsInvalidKeyUsage.prototype);
    }
}
export class KmsInvalidState extends __BaseException {
    constructor(opts) {
        super({
            name: "KmsInvalidState",
            $fault: "client",
            ...opts,
        });
        this.name = "KmsInvalidState";
        this.$fault = "client";
        Object.setPrototypeOf(this, KmsInvalidState.prototype);
    }
}
export class KmsNotFound extends __BaseException {
    constructor(opts) {
        super({
            name: "KmsNotFound",
            $fault: "client",
            ...opts,
        });
        this.name = "KmsNotFound";
        this.$fault = "client";
        Object.setPrototypeOf(this, KmsNotFound.prototype);
    }
}
export class KmsOptInRequired extends __BaseException {
    constructor(opts) {
        super({
            name: "KmsOptInRequired",
            $fault: "client",
            ...opts,
        });
        this.name = "KmsOptInRequired";
        this.$fault = "client";
        Object.setPrototypeOf(this, KmsOptInRequired.prototype);
    }
}
export class KmsThrottled extends __BaseException {
    constructor(opts) {
        super({
            name: "KmsThrottled",
            $fault: "client",
            ...opts,
        });
        this.name = "KmsThrottled";
        this.$fault = "client";
        Object.setPrototypeOf(this, KmsThrottled.prototype);
    }
}
export const MessageSystemAttributeName = {
    AWSTraceHeader: "AWSTraceHeader",
    All: "All",
    ApproximateFirstReceiveTimestamp: "ApproximateFirstReceiveTimestamp",
    ApproximateReceiveCount: "ApproximateReceiveCount",
    DeadLetterQueueSourceArn: "DeadLetterQueueSourceArn",
    MessageDeduplicationId: "MessageDeduplicationId",
    MessageGroupId: "MessageGroupId",
    SenderId: "SenderId",
    SentTimestamp: "SentTimestamp",
    SequenceNumber: "SequenceNumber",
};
export class InvalidMessageContents extends __BaseException {
    constructor(opts) {
        super({
            name: "InvalidMessageContents",
            $fault: "client",
            ...opts,
        });
        this.name = "InvalidMessageContents";
        this.$fault = "client";
        Object.setPrototypeOf(this, InvalidMessageContents.prototype);
    }
}
export const MessageSystemAttributeNameForSends = {
    AWSTraceHeader: "AWSTraceHeader",
};
export class BatchRequestTooLong extends __BaseException {
    constructor(opts) {
        super({
            name: "BatchRequestTooLong",
            $fault: "client",
            ...opts,
        });
        this.name = "BatchRequestTooLong";
        this.$fault = "client";
        Object.setPrototypeOf(this, BatchRequestTooLong.prototype);
    }
}
