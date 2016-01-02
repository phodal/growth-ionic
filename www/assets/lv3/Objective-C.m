#import <Foundation/Foundation.h>

int main(void)
{
    @autoreleasepool
    {
        NSFileHandle *_stderr = [NSFileHandle fileHandleWithStandardError];
        NSString *string = @"hello, world\n";
        NSData *data = [string dataUsingEncoding:[NSString defaultCStringEncoding]];
        [_stderr writeData:data];
    }
    return EXIT_SUCCESS;
}
