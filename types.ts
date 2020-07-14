export interface ToDo {
  isDone: boolean,
  text: string
}

export interface State {
  toDos: ToDo[]
}