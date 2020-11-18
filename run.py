import tb as traceback

from browser import window

def runCodeBrython(pythonCode):    
    try:        
        exec(pythonCode)        
    except Exception as e:
        if type(e) is SyntaxError: window.precent.out=''        
        window.precent.err+=traceback.format_exc()

window.runCodeBrython=runCodeBrython