export class M_Logging {

    static log(...messages: any[]) {
        const caller = new Error().stack?.split('\n')[2].trim().replace('at ', '');
        console.log(caller, ...messages);
    }
}

