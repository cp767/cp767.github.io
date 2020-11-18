var codeId;
var outputId;

function elem(id) {
  return document.getElementById(id);
}

async function init() {  
  // log('init');
  var allTxts = await miro.board.widgets.get({ type: "TEXT" });
  await miro.board.widgets.deleteById(allTxts.map(txt => txt.id));

  var code = (await miro.board.widgets.create({
    type: "TEXT",
    text: "#Code Editor",
    width: 500
  }))[0];

  var output = (await miro.board.widgets.create({
    type: "TEXT",
    text: "#Output",
    x: code.x + code.bounds.width + 50,
    width: 500
  }))[0];

  codeId = code.id;
  outputId = output.id;

  // alert(JSON.stringify(code));
}

async function run() {
  await miro.board.selection.clear();
  var code = (await miro.board.widgets.get({ id: codeId }))[0];
  var output = runCode(htmlDecode(code.text));

  await miro.board.widgets.update({
    id: outputId,
    text: output
  });
  // alert(JSON.stringify(code));
}

async function clear() {
  clearOutput();
  await miro.board.widgets.update({
    id: outputId,
    text: "#Output"
  });
}

elem("btnRun").onclick = run;
elem("btnClear").onclick = clear;

miro.onReady(() => {
  init();
});
