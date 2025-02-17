import * as models from "../models/models";

export const fetchStatus = async(): Promise<boolean> => {
    try {
        const response = await fetch("http://bigrobot.ca:3000/auth/status",{
            credentials: "include",
        })
        if (response.status === 200) return true;
        return false;
    } catch (error) {
        console.error("Error fetching status:", error);
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
      console.error("Error logging out:", error);
      return false;
    }
  }

  export const fetchMyProfile = async (): Promise<models.User | null> => {
    try {
      const response = await fetch("http://bigrobot.ca:3000/profile", {
        credentials: "include",
      });
      if (response.status === 200) {
        return await response.json() as models.User;
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      return null
    }
    return null;
  }
  export const fetchProfile = async (name:string): Promise<models.User | null> => {
    try {
      const response = await fetch(`http://bigrobot.ca:3000/profile/${name}`, {
        credentials: "include",
      });
      if (response.status === 200) {
        return await response.json() as models.User;
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      return null
    }
    return null;
  }