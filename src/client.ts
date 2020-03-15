import createElement from "./shared/util/createElement";
import InitSession from "./shared/fun/initializeSession";

function uCaptchaBox(key: string) {
  const checkbox = createElement("div");
  checkbox.setAttribute("style", "cursor:pointer;border-radius:3px;border:2px solid #888;width:25px;height:25px;display:inline-block");
  checkbox.onclick = function() {
    fetch(`https://localhost:444/api/init?k=${key}`)
        .then((r)=>r.text())
        .then((r)=>r.substr(2))
        .then((r)=>JSON.parse(r))
        .then((resp)=>{
          const session = new InitSession();
          session.deserialize(resp);
        });

    checkbox.setAttribute("style",
        checkbox.getAttribute("style") + "background-color:royalblue;");
  };
  const captchaBox = createElement("div");
  captchaBox.appendChild(checkbox);
  return captchaBox;
}

export function create(websiteKey: string, selector: string) {
  // const iframe = createElement("iframe");
  // iframe.setAttribute("src", "https://localhost:444/?k="+websiteKey)

  document.querySelector(selector)!.appendChild(uCaptchaBox(websiteKey));
}
