var btnRun = { getAttribute: (mode) => { return '1' } };
var output = { innerContent: "" };

var precent = {
    out: "",
    err: ""
};

const log = (o)=>{alert(JSON.stringify(o))}

console.log = function(e) {
    precent.out += e
};

const inp=prompt;

prompt = function(e) {    
    var i = inp(e);
    precent.out += e + i + "\n";
    return i;
}

function runCodeExtenion() {
    var event = new CustomEvent("run", {
        detail: {
            code: editor.getValue()
        }
    });
    window.dispatchEvent(event);
}

function htmlEncode(value) {
    var div = document.createElement('div');
    var text = document.createTextNode(value);
    div.appendChild(text);
    return div.innerHTML.replace(/\n/g, '<br>');
}

function htmlDecode(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value.replace(/<p>/g, '').replace(/<\/p>/g, '\n');
}

function onout(e) {

    if (e.detail.out)
        output.innerContent += htmlEncode(e.detail.out);
    if (e.detail.err)
        output.innerContent += `<span class="err">${htmlEncode(e.detail.err)}</span>`;

    // output.innerHTML = output.innerContent;
    // log(output.innerContent);
    return output.innerContent;

}

function runCode(pythonCode) {

    output.innerContent += ">>><br>";

    precent.out = "";
    precent.err = "";

    if (btnRun.getAttribute('mode') == '1') {
        // alert("Brython");
        runCodeBrython(pythonCode);
        return onout({ detail: precent });
    }
    // alert("Extension");
    runCodeExtenion();

}

function clearOutput() {
    output.innerHTML = "";
    output.innerContent = "";
}