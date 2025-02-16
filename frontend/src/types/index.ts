export interface Step {
    id: number
    order: number
    title: string
    content: string
    visual_reference: string
    duration: string
    completed: boolean
}

export interface Journey {
    id: number
    title: string
    subject: string
    topic: string
    age_group: string
    steps: Step[]
}