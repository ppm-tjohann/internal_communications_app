export type ValidationError<y> = {
    [x in keyof y]?: string
}

