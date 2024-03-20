export const loginUser = async (data: {email:string, password:string}) => {
    const url =
      "https://api.gearfocus.div4.pgtest.co/api/authentication/login";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (error) {
      console.error("Error:", error);
    }
  };