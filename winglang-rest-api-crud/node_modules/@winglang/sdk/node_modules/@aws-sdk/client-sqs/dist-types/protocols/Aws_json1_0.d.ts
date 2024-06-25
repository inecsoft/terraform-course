import { HttpRequest as __HttpRequest, HttpResponse as __HttpResponse } from "@smithy/protocol-http";
import { SerdeContext as __SerdeContext } from "@smithy/types";
import { AddPermissionCommandInput, AddPermissionCommandOutput } from "../commands/AddPermissionCommand";
import { CancelMessageMoveTaskCommandInput, CancelMessageMoveTaskCommandOutput } from "../commands/CancelMessageMoveTaskCommand";
import { ChangeMessageVisibilityBatchCommandInput, ChangeMessageVisibilityBatchCommandOutput } from "../commands/ChangeMessageVisibilityBatchCommand";
import { ChangeMessageVisibilityCommandInput, ChangeMessageVisibilityCommandOutput } from "../commands/ChangeMessageVisibilityCommand";
import { CreateQueueCommandInput, CreateQueueCommandOutput } from "../commands/CreateQueueCommand";
import { DeleteMessageBatchCommandInput, DeleteMessageBatchCommandOutput } from "../commands/DeleteMessageBatchCommand";
import { DeleteMessageCommandInput, DeleteMessageCommandOutput } from "../commands/DeleteMessageCommand";
import { DeleteQueueCommandInput, DeleteQueueCommandOutput } from "../commands/DeleteQueueCommand";
import { GetQueueAttributesCommandInput, GetQueueAttributesCommandOutput } from "../commands/GetQueueAttributesCommand";
import { GetQueueUrlCommandInput, GetQueueUrlCommandOutput } from "../commands/GetQueueUrlCommand";
import { ListDeadLetterSourceQueuesCommandInput, ListDeadLetterSourceQueuesCommandOutput } from "../commands/ListDeadLetterSourceQueuesCommand";
import { ListMessageMoveTasksCommandInput, ListMessageMoveTasksCommandOutput } from "../commands/ListMessageMoveTasksCommand";
import { ListQueuesCommandInput, ListQueuesCommandOutput } from "../commands/ListQueuesCommand";
import { ListQueueTagsCommandInput, ListQueueTagsCommandOutput } from "../commands/ListQueueTagsCommand";
import { PurgeQueueCommandInput, PurgeQueueCommandOutput } from "../commands/PurgeQueueCommand";
import { ReceiveMessageCommandInput, ReceiveMessageCommandOutput } from "../commands/ReceiveMessageCommand";
import { RemovePermissionCommandInput, RemovePermissionCommandOutput } from "../commands/RemovePermissionCommand";
import { SendMessageBatchCommandInput, SendMessageBatchCommandOutput } from "../commands/SendMessageBatchCommand";
import { SendMessageCommandInput, SendMessageCommandOutput } from "../commands/SendMessageCommand";
import { SetQueueAttributesCommandInput, SetQueueAttributesCommandOutput } from "../commands/SetQueueAttributesCommand";
import { StartMessageMoveTaskCommandInput, StartMessageMoveTaskCommandOutput } from "../commands/StartMessageMoveTaskCommand";
import { TagQueueCommandInput, TagQueueCommandOutput } from "../commands/TagQueueCommand";
import { UntagQueueCommandInput, UntagQueueCommandOutput } from "../commands/UntagQueueCommand";
/**
 * serializeAws_json1_0AddPermissionCommand
 */
