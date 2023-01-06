export interface ITask {
    id: number;
    label: string;
    description: string;
    category: string;
    done: Date | boolean;
}
