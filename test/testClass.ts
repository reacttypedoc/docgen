/** 
 * This is a test class to test things with
 * @deprecated
 * @since 0.0.1
 * @see www.google.com/search?q=i%need%20help
 * @example new TestClass().hm()
 */
export default class TestClass {
    /** a sample property */
    private property: string;
    /** a sample property but as a string */
    protected "string property": number;
    /** a sample property but as a number */
    public 123456789: boolean;

    /** Get the date / 69 */
    public get hmm() {
        return Date.now() / 69
    }

    /** set the string prop */
    public set setstringprop(value: number) {
        this["string property"] = value;
    }

    /** this is a doc for the constructor */
    constructor() {
        this.property = 21 + "e";
    }

    /** 
     * idk, it does things 
     * @see www.hmm.com
     */
    private hm() {
        return this.hmm * 10
    }
}
