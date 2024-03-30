

export interface Message {
    username: string;
    message: string;
    channel: string;
}


export class Tasks {
    constructor(
        public user: string,
        public tasks: Task[] = []
    ) {}
}
export class Task {

    constructor(
        public message: string,
        public done: boolean = false
    ) {}
}