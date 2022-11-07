import * as fs from "fs";
import { platform } from "os";
import { execSync } from "child_process";
import * as path from "path";
import * as process from "process";
import { createInterface, Interface } from 'readline';
import { Hanoi, HanoiResultsToString } from './src/modules/hanoi';


Main();
function Main(): void {
    //display the options for running the programs
    fs.readFile(path.join(__dirname, "./src/HelpFile"), function(er, data): void {
        console.log(data.toString());
    
        //read the selection
        const rl = createInterface({
            'input': process.stdin,
            'output': process.stdout
        })
        
        //read the answer and run accordingly
        rl.question("\nPlease select something to run: ", function (a:string): void {
            switch (a) {
                //Greeting
                case "1":
                let greeting:string = "Hello!";
                console.log(greeting);
                switch(platform()) {
                    case "linux":
                        execSync(`notify-send "${greeting}"`);
                    break;

                    case "win32":
                        execSync(`msg * ${greeting}`);
                    break;

                    case "darwin":
                        execSync(`osascript -e 'display notification "${greeting}" with title "Hello!"'`);
                    break;
                }
                break;

                //Division
                case "2":
                    rl.question("Please enter two numbers to divide, seperated by \"/\" (eg: 10/5): ", function (div:string): void {
                        let termsAsString = div.split("/");
                        let terms:number[] = termsAsString.map(function(val:string): number {return parseFloat(val)});

                        if(terms[1] !== 0) {
                            console.log(terms[0]/terms[1]);
                            process.exit(0);
                        } else {
                            console.log("Cannot do division");
                            process.exit(0);
                        }
                    })
                break;

                //Factorial
                case "3":
                    rl.question("Please enter a number to get the factorial of: ", function(numAsString:string): void {
                        let num:number = parseInt(numAsString);

                        //get factorial
                        let ans:number = 1;
                        if(num === 0 || num === 1) {
                            console.log(ans);
                        } else {
                            for(let i = num; i >= 1; i--) {
                                ans = ans * i;
                            }
                            console.log(ans);
                            process.exit(0);
                        }
                    })
                break;

                //Fibonacci
                case "4":
                    rl.question("Please enter a number of fibonacci values to return: ", function(numAsString:string): void {
                        let num:number = parseInt(numAsString);

                        if (num <= 1) {
                            console.log(num);
                        } else {
                            let result:number[] = [0, 1];
                            for(let i = 2; i <= num; i++) {
                                result[i] = result[i-2] + result[i-1];
                            }

                            //print fibonacci results
                            for(let i = 0; i < result.length; i++) {
                                process.stdout.write(`${result[i]} `);
                            }

                            process.stdout.write("\n");
                            process.exit(0);
                        }
                    })
                break;

                //Hanoi
                case "5":
                    rl.question("Please enter a number of disks to solve for: ", function(disksString:string): void {
                        Hanoi(parseInt(disksString), function(results): void {
                            console.log(HanoiResultsToString(results));
                            process.exit(0);
                        })
                    })      
                break;
            }
        })
    })
}