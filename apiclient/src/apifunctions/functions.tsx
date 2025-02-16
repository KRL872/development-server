export const fetchStatus = async(): Promise<boolean> => {
    try {
        const response = await fetch("http://bigrobot.ca:3000/auth/status",{
            credentials: "include",
        })
        if (response.status === 200) return true;
        return false;
    } catch (error) {

        return false;
        
    }
}
export const fetchLogout = async (): Promise<boolean> => {
    try {
      const response = await fetch("http://bigrobot.ca:3000/auth/logout", {
        credentials: "include",
      });
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }
