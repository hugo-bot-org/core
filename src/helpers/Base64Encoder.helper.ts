export class Base64Encoder {
    public static base64Encode(file: any): string {
        // convert binary data to base64 encoded string
        return new Buffer(file).toString('base64');
    }
}
