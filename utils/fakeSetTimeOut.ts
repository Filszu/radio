export  const fakeSetTimeOut = async(time:number) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
}