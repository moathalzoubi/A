export class TrnslatorApi {
  constructor(txtInput: string) {
    this.setDone(false);
    this.setOrgnialText(txtInput);
    this.init();
    console.log(this.run());
  }
  setDone = (val: boolean) => {
    this.done = val;
  };
  getDone = () => {
    return this.done;
  };
  setTranslatedText = (text: string) => {
    this.translatedText = text;
  };
  getTranslatedText = () => {
    return this.translatedText;
  };
  setOrgnialText = (text: string) => {
    this.orignalText = text;
  };
  getOrginalText = () => {
    return this.orignalText;
  };
  init = () => {
    this.encodedParams = new URLSearchParams();
    this.encodedParams.append("q", this.getOrginalText()!);
    this.encodedParams.append("target", "ar");
    this.encodedParams.append("source", "en");
    this.run();
  };
}
