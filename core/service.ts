class Fetcher {
  private baseUrl: string;
  private static instance: Fetcher;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    // let baseURL: string = "http://192.168.0.151";
    //let baseURL: string = "http://localhost";
    let baseURL: string = "http://10.0.2.2";
    let port: number = 3000;

    this.instance = new Fetcher(`${baseURL}:${port}`);
    return this.instance;
  }

  async get(url: string) {
    try {
      const completeURL = `${this.baseUrl}${url}`;
      const response = await fetch(completeURL);
      if (response.status === 200) {
        console.log("request - GET - ", completeURL, " - SUCCESS");
        return response.json();
      } else {
        console.log(response);
        throw new Error(`Service Error : Status Code - ${response.status}`);
      }
    } catch (ex) {
      console.log("ERROR");
      console.log(ex);
    }
  }

  async post(url: string, data: any) {
    try {
      const completeURL = `${this.baseUrl}${url}`;
      const response = await fetch(completeURL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        console.log("request - GET - ", completeURL, " - SUCCESS");
        return response.json();
      } else {
        console.log(response);
        throw new Error(`Service Error : Status Code - ${response.status}`);
      }
    } catch (ex) {
      console.log("ERROR");
      console.log(ex);
    }
  }

  async delete(url: string) {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "DELETE",
    });
    return response.json();
  }

  async put(url: string, data: any) {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }
}

const SVCHelper = Fetcher.getInstance();
export default SVCHelper;
