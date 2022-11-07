import { HanoiCallback, HanoiStep, HanoiDisk, tower } from "./hanoi.h";

export function Hanoi(disknum:number, callback:HanoiCallback): void {
    let stepList:HanoiStep[] = [];

    Promise.resolve(_hanoi(disknum, "source", "dest", "aux")).then(function(): void {callback(stepList)});
    function _hanoi(n:number, source:tower, dest:tower, aux:tower): any {
        if(n===0) {
            return;
        }

        //promise resolve is an anti-callstack max error measure
        Promise.resolve().then(_hanoi(n-1, source, aux, dest));
        stepList.push({'command':'move', 'disk': n, from:source, to:dest});
        Promise.resolve().then(_hanoi(n-1, aux, dest, source));
    }
}

export function HanoiResultsToString(resultList:HanoiStep[]): string {
    let sum:string = "";

    for(let i = 0; i < resultList.length; i++) {
        let thisResult:HanoiStep = resultList[i];
        sum += `${thisResult.command}: Disk ${thisResult.disk} from ${thisResult.from} to ${thisResult.to}\n`;
    }

    return sum;
}