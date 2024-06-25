import {
  HttpRequest as __HttpRequest,
  HttpResponse as __HttpResponse,
} from "@smithy/protocol-http";
import { SerdeContext as __SerdeContext } from "@smithy/types";
import {
  AddPermissionCommandInput,
  AddPermissionCommandOutput,
} from "../commands/AddPermissionCommand";
import {
  CancelMessageMoveTaskCommandInput,
  CancelMessageMoveTaskCommandOutput,
} from "../commands/CancelMessageMoveTaskCommand";
import {
  ChangeMessageVisibilityBatchCommandInput,
  ChangeMessageVisibilityBatchCommandOutput,
} from "../commands/ChangeMessageVisibilityBatchCommand";
import {
  ChangeMessageVisibilityCommandInput,
  ChangeMessageVisibilityCommandOutput,
} from "../commands/ChangeMessageVisibilityCommand";
import {
  CreateQueueCommandInput,
  CreateQueueCommandOutput,
} from "../commands/CreateQueueCommand";
import {
  DeleteMessageBatchCommandInput,
  DeleteMessageBatchCommandOutput,
} from "../commands/DeleteMessageBatchCommand";
import {
  DeleteMessageCommandInput,
  DeleteMessageCommandOutput,
} from "../commands/DeleteMessageCommand";
import {
  DeleteQueueCommandInput,
  DeleteQueueCommandOutput,
} from "../commands/DeleteQueueCommand";
import {
  GetQueueAttributesCommandInput,
  GetQueueAttributesCommandOutput,
} from "../commands/GetQueueAttributesCommand";
import {
  GetQueueUrlCommandInput,
  GetQueueUrlCommandOutput,
} from "../commands/GetQueueUrlCommand";
import {
  ListDeadLetterSourceQueuesCommandInput,
  ListDeadLetterSourceQueuesCommandOutput,
} from "../commands/ListDeadLetterSourceQueuesCommand";
import {
  ListMessageMoveTasksCommandInput,
  ListMessageMoveTasksCommandOutput,
} from "../commands/ListMessageMoveTasksCommand";
import {
  ListQueuesCommandInput,
  ListQueuesCommandOutput,
} from "../commands/ListQueuesCommand";
import {
  ListQueueTagsCommandInput,
  ListQueueTagsCommandOutput,
} from "../commands/ListQueueTagsCommand";
import {
  PurgeQueueCommandInput,
  PurgeQueueCommandOutput,
} from "../commands/PurgeQueueCommand";
import {
  ReceiveMessageCommandInput,
  ReceiveMessageCommandOutput,
} from "../commands/ReceiveMessageCommand";
import {
  RemovePermissionCommandInput,
  RemovePermissionCommandOutput,
} from "../commands/RemovePermissionCommand";
import {
  SendMessageBatchCommandInput,
  SendMessageBatchCommandOutput,
} from "../commands/SendMessageBatchCommand";
import {
  SendMessageCommandInput,
  SendMessageCommandOutput,
} from "../commands/SendMessageCommand";
import {
  SetQueueAttributesCommandInput,
  SetQueueAttributesCommandOutput,
} from "../commands/SetQueueAttributesCommand";
import {
  StartMessageMoveTaskCommandInput,
  StartMessageMoveTaskCommandOutput,
} from "../commands/StartMessageMoveTaskCommand";
import {
  TagQueueCommandInput,
  TagQueueCommandOutput,
} from "../commands/TagQueueCommand";
import {
  UntagQueueCommandInput,
  UntagQueueCommandOutput,
} from "../commands/UntagQueueCommand";
export declare const se_AddPermissionCommand: (
  input: AddPermissionCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_CancelMessageMoveTaskCommand: (
  input: CancelMessageMoveTaskCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_ChangeMessageVisibilityCommand: (
  input: ChangeMessageVisibilityCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_ChangeMessageVisibilityBatchCommand: (
  input: ChangeMessageVisibilityBatchCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_CreateQueueCommand: (
  input: CreateQueueCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_DeleteMessageCommand: (
  input: DeleteMessageCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_DeleteMessageBatchCommand: (
  input: DeleteMessageBatchCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_DeleteQueueCommand: (
  input: DeleteQueueCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_GetQueueAttributesCommand: (
  input: GetQueueAttributesCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_GetQueueUrlCommand: (
  input: GetQueueUrlCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_ListDeadLetterSourceQueuesCommand: (
  input: ListDeadLetterSourceQueuesCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_ListMessageMoveTasksCommand: (
  input: ListMessageMoveTasksCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_ListQueuesCommand: (
  input: ListQueuesCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_ListQueueTagsCommand: (
  input: ListQueueTagsCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_PurgeQueueCommand: (
  input: PurgeQueueCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_ReceiveMessageCommand: (
  input: ReceiveMessageCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_RemovePermissionCommand: (
  input: RemovePermissionCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_SendMessageCommand: (
  input: SendMessageCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_SendMessageBatchCommand: (
  input: SendMessageBatchCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_SetQueueAttributesCommand: (
  input: SetQueueAttributesCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_StartMessageMoveTaskCommand: (
  input: StartMessageMoveTaskCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_TagQueueCommand: (
  input: TagQueueCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_UntagQueueCommand: (
  input: UntagQueueCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const de_AddPermissionCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<AddPermissionCommandOutput>;
export declare const de_CancelMessageMoveTaskCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<CancelMessageMoveTaskCommandOutput>;
export declare const de_ChangeMessageVisibilityCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<ChangeMessageVisibilityCommandOutput>;
export declare const de_ChangeMessageVisibilityBatchCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<ChangeMessageVisibilityBatchCommandOutput>;
export declare const de_CreateQueueCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<CreateQueueCommandOutput>;
export declare const de_DeleteMessageCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<DeleteMessageCommandOutput>;
export declare const de_DeleteMessageBatchCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<DeleteMessageBatchCommandOutput>;
export declare const de_DeleteQueueCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<DeleteQueueCommandOutput>;
export declare const de_GetQueueAttributesCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<GetQueueAttributesCommandOutput>;
export declare const de_GetQueueUrlCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<GetQueueUrlCommandOutput>;
export declare const de_ListDeadLetterSourceQueuesCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<ListDeadLetterSourceQueuesCommandOutput>;
export declare const de_ListMessageMoveTasksCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<ListMessageMoveTasksCommandOutput>;
export declare const de_ListQueuesCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<ListQueuesCommandOutput>;
export declare const de_ListQueueTagsCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<ListQueueTagsCommandOutput>;
export declare const de_PurgeQueueCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<PurgeQueueCommandOutput>;
export declare const de_ReceiveMessageCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<ReceiveMessageCommandOutput>;
export declare const de_RemovePermissionCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<RemovePermissionCommandOutput>;
export declare const de_SendMessageCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<SendMessageCommandOutput>;
export declare const de_SendMessageBatchCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<SendMessageBatchCommandOutput>;
export declare const de_SetQueueAttributesCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<SetQueueAttributesCommandOutput>;
export declare const de_StartMessageMoveTaskCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<StartMessageMoveTaskCommandOutput>;
export declare const de_TagQueueCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<TagQueueCommandOutput>;
export declare const de_UntagQueueCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<UntagQueueCommandOutput>;
