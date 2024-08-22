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
    let baseURL: string = "https://jsonplaceholder.typicode.com/todos/";
    //let baseURL: string = "http://localhost:8080";
    //let baseURL: string = "http://10.0.2.2:8080";
    this.instance = new Fetcher(baseURL);
    return this.instance;
  }

  async get(url: string) {
    try {
      const completeURL = `${this.baseUrl}`;
      console.log("inside GET requesting - ", completeURL);
      const response = await fetch(completeURL);
      console.log("Back From Service Call");
      console.log(response);
      if (response.status === 200) {
        return response.json();
      } else {
        console.log(response.text);
        console.log(response.url);
      }
    } catch (ex) {
      console.log("ERROR");
      console.log(ex);
    }
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

  async post(url: string, data: any) {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }

  async delete(url: string) {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "DELETE",
    });
    return response.json();
  }
}

const SVCHelper = Fetcher.getInstance();
export default SVCHelper;
