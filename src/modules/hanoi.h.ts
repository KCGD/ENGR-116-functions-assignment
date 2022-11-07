export type HanoiDisk = {
    'id':string
}

export type tower = "source" | "dest" | "aux";

export type HanoiStep = {
    'command':"move",
    'disk':number,
    'from': tower,
    'to': tower
}

export interface HanoiCallback {
    (results:HanoiStep[]): void
}