export declare const se_AddPermissionCommand: (input: AddPermissionCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_0CancelMessageMoveTaskCommand
 */
export declare const se_CancelMessageMoveTaskCommand: (input: CancelMessageMoveTaskCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_0ChangeMessageVisibilityCommand
 */
export declare const se_ChangeMessageVisibilityCommand: (input: ChangeMessageVisibilityCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_0ChangeMessageVisibilityBatchCommand
 */
export declare const se_ChangeMessageVisibilityBatchCommand: (input: ChangeMessageVisibilityBatchCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_0CreateQueueCommand
 */
export declare const se_CreateQueueCommand: (input: CreateQueueCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_0DeleteMessageCommand
 */
export declare const se_DeleteMessageCommand: (input: DeleteMessageCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_0DeleteMessageBatchCommand
 */
export declare const se_DeleteMessageBatchCommand: (input: DeleteMessageBatchCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_0DeleteQueueCommand
 */
export declare const se_DeleteQueueCommand: (input: DeleteQueueCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_0GetQueueAttributesCommand
 */
export declare const se_GetQueueAttributesCommand: (input: GetQueueAttributesCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_0GetQueueUrlCommand
 */
export declare const se_GetQueueUrlCommand: (input: GetQueueUrlCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_0ListDeadLetterSourceQueuesCommand
 */
export declare const se_ListDeadLetterSourceQueuesCommand: (input: ListDeadLetterSourceQueuesCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_0ListMessageMoveTasksCommand
 */
export declare const se_ListMessageMoveTasksCommand: (input: ListMessageMoveTasksCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_0ListQueuesCommand
 */
export declare const se_ListQueuesCommand: (input: ListQueuesCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_0ListQueueTagsCommand
 */
export declare const se_ListQueueTagsCommand: (input: ListQueueTagsCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_0PurgeQueueCommand
 */
export declare const se_PurgeQueueCommand: (input: PurgeQueueCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_0ReceiveMessageCommand
 */
export declare const se_ReceiveMessageCommand: (input: ReceiveMessageCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_0RemovePermissionCommand
 */
export declare const se_RemovePermissionCommand: (input: RemovePermissionCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_0SendMessageCommand
 */
export declare const se_SendMessageCommand: (input: SendMessageCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_0SendMessageBatchCommand
 */
export declare const se_SendMessageBatchCommand: (input: SendMessageBatchCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_0SetQueueAttributesCommand
 */
export declare const se_SetQueueAttributesCommand: (input: SetQueueAttributesCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_0StartMessageMoveTaskCommand
 */
export declare const se_StartMessageMoveTaskCommand: (input: StartMessageMoveTaskCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_0TagQueueCommand
 */
export declare const se_TagQueueCommand: (input: TagQueueCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * serializeAws_json1_0UntagQueueCommand
 */
export declare const se_UntagQueueCommand: (input: UntagQueueCommandInput, context: __SerdeContext) => Promise<__HttpRequest>;
/**
 * deserializeAws_json1_0AddPermissionCommand
 */
export declare const de_AddPermissionCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<AddPermissionCommandOutput>;
/**
 * deserializeAws_json1_0CancelMessageMoveTaskCommand
 */
export declare const de_CancelMessageMoveTaskCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<CancelMessageMoveTaskCommandOutput>;
/**
 * deserializeAws_json1_0ChangeMessageVisibilityCommand
 */
export declare const de_ChangeMessageVisibilityCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<ChangeMessageVisibilityCommandOutput>;
/**
 * deserializeAws_json1_0ChangeMessageVisibilityBatchCommand
 */
export declare const de_ChangeMessageVisibilityBatchCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<ChangeMessageVisibilityBatchCommandOutput>;
/**
 * deserializeAws_json1_0CreateQueueCommand
 */
export declare const de_CreateQueueCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<CreateQueueCommandOutput>;
/**
 * deserializeAws_json1_0DeleteMessageCommand
 */
export declare const de_DeleteMessageCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<DeleteMessageCommandOutput>;
/**
 * deserializeAws_json1_0DeleteMessageBatchCommand
 */
export declare const de_DeleteMessageBatchCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<DeleteMessageBatchCommandOutput>;
/**
 * deserializeAws_json1_0DeleteQueueCommand
 */
export declare const de_DeleteQueueCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<DeleteQueueCommandOutput>;
/**
 * deserializeAws_json1_0GetQueueAttributesCommand
 */
export declare const de_GetQueueAttributesCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<GetQueueAttributesCommandOutput>;
/**
 * deserializeAws_json1_0GetQueueUrlCommand
 */
export declare const de_GetQueueUrlCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<GetQueueUrlCommandOutput>;
/**
 * deserializeAws_json1_0ListDeadLetterSourceQueuesCommand
 */
export declare const de_ListDeadLetterSourceQueuesCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<ListDeadLetterSourceQueuesCommandOutput>;
/**
 * deserializeAws_json1_0ListMessageMoveTasksCommand
 */
export declare const de_ListMessageMoveTasksCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<ListMessageMoveTasksCommandOutput>;
/**
 * deserializeAws_json1_0ListQueuesCommand
 */
export declare const de_ListQueuesCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<ListQueuesCommandOutput>;
/**
 * deserializeAws_json1_0ListQueueTagsCommand
 */
export declare const de_ListQueueTagsCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<ListQueueTagsCommandOutput>;
/**
 * deserializeAws_json1_0PurgeQueueCommand
 */
export declare const de_PurgeQueueCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<PurgeQueueCommandOutput>;
/**
 * deserializeAws_json1_0ReceiveMessageCommand
 */
export declare const de_ReceiveMessageCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<ReceiveMessageCommandOutput>;
/**
 * deserializeAws_json1_0RemovePermissionCommand
 */
export declare const de_RemovePermissionCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<RemovePermissionCommandOutput>;
/**
 * deserializeAws_json1_0SendMessageCommand
 */
export declare const de_SendMessageCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<SendMessageCommandOutput>;
/**
 * deserializeAws_json1_0SendMessageBatchCommand
 */
export declare const de_SendMessageBatchCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<SendMessageBatchCommandOutput>;
/**
 * deserializeAws_json1_0SetQueueAttributesCommand
 */
export declare const de_SetQueueAttributesCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<SetQueueAttributesCommandOutput>;
/**
 * deserializeAws_json1_0StartMessageMoveTaskCommand
 */
export declare const de_StartMessageMoveTaskCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<StartMessageMoveTaskCommandOutput>;
/**
 * deserializeAws_json1_0TagQueueCommand
 */
export declare const de_TagQueueCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<TagQueueCommandOutput>;
/**
 * deserializeAws_json1_0UntagQueueCommand
 */
export declare const de_UntagQueueCommand: (output: __HttpResponse, context: __SerdeContext) => Promise<UntagQueueCommandOutput>;
