export default class CommandCooldown {

    private static users: Map<string, any> = new Map();

    public static addUser(userId: string, time: number = 5) {
        const user = {
            id: userId,
            time: Date.now(),
            timeout: () => {
                setTimeout(() => {
                    this.users.delete(userId);
                }, time * 1000);
            }
        };

        this.users.set(userId, user);
        this.handleUser(userId);
    };

    public static getUserTime(userId: string) {
        if ( !this.hasUser(userId) ) return false;
        const user = this.users.get(userId);
        return (Date.now() - user.time) / 1000;
    };

    public static hasUser(userId: string) {
        return this.users.has(userId);
    };

    private static handleUser(userId: string) {
        const user = this.users.get(userId);
        user.timeout();
    };

};