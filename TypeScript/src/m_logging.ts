export class M_Logging {
    static m_caller: string = ' ';

    static log(message: string) {
        console.log(this.m_caller, message);
    }
}
