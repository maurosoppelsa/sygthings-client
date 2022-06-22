export const fakeResp = (success: any, timeout: any) => {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (success) {
          resolve({ success: true });
        } else {
          reject({ message: "Error" });
        }
      }, timeout);
    });
  };