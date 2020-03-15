enum Indexes {
  clientId = 0,
  imageUrl
}

export default class InitSession {
  private _clientSessionId: string | undefined;
  private _imageUrl: string | undefined;

  set sessionId(id: string) {
    if(id.length !== 8) throw Error("ClientID is not 8 characters");
    this._clientSessionId = id;
  }

  get sessionId(): string  {
    return this._clientSessionId!;
  }

  set imageUrl(url: string) {
    this._imageUrl = url;
  }

  get imageUrl(): string {
    return this._imageUrl!;
  }

  serialize(): any[] {
    if(!this._clientSessionId || !this._imageUrl) {
      throw Error("Unable to serialize because missing field(s)")
    }
    const payload = [];
    payload[Indexes.clientId] = this._clientSessionId;
    payload[Indexes.imageUrl] = this._imageUrl;

    return payload;
  }

  deserialize(payload: any[]) {
    
  }
}