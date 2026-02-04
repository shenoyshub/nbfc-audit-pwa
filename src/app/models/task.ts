import { TaskEvidence } from "./task-evidence";

export interface Task {
    taskCode: string;
    taskDescription: string;
    taskURL: string;
    takComponentName: string;
    taskTypeCode: string;
    taskEvidences: TaskEvidence[];
}
